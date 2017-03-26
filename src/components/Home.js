'use strict';

import React from 'react';
import { Link } from 'react-router';
import Room from './Room.js';
import FullRoom from './FullRoom.js';


class Home extends React.Component{
  render(){
    return(
      <div className="Home_container">
        <div className="yo-header">
          <h2 className="title">好在</h2>
          <span className="regret"><i class="yo-ico"></i>北京</span>
          <span className="affirm">筛选<i class="yo-ico"></i></span>
        </div>
        <ul className="yo-tab">
          <li className="item item-on"><Link to='home/room'>房间</Link></li>
          <li className="item"><Link to='home/fullroom'>全屋</Link></li>
        </ul>


        <div className="scroller_container">
          {/* Home二级路由视口 */}
          {this.props.children}

        </div>

      </div>
    )
  }
}

export default Home
