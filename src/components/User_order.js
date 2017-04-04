'use strict';

import React from 'react';
import { Link } from 'react-router';

import User_orderList from './User_orderList';
import Login from './login';

class User_order extends React.Component{
	constructor (props) {
		super(props)
		this.state = {
			change:'',
			userID:[],
			isLogin:1
		}
	}
	
	jump(){
		if(localStorage.getItem('isLogin')){
			var userID = localStorage.getItem('userID');
		  	location.href="#/user/user_orderList"
		}else{
			window.location.href="#/login"
		}
	}
	
  render(){
    return(
      <div onClick={this.jump}>
	      <div className="my_order">
	        <p>我的订单</p>
	        <span className='look_all_order'>查看全部订单</span>
	        <span className='right_go'></span>
	      </div>
      </div>
    )
  }
  
}
export default User_order
