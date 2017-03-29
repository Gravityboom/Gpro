import React from 'react'

import {render} from 'react-dom' 
import {Link} from 'react-router'

import Carousel from '../../component_dev/carousel/src/';
import InputNumber from '../../component_dev/inputnumber/src/index.js';
import Modal from '../../component_dev/modal/src/index.js';
import Popup from '../../component_dev/popup/src/index.js';
import fetchData from './fetch.js'
class Cartshop extends React.Component{
	constructor(props){
		super(props)
		this.Click=this.Click.bind(this)
		this.extend=this.extend.bind(this)
		this.routeChange=this.routeChange.bind(this)
		this.state = {
	      bannerList:[<div/>],
	      routechange:false,
	      i:0,
	      icon:'&#xe65e;',
	      a:false
	    }
	    console.log(this.props.params.id);


	}
	render () {
		return (
			<div className="cartshop">
				<section>
					<Carousel className="swiper" autoplay={false}>
					 	{this.state.bannerList}   
					</Carousel>
					<div className="goodsName"><span>九龙七彩琉璃杯</span></div>
					<div className="price"><span>$400</span></div>
					<div className="changeNorms">
						<div className="contentNorms" onClick={this.Click}>
							<span >选择规格:1</span>
							<span></span>
						</div>
					</div>
					<div className="activity">
						<div className="contentActivity" onClick={this.extend} ref="extend">
							<div className="left">
								<span>活动:</span>
								<span className="noMoney" >包邮</span>
							</div>
							<div className="right" className="yo-ico" ref='icon'>&#xe6cb;</div>
							<div className='hide' ref='hide'>包邮:本商品包邮 </div>
						</div>
					</div>
					<div className="service">
						<div className="contentService">
							<p>客服:4008-2311-31231,工作时间:9:00-18:00</p>
							<p>由阿莫家具发货,并提供售后服务</p>
						</div>
					</div>
					<div className="advantage">
						<div className="contentAdvantage">
							<span><i className="yo-ico">&#xe621;</i><em>正品保障</em></span>
							<span><i className="yo-ico">&#xe621;</i><em>7天退换货</em></span>
							<span><i className="yo-ico">&#xe621;</i><em>先行赔付</em></span>
						</div>
					</div>
					<div className="logo">
						<div className="contentLogo">
							<span >
								摩西家园
							</span>
							<i className="yo-ico">&#xe6cb;</i>
						</div>
					</div>
					<div className="detail" id="detail">
						<div className="contentDetail">
							<div className="detailTop">
								<span><i onClick={this.routeChange}>
								<Link to="/cartshop/matter" activeClassName="active">详情</Link></i></span>
								<span><i data-id="" onClick={this.routeChange}><Link to="/cartshop/standard" activeClassName="active">规格</Link></i></span>
							</div>
							<div id="matter">
							 	{this.props.children}
							 </div>
						</div>
					</div>
					<div className="modal">
						<div classname="box"></div>
						<div className="msg">
							
						</div>
					</div>
				</section>
				<div className="popup">
				<Popup show={this.state.a}  direction="up"  style={{height:'auto'}}>
					<img src="" />
					<div className="imgb">
						<div className="dmsgn">琉璃杯</div>
						<div className="dmsgp">$199</div>
					</div>
					<div className="v">
						<span>
							<p>数量</p>
							<i><em></em></i>
						</span>
					</div>
					<div className="color">
						<span>
							<p>数量</p>
							<i><em></em></i>
						</span>
					</div>
					<div className="num">
						<span>
							<p>数量</p>
							<i>
								
								<InputNumber
								    value={this.state.value}
								    onChange={value => this.setState({value})}
								     min={0}
								>
								<input type="number" />
								</InputNumber>
								
							</i>
						</span>
					</div>
					<div className="foot">
						购物车
					</div>
				</Popup>
				</div>
				<footer>
					<ul>
						<li><Link className="yo-ico icon">&#xe603;</Link></li>
						<li><Link className="yo-ico icon">&#xe602;</Link></li>
						<li onClick={this.Click}><Link>加入购物车</Link></li>
						<li onClick={this.Click}><Link>立即购买</Link></li>
					</ul>
				</footer>
			</div>
		)
	}
	
	Click (){
			console.log(this.state.a)
			if(!this.state.a){
				 this.setState({
		          	a:!this.state.a
				 })
			}
			
	}
	extend () {
		if(this.state.i!==1&&this.state.i%2==0){
			this.refs.hide.style.display="block";
			this.refs.icon.innerHTML="&#xe65e;"
		}else{
			this.refs.hide.style.display="none";
			this.refs.icon.innerHTML="&#xe6cb;"
		}
		this.state.i++;
	}
	routeChange (){
			if(!this.state.routechange){
				 this.setState({
		          	routechang:!this.state.routechange
				 })
			}
	}
	 componentDidMount() {
	 //	let url = 'http://localhost:3000/list.php?count=3'
	 	var _url="/v2/h5/cart/goodsChangePrice"
	 	fetch(_url,{}).then(res=>res.json())
	 	.then(res=>{
	 		console.log(res);
	 	})
	 /*	
	 	fetchData(url,function(res){
	 		let Lis=res.data.map(val=>{
				return ( <li className="item"><img className="img" src={val.img}/></li>  )
	 	})
	 		this.setState({
				bannerList:Lis
			})
	 	}.bind(this))	*/
	 }
}
export default Cartshop