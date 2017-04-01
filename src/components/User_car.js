'use strict';

import React from 'react';
import { Link } from 'react-router';

import Login from './login';

class User_car extends React.Component{
	constructor (props) {
		super(props)
		this.state = {
			isshow:'none',
			ishide:'block',
			show:'block',
			hide:'none',
		}
		this.Choose = this.Choose.bind(this);
		this.Change = this.Change.bind(this);
		this.Down = this.Down.bind(this);
		this.Show = this.Show.bind(this);
	}
	
	Choose() {
		this.setState({
			ishide:'none',
			isshow:'block'
		})
	}
	
	Down() {
		this.setState({
			ishide:'block',
			isshow:'none'
		})
	}
	
	Change() {
		this.setState({
			show:'none',
			hide:'block'
		})
	}
	Show() {
		this.setState({
			show:'block',
			hide:'none'
		})
	}
	
  render(){
    return(
	      <div className="user_car">
		      	<div className='car_head'>
		      		<div className="title">我的购物车</div>
		        	<Link to='/user'><div className="go_back"></div></Link>
		        	<div className="redact" onClick= {this.Change} style={{display:this.state.show}}>
		        		编辑
		        	</div>
		        	<div className="redact" onClick= {this.Show} style={{display:this.state.hide}}>
		        		完成
		        	</div>
		      	</div>
		        <div className='car_content'>
		        	
		        </div>
        		<div className='car_footer'>
 					<div className="bottom clearfix" style={{display:this.state.show}}>
				        <div className="fl">
				            <span className="del fl" onClick = {this.Choose} style={{display:this.state.ishide}}></span>
				            <span className="choose fl"  onClick = {this.Down} style={{display:this.state.isshow}}></span>
				            <p className="fl">全选</p>
				        </div>
	        			<div className="fr account"><span>结算</span></div>
	    				<div className="fr price">
	    					合计:<span> 0.00</span>
       			 		</div>
			 		</div>
			 		<div className="fr remove" style={{display:this.state.hide}}>全部删除</div>
        		</div>
	      </div>
    )
  }
  
}
export default User_car
