	var swiper=new Swiper('.swiper-container',{
	    autoplay:4000,
	    pagination:'.swiper-pagination',
		spaceBetween: 0,
		loop:true,
		paginationType: 'fraction'
	});

	
	myScroll = new IScroll('.attr',{scrollY: true,click:true});
	
	$('.goods:last').css('border-bottom','none');

	$(window).scroll(function(){
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	});
	var aNum=document.querySelectorAll('.buy_num > span');
	for(var i=0; i<aNum.length; i++){
		aNum[i].innerHTML=i+1;
	}

	/* 获取商品的属性信息 */
	function showAttr(obj,rec_id,goods_id){
		var product_id = parseInt($(obj).attr('product_id'));
		$('#choose_list').attr('rec_id',rec_id);
		$('#choose_list').attr('goods_id',goods_id);
		$('#choose_list').attr('product_id',product_id);
		$('.shadow,.choose_list').addClass('active');
		$('body').on('touchmove',function(e){
        	e.preventDefault();
        });
        $('.attr_container img').attr('src',$(obj).parent().siblings().find('img').attr('src'));
        $('.choose_goods_name').text($(obj).parent().siblings().find('.goods_name').text());
		var shop_price = $(obj).parent().siblings().find('.goods_price p:first').text();
		var attr_name = $(obj).parent().siblings().find('.goods_attr').text();
        $('.choose_msg span').text(shop_price);
		var num = $(obj).parent().siblings().find('.goods_number').text();
        $.getJSON(go_url+'/v2/api/goods/getSceneAttr?',{goods_id:goods_id,product_id:product_id,num:num},function(data){
			if(data.code == 1){
				var is_select = data.data.is_select;
				/* 当前属性已选中，相当于已请求一次 */
				if(is_select){
					$('#warper .choose_num').text(num);
					new_attr = {
						max_num:parseInt(data.data.max_num),
						product_id:data.data.product_id,
						attr_name:attr_name,
						shop_price:shop_price,
						num:num,
						rec_id:rec_id,
						goods_id:goods_id
					};
				}
				var data=data.data.spe;
				var html='';
				for(var i in data){
					html+='<div class="warper_title">'+data[i].name+'</div>';
                    html+='<div class="norms_val clearfix">';
                    for(var j in data[i].values){
                    	if(is_select && data[i].values[j].is_select){
                    		html+='	<section class=" active fl" attr_id="'+data[i].values[j].id+'" onclick="change_Attr(this)">'+data[i].values[j].label+'</section>';
                    	}else{
                    		html+='	<section class="fl" attr_id="'+data[i].values[j].id+'" onclick="change_Attr(this)">'+data[i].values[j].label+'</section>';
                    	}
                    }
                   	html+='</div>';
		        }
				$('#warper .warper').html(html);
				myScroll = new IScroll('.attr',{scrollY: true,click:true});
				$('.attr').css('max-height',$('.attr').height()+20);
		    }else{
				alert(data.message);
			}
		});
	}
	/* 切换属性点击操作 */
    function change_Attr(obj){
		if($(obj).hasClass('active')){ return false; }
    	$(obj).addClass('active').siblings().removeClass('active');
		new_attr = null;
		change_goods_price();
    }
	/* 变更属性执行操作 */
	function change_goods_price(){
		var attr_id = '';
		var active_num = 0;
		$('.warper .active').each(function(k,v){
			if($(v).attr('attr_id') > 0){
				attr_id += $(v).attr('attr_id')+',';
			}
			active_num = k+1;
		});
		/* 未选齐属性不允许请求 */
		if(active_num < $('.warper .norms_val').length){ return false; }
		if(attr_id == ''){ return false; }
		attr_id = attr_id.substring(0,attr_id.length-1);
		if(new_attr == null){
			var num=$('#warper .choose_num').text();
			var goods_id = $('#choose_list').attr('goods_id');
			var rec_id = $('#choose_list').attr('rec_id');
		}else{
			var num = new_attr.num;
			var goods_id = new_attr.goods_id;
			var rec_id = new_attr.rec_id;
		}
		$.getJSON(go_url+'/v2/api/goods/changeSceneAttr?',{goods_id:goods_id,attr:attr_id,num:num},function(data){
			if(data.code == 1){
				var data=data.data;
				new_attr = {
					max_num:parseInt(data.max_num),
					product_id:data.product_id,
					attr_name:data.attr_name,
					shop_price:data.shop_price,
					num:data.num,
					img:data.img_list[0].thumb_url,
					rec_id:rec_id,
					goods_id:goods_id
				};
				if(data.max_num == 0){
					new_attr = null;
					$('.attr_bottom').text('已售罄').css('background-color','#ccc');
				}else{
					$('.attr_bottom').text('确定').css('background-color','#007846');
				}
				$('.attr_warp img').attr('src',data.img_list[0].thumb_url);
				$('.choose_msg span').text('￥'+data.shop_price);
			}else{
				alert(data.message);
			}
		});
	}
	/* 变更数量 */
	function change_num(num){
		if(new_attr == null){ return false; }
        var n=$('#warper .choose_num').text();
        n = parseInt(n) + parseInt(num);
		/* 无意义数量不必请求 */
        if(n < 1){ $('#warper .choose_num').text('1'); return false; }
		if(n > new_attr.max_num){ $('#warper .choose_num').text(new_attr.max_num); return false; }
		$('#warper .choose_num').text(n);
		new_attr.num = n;
		change_goods_price();
    }
	/* 切出切换属性状态 */
	$('.shadow').on('click',function(){
		hidden_choose_list();
		new_attr = null;
	});
	$('.attr_bottom').on('click',function(){
		hidden_choose_list();
		attr_to_rec_goods();
		new_attr = null;
	});
	/* 切换属性变更商品状态 */
	function attr_to_rec_goods(){
		if(new_attr == null){ return false; }
		var rec_obj = $('.goods[rec_id="'+new_attr.rec_id+'"]');
		rec_obj.find('i').eq(0).addClass('active');
		rec_obj.find('.goods_attr').html(new_attr.attr_name.replace("\n",'<br>'));
		rec_obj.find('.goods_price p:first').html('￥'+new_attr.shop_price);
		rec_obj.find('.goods_price p:last').html('X<span class="goods_number">'+new_attr.num+'</span>');
		//rec_obj.find('.goods_number').text(new_attr.num);
		rec_obj.find('img:first').attr('src',new_attr.img);
		rec_obj.find('.change_attr').attr('product_id',new_attr.product_id);
		no_select_to_select(new_attr.rec_id,new_attr);
		change_space_price();
	}
	/* 切出选择属性状态扫尾工作 */
	function hidden_choose_list(){
		$('.shadow,.choose_list').removeClass('active');
		$('body').off("touchmove");
		$('#choose_list').attr('rec_id','');
		$('#choose_list').attr('goods_id','');
		$('#choose_list').attr('product_id','');
	}

	function submit_order(){
		$('input[name=json]').val(make_json_str());
		$('#form').submit();
	}
	
	/* 项目全选全不选 */
	$('.all_choose .choose_icon').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.select_one').removeClass('active');
			select_to_no_select();
		}else{
			$(this).addClass('active');
			$('.select_one').addClass('active');
			no_select_to_select();
		}
		change_space_price();
	});
	/* 商品选择状态切换 */
	$('.select_one').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			select_to_no_select($(this).parent().parent().attr('rec_id'));
		}else{
			$(this).addClass('active');
			no_select_to_select($(this).parent().parent().attr('rec_id'));
		}
		change_space_price();
	});
	/* 切换项目金额终极处理方法 */
	function change_space_price(){
		$.post(go_url+'/v2/api/aesthetic/changeAestheticPrice',{aes_id:aes_id,json:make_json_str()},function(data){
			if(data.code ==1){
				data = data.data;
				$('.total_price span:first').text('￥'+data.format_total_money);
				$('.total_sale span:first').text('￥'+data.format_discount_money);
				$('.go_buy span:first').text(data.total_num);
				middle_rec = null;/* 删除中间件 */
			}else{
				/* 失败处理及状态返回 */
				if(typeof(middle_rec) == 'object'){
					var rec_obj = $('.goods[rec_id="'+middle_rec.rec_id+'"]');
					rec_obj.find('i').eq(0).removeClass('active');
					if(middle_rec.is_must){
						rec_obj.find('i').eq(0).addClass('error');
					}
					rec_obj.find('.goods_number').text(middle_rec.num);
					rec_obj.find('.change_attr').attr('product_id',middle_rec.product_id);
					middle_rec = null;
				}
				alert(data.message);
			}
		},'json');
	}
	/* 获取已选商品json字符串 */
	function make_json_str(){
		var str = '{';
		$.each(select_json,function(k,vv){
			str += '"'+vv['rec_id']+'":{"num":"'+vv['num']+'","product_id":"'+vv['product_id']+'","goods_id":"'+vv['goods_id']+'"},';
		});
		str=(str.substring(str.length-1)==',')?str.substring(0,str.length-1):str;
		str += '}';
		return str;
	}
	/* 选中状态变更为未选中 */
	function select_to_no_select(rec_id){
		for(var i=0;i<(imax=select_json.length);i++){
			if(rec_id > 0){
				var t_rec_id = rec_id;
			}else{
				var t_rec_id = select_json[i]['rec_id'];
			}
			if(select_json[i]['is_must'] != '1' && t_rec_id == select_json[i]['rec_id']){
				var tt = select_json.splice(i,1);
				interim_json.push(tt[0]);i--;
			}
		}
	}
	var middle_rec = null;/* 中间件初始化 */
	/* 未选中状态变更为选中 */
	function no_select_to_select(rec_id,new_data){
		if(rec_id > 0){
			for(var i=0;i<(imax=interim_json.length);i++){
				if(rec_id == interim_json[i]['rec_id']){
					var tt = interim_json.splice(i,1);tt=tt[0];i--;
				}
			}
			for(var i=0;i<(imax=no_select_json.length);i++){
				if(rec_id == no_select_json[i]['rec_id']){
					var tt = no_select_json.splice(i,1);tt=tt[0];i--;
				}
			}
			for(var i=0;i<(imax=select_json.length);i++){
				if(rec_id == select_json[i]['rec_id']){
					var tt = select_json.splice(i,1);tt=tt[0];i--;
				}
			}
			if(typeof(new_data) == 'object'){
				middle_rec = tt;
				tt['product_id'] = new_data.product_id;
				tt['num'] = new_data.num;
				if(tt.is_must){
					$('.goods[rec_id="'+rec_id+'"]').find('i').eq(0).removeClass('error');
				}
			}
			select_json.push(tt);
		}else{
			for(var i=0;i<(imax=interim_json.length);i++){
				var tt = interim_json.splice(i,1);
				select_json.push(tt[0]);i--;
			}
		}
	}