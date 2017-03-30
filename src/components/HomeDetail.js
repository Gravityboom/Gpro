import React from 'react';
import Carousel from '../component_dev/carousel/src/index.js';
import Scroller from '../component_dev/scroller/src/index.js';
class HomeDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            app_title:'',
            tag:'',
            space:'',
            space_name:'',
            style:'',
            style_name:'',
            img:'',
            default_money:'',
            discount:''
		}
	}
	
	componentDidMount(){
		console.log('Mounted');
		let homeGoodId = this.props.params['homegoodid'];
        let self = this;
		let tempArr = [];
		window.fetch('/api/v2/h5/index/space?is_json=1&page='+ 1 +'&space=&style=')
		.then(response =>{
			return response.json();
		})
		.then(result => {
			let Data = result.data;
			for(let i = 0 , len = Data.length; i < len ; i++){
                if(Data[i]['id'] == homeGoodId){
                    console.log(Data[i]);
                    self.setState({
                        app_title:Data[i]['app_title'],
                        tag:Data[i]['tag'],
                        space:Data[i]['space'],
                        space_name:Data[i]['space_name'],
                        style:Data[i]['style'],
                        style_name:Data[i]['style_name'],
                        img:Data[i]['img'],
                        default_money:Data[i]['default_money'],
                        discount:Data[i]['discount']
					});
                    break;
                }
			}

			tempArr.push(
				<div className="hbc">
                    <span className="goback" onClick={this.goback}></span>
                    <Carousel loop = {true}>
						<img className = "home_detail_banner" src={this.state.img} alt=""/>
						<img className = "home_detail_banner" src={this.state.img} alt=""/>
					</Carousel>

					<section className="gapbar"></section>
					<section className="art_author">
						<div className="author_img"><img src="/home_img/author.png" alt=""/></div>
						<div className="author_name">陈严</div>
					</section>

					<section className="gtip">
						<header>校车儿童房</header>
						<section className="gtype"><span className="fl">儿童房 现代</span> <span className="fr">￥17858.78/儿童房</span></section>
						<p>学生时代的梦想，靠校车去承载，带着我们成长，可爱的上下铺汽车床，一定是小男生钟爱的大玩具！</p>
					</section>

					<section className="trans_gap">
						儿童房商品清单
					</section>

					<ul className="hdgc">
						<li className="goods">
							<section className="detail_list">
								<div><button>BBB</button></div>

								<a href="javascript:void(0)">
									<div className="div123"><img src="/home_img/author.png" alt=""/></div>
									<div className="div456">
										<p className="dgoodname">儿童校车双门卡通衣柜</p>
										<section className="goodattr">
											<span>花色/图案:黄色</span>
											<br />
											<span>规格:804*545*1700</span>
										</section>
										<div className="fl dgood_price">￥<span>1321.00</span><span className="fr">X1</span></div>
									</div>
								</a>
							</section>

							<section className="changed">
								<button>修改规格</button>
							</section>

						</li>
					</ul>
				</div>
			);

			this.setState({
                homeDetailList:tempArr
			})
		});

		window.fetch('/json/detail.json')
		.then(response => {
			return response.json();})
		.then(result=>{
			//console.log(result);
		})
	}

	goback(){
        history.back(-1);
	}

	render(){
		return (
			<div className = 'hd_container'>
				{ this.state.homeDetailList }
			</div>
		)
	}
}

export default HomeDetail