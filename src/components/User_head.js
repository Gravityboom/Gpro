'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
class User_head extends React.Component{
		constructor(props){
		super(props)
		this.state={
			userID:[],
			flag:true,
			isLogin:1
		}
		this.removeData = this.removeData.bind(this);
	}
		
		
	removeData(){
		localStorage.removeItem("userID");
		localStorage.removeItem("isLogin");
		this.setState({
			userID:[],
			flag:true,
			isLogin:0
		})
	}
	
	
  render(){
  	
    return(
      <div className="user-head">
	      <div className="user-header">
		      <div className="img">
		      	<img src='http://static.haozaishop.com/mobile2/v1/img/u_h.png'/>
		      </div>
		        <div className="login_a">
					{this.state.userID}
					<div className={this.state.flag?"":"dis"}>
		        		<Link to="login">注册 / 登录</Link>
		        	</div>
		        	<div className={this.state.flag?"dis":""} onClick = {this.removeData}>退出</div>
		        </div>
	      </div>
        <div className="fr"></div>
      </div>
    )
  }
  
   componentDidMount(){
  
  	var _arr=[];
  	if(localStorage.getItem('isLogin')==1){
			var userID = localStorage.getItem('userID');
			_arr.push(<div>{userID}</div>)
	
			  	this.setState({
					userID:_arr,
					flag:false
				})
		}

  }
}
export default User_head
