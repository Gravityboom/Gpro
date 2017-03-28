'use strict';

import React from 'react';
import { Link } from 'react-router';
import Room from './Room.js';
import FullRoom from './FullRoom.js';
import LocationList from './LocationList.js';

class Home extends React.Component{
  constructor(props){
    super(props)
  }

  locationFn(){
    console.log(1);
  }

  render(){
    return(
      <div className="Home_container">
        <div className="yo-header yo-header-homeheader">
          <h2 className="title"><section></section></h2>
          <span onClick={this.locationFn} className="regret"><i className="yo-ico">&#xe61c;</i>北京</span>
          <span className="affirm">筛选<i className="yo-ico">&#xe62d;</i></span>
        </div>

        <ul className="yo-tab">
          <li className="item item-on"><Link to='home/room' activeClassName='onsele' activeStyle={{color: '#007846'}}>房间</Link></li>
          <li className="item"><Link to='home/fullroom' activeClassName='onsele'  activeStyle={{color: '#007846'}}>全屋</Link></li>
        </ul>


        <div className="scroller_container">
          {/* Home二级路由视口 */}
          {this.props.children}
        </div>

        <LocationList/>
      </div>
    )
  }
}

export default Home
