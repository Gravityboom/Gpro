import React from 'react';
import Carousel from '../component_dev/carousel/src/index.js';
import Popup from '../component_dev/popup/src/index.js';
class HomeDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            app_title:'',
            space_name:'',
            style:'',
            style_name:'',
            img:'',
            default_money:'',
            homeDetailList:[],
            stallPrice:0,
			allprice:0,
			isSelected:[],
			checkall:true,
			goodPriceArr:[],
			isAll:true,
			ordernum:0,
			stallnum:0,
			showAttr:false,
			attrList:[]
		};
		this.checkall = this.checkall.bind(this);
		this.selectGoods = this.selectGoods.bind(this);
        this.loadList = this.loadList.bind(this);
        this.showAttr = this.showAttr.bind(this);
        this.hideAttr = this.hideAttr.bind(this);
	}

    checkall(len){
        var arr = [];
		if(this.state.isAll){

            for( let i = 0;i<len;i++){
                arr[i] = false;
            }

			this.setState({
                allprice:'0.00',
                ordernum:'0'
			})

		}else{

			for( let i = 0;i<len;i++){
				arr[i] = true;
			}
			this.setState({
				allprice:this.state.stallPrice,
                ordernum:this.state.stallnum
			});
        }

        this.setState({
			isAll:!this.state.isAll,
			isSelected:arr
        });
		this.loadList();
    }

    goback(){
        history.back(-1);
    }

    hideAttr(){
    	this.setState({
    		showAttr:false
		})
	}

    showAttr(data){

		let dataId = data['goods_id'];
    	var url = '/api/v2/api/goods/getSceneAttr?&goods_id='+dataId+'&product_id=&num=';
    	var self = this;
        let a = [];
        let b = [];
        let c = [];
    	console.log(url);
    	window.fetch(url)
			.then(response=>{
				return response.json();
			})
			.then(result=>{
				let DATA = result.data.spe;

                b = DATA[0]['values'].map(ccc=>{
					return (<span onClick={self.changeAttr.bind(self,ccc['id'])}>{ ccc['label'] }</span>)
				});

                c = DATA[1]['values'].map(ddd=>{
                    return (<span onClick={self.changeAttr.bind(self,ddd['id'])}>{ ddd['label'] }</span>)
                });

				this.setState({
                    sonAttr1:b,
                    sonAttr2:c
				});

                a.push(<section className="attr_list">
					<header>
						<div><img style={{width:'1.1646rem',height:'1.1646rem'}} src={data['goods_thumb']} alt=""/></div>
						<div>
							<p>{data['goods_name']}</p>
							<span>￥{data['goods_price']}</span>
						</div>
					</header>
					<div className="obj1">
						<header>{ DATA[0]['name']}</header>

                        {this.state.sonAttr1}
					</div>
					<div className="obj2">
						<header>{ DATA[1]['name']}</header>
                        {this.state.sonAttr2}
					</div>
					<div className="obj3">
						<header>数量</header>
						<span>- <span>1</span> +</span>
					</div>
					<div className="obj4">
						确定
					</div>
				</section>
				)

                this.setState({
                    showAttr:!this.state.showAttr,
                    attrList:a
                });
			});
	}
    changeAttr(){
    	console.log(1);
	}
    selectGoods(something,e){
    	let domName = e.target.className;
		if(domName==='undisplay_icon'){
			return;
		}

		this.state.isSelected.map(item=>{
			if(!item){
				this.setState({
					isAll:false
				})
			}
		});


		let ordernum = this.state.ordernum;
		let arr = this.state.isSelected;
		let cal_price = Number(something.price);
		let tol_price = Number(this.state.allprice);
		let new_price;
		let isAll;

        if(this.state.isSelected[something.index]===true){
            new_price = tol_price - cal_price;
            ordernum --;
        }else if(this.state.isSelected[something.index]===false){
            new_price = tol_price + cal_price;
            isAll = false;
            ordernum ++;
        }


        arr[something.index] = !arr[something.index];
        new_price = new_price.toFixed(2);
		this.setState({
			allprice:new_price,
			isSelected:arr,
            ordernum:ordernum,
            isAll:isAll
		});
		this.loadList();
	}

	loadList(){
        let self = this;
        let homeDetailList = [];
        let tolPrice;
        let ordernum;
        let stallnum;
        let stallPrice=0;
        if(!this.state.allprice){
			tolPrice = 0;
			ordernum = 0;
            stallnum = 0;
        }
        window.fetch('/json/detail.json')
            .then( response => {
                return response.json();
            })
            .then(json=>{
                let Json = json.data.goods_list;
                let len = Json.length;
                if(!this.state.isSelected.length){

					for(let i = 0 ;i<len;i++){

						this.state.isSelected.push(true);
					}
                }

                homeDetailList = Json.map((item,index) => {
                    this.state.goodPriceArr.push(Number(item['goods_price']));
                    if(this.state.allprice===0 && item['msg'] ==='') {
                        tolPrice += Number(item['goods_price']);
                        stallPrice += Number(item['goods_price']);
                        stallnum += 1;
                        ordernum += 1;
                    }
                    return (
						<ul key={index} className="hdgc">
							<li className="goods">
								<section className="detail_list">
									<div>

								<span className = { item['msg']==''? (this.state.isSelected[index]? 'choose_icon':'unchoose_icon'):'undisplay_icon' }
									  onClick={self.selectGoods.bind(self,({price:item['goods_price'],index:index}))}>
								</span>
									</div>
									<a href="javascript:void(0)">
										<div></div>
										<div className="div123"><img src = {item['goods_thumb']} alt=""/></div>
										<div className="div456">
											<p className="dgoodname">{item['goods_name']}</p>
											<section className="goodattr">
												<span>{item['goods_attr'].substring(0,item['goods_attr'].indexOf(' '))}</span>
												<br />
												<span>规格:804*545*1700</span>
											</section>
											<div className="fl dgood_price">￥<span>{item['goods_price']}</span><span className="fr">X1</span></div>
										</div>
									</a>
								</section>

								<section className="changed">
									<button onClick={self.showAttr.bind(this,{'goods_thumb':item['goods_thumb'],'goods_id':item['goods_id'],'goods_name':item['goods_name'],'goods_price':item['goods_price']})} style={{ display: item['msg']=='' ?  'inline-block':'none' }} className="fr yo-btn yo-btn-changeAbtn">修改规格</button>
									<span style={{ display: item['msg']=='' ? 'none' : 'inline-block' }}>{item['msg']}</span>
								</section>
							</li>
						</ul>
                    )
                });
                //console.log(tolPrice);

                if(tolPrice){
                    tolPrice = tolPrice.toFixed(2);
                    stallPrice = stallPrice.toFixed(2);
                }

                if(!this.state.allprice){
                    self.setState({
                        allprice:tolPrice,
                        stallPrice:stallPrice,
                        ordernum:ordernum,
                        stallnum:stallnum
                    })
                }

                homeDetailList.push(
				<div>
					<section className="price_tip">
						<header>购买优惠</header>
						<p>1.场景购买的商品将享受包邮服务，客服与您沟通后再确认安装服务</p>
					</section>


					<section className="logicOrder">
						<section className="pt">
							<p><span className="fl">节省： <b>￥0.00</b></span> <span className="fr">价格：<b>￥{this.state.allprice}</b></span></p>
						</section>
						<section className="pb" >
							<div className="checkall">
								<span className={ this.state.isAll? 'choose_icon':'unchoose_icon' }
									  onClick={self.checkall.bind(self,len)}>
								</span>全选</div>
							<div className="oserver"><span className="server_icon"></span>客服</div>
							<div className="order_it">一键下单({this.state.ordernum})</div>
						</section>
					</section>
				</div>
				);


                self.setState({
                    homeDetailList:homeDetailList

                });

            })
	}




	componentDidMount(){
        let homeGoodId = this.props.params['homegoodid'];
        let self = this;

        this.loadList();

        /* 通过父路由传值得到参数 然后请求数据 */
        window.fetch('/api/v2/h5/index/space?is_json=1&page='+ 1 +'&space=&style=')
            .then(response =>{
                return response.json();
            })
            .then(result => {
                let Data = result.data;
                for(let i = 0 , len = Data.length; i < len ; i++){
                    if(Data[i]['id'] == homeGoodId){
                        self.setState({
                            app_title:Data[i]['app_title'],
                            space_name:Data[i]['space_name'],
                            style:Data[i]['style'],
                            style_name:Data[i]['style_name'],
                            img:Data[i]['img'],
                            default_money:Data[i]['default_money'],
                        });
                        break;
                    }
                }
            });
	}

	render(){
		let  self = this;
		return(
			<div className = 'hd_container'>
				<div className="head_banner_container">
					<span className="goback" onClick={this.goback}></span>
					<Carousel loop = {true}>

						<img className = "home_detail_banner" src={this.state.img} alt=""/>
						<img className = "home_detail_banner" src={this.state.img} alt=""/>
					</Carousel>
				</div>
				<section className="gapbar"></section>
				<section className="art_author">
					<div className="author_img"><img src="/home_img/author.png" alt=""/></div>
					<div className="author_name">陈严</div>
				</section>

				<section className="gtip">
					<header>校车儿童房</header>
					<section className="gtype"><span className="fl">{this.state.space_name} {this.state.style_name}</span> <span className="fr">￥{this.state.default_money}/{this.state.space_name}</span></section>
					<p>学生时代的梦想，靠校车去承载，带着我们成长，可爱的上下铺汽车床，一定是小男生钟爱的大玩具！</p>
				</section>

				<section className="trans_gap">
                    {this.state.space_name}商品清单
				</section>


				{ this.state.homeDetailList }

				<Popup show={this.state.showAttr} maskOffset={[0, 0]}>
					<div className="bugfix" onClick={this.hideAttr}></div>
					{ this.state.attrList }
				</Popup>
			</div>
		)
	}

}

export default HomeDetail