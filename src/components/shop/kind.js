import React from "react";
import {Link } from 'react-router';
class Kind extends React.Component {
	render(){
		return (
			<div className="shop-kind">
				<p className="title">分类</p>
			<Link to="search" className="kind">
			
				<li className="item">
					<i><img src="/shopimg/jingpinjiaju@2x.png"/></i>
					<span>精品家具</span>
				</li>
				<li to="jiaju" className="item">
					<i><img src="/shopimg/jiajubuyi@2x.png"/></i>
					<span>家具布艺</span>
				</li>
				<li to="peishi" className="item">
					<i><img src="/shopimg/peishiriyong@2x.png"/></i>
					<span>配饰日用</span>
				</li>
				<li to="chufang" className="item">
					<i><img src="/shopimg/chufangcanyin@2x.png"/></i>
					<span>厨房餐饮</span>
				</li>
				<li to="dengshi" className="item">
					<i><img src="/shopimg/dengshizhaoming@2x.png"/></i>
					<span>灯饰照明</span>
				</li>
			</Link>
			</div>
			)
	}
}
export default Kind;