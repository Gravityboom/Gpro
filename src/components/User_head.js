'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
class User_head extends React.Component{
  render(){
    return(
      <div className="user-head">
	      <div className="user-header">
		      <div className="img">
		      	<img src='http://static.haozaishop.com/mobile2/v1/img/u_h.png'/>
		      </div>
		        <div className="login_a">
		        	<div><Link to='user/login'>注册 / 登录</Link></div>
		        </div>
	      </div>
        <div className="fr"></div>
      </div>
    )
  }
}
export default User_head
	