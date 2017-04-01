'use strict';

import React from 'react';
import { Link } from 'react-router';

import Login from './login';

class User_adress extends React.Component{
	constructor (props) {
		super(props)
		this.state = {
			
		}
	}
	
	
  render(){
    return(
	    <div className="user_adress">
	    
	    
	    
	      	<div className="head" style={{display:'none'}}>
				<div className="return">取消</div>
				<div className="head_title">添加收货地址</div>
				<div className="sure">保存</div>
				<div className="change_sure">保存</div>
			</div>
			<ul className="change_list" style={{display:'none'}}>
				<li>收货人姓名<input type="text" placeholder="请输入您的姓名" className="text_name foucs"/></li>
				<li>手机号码<input type="text" placeholder="请输入您的的手机号" className="text_mobile foucs"/></li>
				<li>所在地区<input type="text" placeholder="请选择您所在的地区" className="region"/></li>
				<li>街道地址<input type="text" placeholder="请输入您的详细地址" className="text_address foucs"/></li>
			</ul>
			
			
			
			
			<div className="top">
		        <div className="go_back"></div>
				<div className="title">收货地址</div>
		    </div>
			<div className="bottom">添加新地址</div>
			
	    </div>
    )
  }
  
}
export default User_adress
