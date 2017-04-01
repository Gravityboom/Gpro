'use strict';

import React from 'react';
import { Link } from 'react-router';
import Login from './login';
import User_orderlist from './User_orderList';
import User_car from './User_car';
import User_adress from './User_adress';


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
	toMycar(){
		if(localStorage.getItem('isLogin')){
			var userID = localStorage.getItem('userID');
		  	location.href="#/user_car"
		}else{
			window.location.href="#/login"
		}
	}	
	
	toMyadress(){
		if(localStorage.getItem('isLogin')){
			var userID = localStorage.getItem('userID');
		  	location.href="#/user_adress"
		}else{
			window.location.href="#/login"
		}
	}
	
  render(){
    return(
      <div id="my_bar">
      	<div className="fr"></div>
	      	<div className = 'my_change'>
		      	<div>
			      	<div className="my_coupon" onClick={this.jump}>
						<span className="my_icon"></span>
							我的优惠券
						<span className="right_go"></span>
					</div>
				</div>
				<div>
					<div className="my_car" onClick={this.toMycar}>
						<span className="my_icon"></span>
							购物车
						<span className="right_go"></span>
					</div>
				</div>
				
				<div>
					<div className="my_adress" onClick={this.toMyadress}>
						<span className="my_icon"></span>
							收货地址
						<span className="right_go"></span>
					</div>
				</div>
			</div>
      </div>
    )
  }
  
}
export default User_bar
