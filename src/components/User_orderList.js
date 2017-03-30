'use strict';

import React from 'react';
import { Link } from 'react-router';
class User_orderList extends React.Component{
	constructor (props) {
		super(props)
		this.state={
			
		}
	}
  render(){
    return(
        <div id="user_orderlist">
		    <div className='orserlist_head'>
		    	<Link to = '/user'><section className="go_back"></section></Link>
		    	<section className="logo"></section>
		    </div>
		    <div className='orserlist_content'></div>
		</div>
    )
  }
}
export default User_orderList
