import React from "react";
import Mycarousel from "./mycarousel";
class Recommend extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:["/shopimg/2017012110040140909.jpg"],
			playflag:false
		}
	}
	render(){
		return (
				<div className="shop-recommend">
					<div className="yo-header yo-header-recommend">
						<h2 className="title">达人精品推荐</h2>
						<span className="affirm">更多</span>
					</div>
					<Mycarousel list={this.state.list} autoplay={this.state.playflag}/>
				</div>
			)
	}
}
export default Recommend;