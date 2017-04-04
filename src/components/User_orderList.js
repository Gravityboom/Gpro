'use strict';

import React from 'react';
import { Link } from 'react-router';

class User_orderList extends React.Component{
	constructor (props) {
		super(props)
		
	}
  render(){
    return(
        <div id="user_orderlist">
		    <div className='orserlist_head'>
		    	<Link to = '/user'><div className="go_back"></div></Link>
		    	<div className="logo">
		    	</div>
		    </div>
		    <div className='orserlist_content'></div>
		</div>
    )
  }
}


export default User_orderList
