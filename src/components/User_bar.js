'use strict';

import React from 'react';
import { Link } from 'react-router';
import Login from './login';
import User_orderlist from './login';


class User_bar extends React.Component{
	
	constructor (props) {
		super(props)
		this.state = {
			change:'',
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
      <div className="my_bar">
      	<div className="fr"></div>
      	<div onClick={this.jump}>
	      	<div className="my_coupon">
						<span className="my_icon"></span>
							我的优惠券
						<span className="right_go"></span>
					</div>
				</div>
      	<div onClick={this.jump}>
					<div className="my_car">
						<span className="my_icon"></span>
							购物车
						<span className="right_go"></span>
					</div>
				</div>
      	<div onClick={this.jump}>
					<div className="my_adress">
						<span className="my_icon"></span>
							收货地址
						<span className="right_go"></span>
					</div>
				</div>
      </div>
    )
  }
  
}
export default User_bar
