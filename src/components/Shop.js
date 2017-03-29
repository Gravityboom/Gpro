'use strict';

import React from 'react';
import Kind from './shop/kind'
import Mycarousel from './shop/mycarousel'
import Recommend from './shop/recommend'
import Match from './shop/match'
import Myscroller from './shop/scroller'
import Design from './shop/design'
import Hotsale from './shop/hot-sale'
import Story from './shop/story'
import Newproduct from './shop/newproduct'
import Allgoose from './shop/allgoose'

class Shop extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:["/shopimg/2017011216550161634.jpg"],
			playflag:true,
      hts:[]
	}
}
  render(){
    return(
      <div className="shop_container">
        <div id="shop-top">
        	<div className="yo-header yo-header-top">
        	<h2 className="title"><img src="/shopimg/logo.png"/></h2>
        	<span className="regret"><img src="/shopimg/search.png"/></span>
        	<span className="affirm"><img src="/shopimg/cart.png"/></span>
        	</div>
        </div>
        <div id="shop-content">
        	<Mycarousel list={this.state.list} autoplay={this.state.playflag}/>
    			<Kind/>
    			<Recommend/>
    			<Match/>
    			<Myscroller/>
          <Design/>
          <div>
            <div className="yo-header yo-header-hotsale">
            <h2 className="title">好在</h2>
            <span className="regret">取消</span>
            <span className="affirm">确定</span>
            </div>
            {this.state.hts}
            <div className="more">查看更多</div>
          </div>
          <Story/>
          <Newproduct/>
          <Allgoose/>
        </div>
      </div>
    )
  }
  componentDidMount(){
    var _content1=[];
    var _content2=[];
    var _content3=[];
    var _content4=[];
    var _content5=[];
    var _hts=[];
    var that=this;
    fetch("http://wwbtygm.duapp.com/readhaozai",{method:"POST"})
    .then(res=>res.json())
    .then(function(res){
      var step=null;
      for(var i=0;i<res.length;i++){
        for(var j=i+1;j<res.length-1;j++){
          if(Number(res[i].username)>Number(res[j].username)){
            step=res[i];
            res[i]=res[j];
            res[j]=step;
          }
        }
      }
      for(var f=17;f<=44;f++){
        _content1.push(res[f]);
      }
      for(var g=46;g<=84;g++){
        _content2.push(res[g]);
      }
      for(var g=85;g<=131;g++){
        _content3.push(res[g]);
      }
       for(var g=132;g<=186;g++){
        _content4.push(res[g]);
      }
       for(var g=187;g<=203;g++){
        _content5.push(res[g]);
      }

      _hts.push(<Hotsale list={_content1} subtitle="这个春天让【清新文艺风】吹进卧室吧~" content="shop-content1"/>);
     _hts.push( <Hotsale list={_content2} subtitle="杯杯新气象 餐餐好心情" content="shop-content2"/>)
     _hts.push( <Hotsale list={_content3} subtitle="艺术画-大有不同" content="shop-content3"/>)
     _hts.push( <Hotsale list={_content4} subtitle="简约轻快-家居四件套" content="shop-content4"/>)
     _hts.push( <Hotsale list={_content5} subtitle="范店-陪你过今冬" content="shop-content5"/>)

      that.setState({
        hts:_hts
      });  
    })
  }
}
export default Shop
