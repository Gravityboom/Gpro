import React from "react";
import {Link } from 'react-router';
class Kind extends React.Component {
	render(){
		return (
			<div className="shop-kind">
				<p className="title">分类</p>
			<div className="kind">
			
				<Link to="jingpin" className="item">
					<i>1</i>
					<span>精品家具</span>
				</Link>
				<Link to="jiaju" className="item">
					<i>1</i>
					<span>家具布艺</span>
				</Link>
				<Link to="peishi" className="item">
					<i>1</i>
					<span>配饰日用</span>
				</Link>
				<Link to="chufang" className="item">
					<i>1</i>
					<span>厨房餐饮</span>
				</Link>
				<Link to="dengshi" className="item">
					<i>1</i>
					<span>灯饰照明</span>
				</Link>
			</div>
			</div>
			)
	}
}
export default Kind;