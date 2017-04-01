import {stateToProps,dispatchToProps} from "./reduxwwb"
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory  } from 'react-router';
import { Link } from 'react-router';
import {connect} from "react-redux"
class Logins extends React.Component{
	constructor(props){
		super(props)
		this.state={
			isshow:'auto',
			ishide:'none',
			tip:['该账户尚未注册','密码与用户名不匹配','请填写手机号','用户名已存在','请填写密码','两次密码不一致','手机号格式错误','验证码获取失败'],
			tipinnerHTML:''
		}
		this.toRegister = this.toRegister.bind(this);
		this.toAttain = this.toAttain.bind(this);
		this.toLogin = this.toLogin.bind(this);
		this.Register = this.Register.bind(this);
	}
	
	toRegister(){
		this.setState({
			isshow:'none'
		})
	}
	
	toAttain(){
		this.setState({ tipinnerHTML:this.state.tip[7],ishide: 'block'});
		setTimeout(() => {
			this.setState({ ishide: 'none' });
		},1000);
	}

	//登录
	toLogin(){
		var userID=this.refs.userID.value;
		var	password=this.refs.password.value;
		var that = this;
		if(userID == '' || password == ''){
			that.setState({ tipinnerHTML:that.state.tip[2],ishide: 'block' });
			setTimeout(() => {
				that.setState({ ishide: 'none' });
			},1000);
		}else{
			var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID=" + userID + "&password=" + password;
			fetch(url)
			.then(response => response.json())
				.then(response => {
					if (response == 0) {
						that.setState({ tipinnerHTML:that.state.tip[0],ishide: 'block'  });
						setTimeout(() => {
      						that.setState({ ishide: 'none' });
    					},1000);
					} else if (response == 2) {
						that.setState({ tipinnerHTML:that.state.tip[1],ishide: 'block'  });
						setTimeout(() => {
      						that.setState({ ishide: 'none' });
    					},1000);
					} else if (response) {
						
						userID = response.userID;
						
						localStorage.setItem("userID",userID);
						localStorage.setItem("isLogin",1);
						that.props.changeLogin();
						window.location.href="/#/user";
					}
				})
		}
	}
	//注册
	Register(){
		var reg_mobile=this.refs.reg_mobile.value;
		var	reg_pass=this.refs.reg_pass.value;
		var	reg_re_pass=this.refs.reg_re_pass.value;
		var that = this;
		
		if(reg_mobile == '' || reg_pass == '' ||reg_re_pass == ''){
			that.setState({ tipinnerHTML:that.state.tip[2],ishide: 'block' });
			setTimeout(() => {
				that.setState({ ishide: 'none' });
			},1000);
		}  else if(!(/^1[34578]\d{9}$/.test(reg_mobile))) {
			that.setState({ tipinnerHTML:that.state.tip[6],ishide: 'block' });
			setTimeout(() => {
				that.setState({ ishide: 'none' });
			},1000);
		} else if(reg_re_pass !== reg_mobile){
			that.setState({ tipinnerHTML:that.state.tip[5],ishide: 'block' });
			setTimeout(() => {
				that.setState({ ishide: 'none' });
			},1000);
		}else {
			var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID=" + reg_mobile + "&password=" + reg_pass;
			fetch(url)
				.then(response => response.json())
				.then(response => {
					if (response == 1) {
						window.location.href = "http://localhost:9000/#/user"

					}else if(response == 0){
						that.setState({ tipinnerHTML:that.state.tip[3],ishide: 'block'  });
						setTimeout(() => {
							that.setState({ ishide: 'none' });
						},1000)
					}

				})
		}	
	}
	
  render(){
  		
    return(
    	<div id='login_register'>
    		
    		<div id='login' style={{display:this.state.isshow}}>
	    			
            	<div className = 'box_box' style={{display:this.state.ishide}}>{this.state.tipinnerHTML}</div>
		    		<div className='login_head'>
	    				<Link to='user'>
    						<div className='close'></div>
						</Link>
		    		</div>
	    			<div className='center' id='center'>
		    			<div className='log'>
							<img src="http://m.haozaishop.com/js_web/images/logo.png"/>
		    			</div>
		    			<input type="text" ref="userID" name="userID" placeholder="请输入手机号"/>
		    			<input type="password" ref="password" name="password" placeholder="请输入密码"/>
		    			<div className="clearfix">
	    					<div className="reset">
    							<div>重置密码</div>
							</div>
						</div>
							<div className="login" ref='login' onClick={this.toLogin}>登录</div>
							
							<div className="enroll" ref='register' onClick={this.toRegister}>注册</div>
							<div className="or"></div>
							<div className="wx_login clearfix">
								<div className="wx_ico"></div>
								<span>微信账号登录</span>
							</div>
						</div>
	    			<div className='login_footer'></div>
    		</div>
    		
			<div id="register">
				<div className = 'box_box' style={{display:this.state.ishide}}>{this.state.tipinnerHTML}</div>
				<div className='login_head'>
    				<Link to='user'>
						<div className='close'></div>
					</Link>
    			</div>
    			
    			<div className='center'>
					<input type="text" ref="reg_mobile" name="reg_mobile" placeholder="请输入手机号"/>
					<div className="clearfix">
						<div className="">
							<input className="code" ref='reg_code' type="text" name="reg_code" placeholder="请输入验证码"/>
							<div id="send_code" onClick={this.toAttain}>发送验证码</div>
						</div>
					</div>
					<input type="password" ref='reg_pass' name="reg_pass" placeholder="请输入密码"/>
					<input type="password" ref='reg_re_pass' name="reg_re_pass" placeholder="请确认密码"/>
						<div className="reg" id='reg' ref='register' onClick={this.Register}>注册</div>
						
					
				</div>
				
				<div className='login_footer'></div>
			</div>
  </div>
    )
  }
}

let Login =connect(stateToProps,dispatchToProps)(Logins);

export default Login
