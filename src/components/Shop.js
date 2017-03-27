'use strict';

import React from 'react';
import Kind from './shop/kind'
import Mycarousel from './shop/mycarousel'
import Recommend from './shop/recommend'
class Shop extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:["/shopimg/2017011216550161634.jpg"],
			playflag:true
		}
	}
  render(){
    return(
      <div className="shop_container">
        <div id="shop-top">
        	<div className="yo-header yo-header-top">
        	<h2 className="title">好在</h2>
        	<span className="regret">取消</span>
        	<span className="affirm">确定</span>
        	</div>
        </div>
        <div id="shop-content">
        	<Mycarousel list={this.state.list} autoplay={this.state.playflag}/>
			<Kind/>
			<Recommend/>
        </div>
      </div>
    )
  }
}
export default Shop
