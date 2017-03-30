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
            discount:'',
			totlal:0,
            homeDetailList:[]
		}
	}

	componentWillMount(){
        window.fetch('/json/detail.json')
            .then(response => {
                return response.json();
            })
            .then(json=>{
                let Json = json.data.goods_list;
                let tempArr = [];

                Json.map(item => {

                    tempArr.push(

						<ul className="hdgc">
							<li className="goods">
								<section className="detail_list">
									<div><button></button></div>
									<a href="javascript:void(0)">
										<div className="div123"><img src = {item['goods_thumb']} alt=""/></div>
										<div className="div456">
											<p className="dgoodname">{item['goods_name']}</p>
											<section className="goodattr">
												<span>{item['goods_attr'].substring(0,item['goods_attr'].indexOf(' '))}</span>
												<br />
												<span>规格:804*545*1700</span>
											</section>
											<div className="fl dgood_price">￥<span>{item['shop_price']}</span><span className="fr">X1</span></div>
										</div>
									</a>
								</section>

								<section className="changed">
									<button style={{ display: item['msg']=='' ?  'inline-block':'none' }} className="fr yo-btn yo-btn-changeAbtn">修改规格</button>
									<span style={{ display: item['msg']=='' ? 'none' : 'inline-block' }}>{item['msg']}</span>
								</section>
							</li>
						</ul>

                    );

                });

                this.setState({
                    homeDetailList:tempArr
                });

                console.log(this.state.homeDetailList)

            })
	}

	componentDidMount(){
		console.log('Mounted');
		let homeGoodId = this.props.params['homegoodid'];
        let self = this;


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
		});
	}

	goback(){
        history.back(-1);
	}

	render(){
		return (
			<div className = 'hd_container'>

				<Scroller style={{height:'100%'}}>
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
					<section className="gtype"><span className="fl">{this.state.space_name} {this.state.style_name}</span> <span className="fr">￥{this.state.default_money}/{this.state.space_name}</span></section>
					<p>学生时代的梦想，靠校车去承载，带着我们成长，可爱的上下铺汽车床，一定是小男生钟爱的大玩具！</p>
				</section>

				<section className="trans_gap">
                    {this.state.space_name}商品清单
				</section>


				{ this.state.homeDetailList }

				<section>
					<header>购买优惠</header>

				</section>
				</Scroller>
			</div>
		)
	}
}

export default HomeDetail