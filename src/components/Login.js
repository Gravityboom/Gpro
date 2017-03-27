'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory  } from 'react-router';
import { Link } from 'react-router';

class Login extends React.Component{
  render(){
    return(
    	<div id='login'>
	    		<div className='login_head'>
	    				<Link to='user'>
	    						<div className='close'></div>
							</Link>
	    		</div>
	    		
    		<div className='center'>
	    			<div className='log'>
							<img src="http://m.haozaishop.com/js_web/images/logo.png"/>
		    		</div>
	    			<input type="text" name="mobile" placeholder="请输入手机号"/>
	    			<input type="password" name="pass" placeholder="请输入密码"/>
	    			<div className="clearfix">
	    					<div className="reset">
	    							<div>重置密码</div>
    						</div>
						</div>
						
						<div className="login">登录</div>
						<div className="enroll">注册</div>
						<div className="or"></div>
						<div className="wx_login clearfix">
								<div className="wx_ico"></div>
								<span>微信账号登录</span>
						</div>
						
						
						
    		</div>
    		
    		<div className='login_footer'></div>
    	</div>
	      
    )
  }
}



export default Login
