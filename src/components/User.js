'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory  } from 'react-router';

import User_head from './User_head';
import User_order from './User_order';
import User_list from './User_list';
import User_bar from './User_bar';
import Login from './login';
import User_car from './User_car';
import User_adress from './User_adress';
class User extends React.Component{

  render(){
  	
    return(
    	<div id='user'>
    		<User_head/>
    		<User_order/>
    		<User_list/>
    		<User_bar/>
    		{this.props.children}
    	</div>

    )
  }
}



export default User
