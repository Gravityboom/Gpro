'use strict';

import React from 'react';

class User_bar extends React.Component{
  render(){
    return(
      <div className="my_bar">
      	<div className="fr"></div>
      	<div className="my_coupon">
					<span className="my_icon"></span>
						我的优惠券
					<span className="right_go"></span>
				</div>
				<div className="my_car">
					<span className="my_icon"></span>
						购物车
					<span className="right_go"></span>
				</div>
				<div className="my_adress">
					<span className="my_icon"></span>
						收货地址
					<span className="right_go"></span>
				</div>
				
		    
      </div>
    )
  }
}
export default User_bar
