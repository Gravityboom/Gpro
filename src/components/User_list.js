'use strict';

import React from 'react';
import { Link } from 'react-router';
import Login from './login';
import User_orderlist from './login';

class User_list extends React.Component{
	
	constructor (props) {
		super(props)
		this.state = {
			change:'',
			userID:[],
			isLogin:1
		}
		this.jump=this.jump.bind(this)
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
        <div className="order_list">
		    <div className="order_list_box">
		    	<div onClick={this.jump}>
				    <div className="order_list_one no_pay">
				    	<span></span>
				    </div>
			    </div>
		    </div>
		    <div className="order_list_box">
			    <div onClick={this.jump}>
				    <div className="order_list_one no_consignment" >
				    	<span></span>
				    </div>
			    </div>
		    </div>
		    <div className="order_list_box">
		    	<div onClick={this.jump}>
				    <div className="order_list_one no_receipt" >
				    	<span></span>
				    </div>
			    </div>
		    </div>
		    <div className="order_list_box">
		    	<div onClick={this.jump}>
				    <div className="order_list_one finish" >
				    	<span></span>
				    </div>
			    </div>
		    </div>
		</div>
    )
  }
}
export default User_list
