'use strict';

import React from 'react';

class User_list extends React.Component{
  render(){
    return(
        <div className="order_list">
		    <div className="order_list_box">
			    <div className="order_list_one no_pay">
			    	<span></span>
			    </div>
		    </div>
		    <div className="order_list_box">
			    <div className="order_list_one no_consignment" >
			    	<span></span>
			    </div>
		    </div>
		    <div className="order_list_box">
			    <div className="order_list_one no_receipt" >
			    	<span></span>
			    </div>
		    </div>
		    <div className="order_list_box">
			    <div className="order_list_one finish" >
			    	<span></span>
			    </div>
		    </div>
		</div>
    )
  }
}
export default User_list
