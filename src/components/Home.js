'use strict';

import React from 'react';
import { Link } from 'react-router';
import Room from './Room.js';
import FullRoom from './FullRoom.js';
import LocationList from './LocationList.js';

import { connect } from 'react-redux';
import { mapStateToprops, mapDispatchToprops } from '../redux/store';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      locationFixed:'北京',
      locationIsShow:'location_leave',
      shadowClassName:'shadow_wrap_none'
    }
    this.locationFnOff.bind(this);
    this.locationFn.bind(this);
    this.toGetLocatiton.bind(this);
  }

  locationFnOff(){
    // var a = this.refs['location_part']['state']['location_name'];
    // this.setState({
    //   locationFixed:a
    // })
    // console.log(a)
    this.setState({
      locationIsShow:'location_leave',
      shadowClassName:'shadow_wrap_none'
    })
  }

  locationFn(){
    this.setState({
      locationIsShow:'location_active',
      shadowClassName:'home_shadow_wrap',
    })
  }

  toGetLocatiton(newState){
    this.setState({
      locationFixed:newState
    })
  }

  render(){
    return(
      <div className="Home_container">
        <div className="yo-header yo-header-homeheader">
          <h2 className="title"><section></section></h2>
          <span onClick={this.locationFn.bind(this)} className="regret"><i className="yo-ico">&#xe61c;</i>{this.state.locationFixed}</span>
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
        <section onClick={this.locationFnOff.bind(this)} className={this.state.shadowClassName}></section>
        <LocationList
          callbackHome={this.toGetLocatiton.bind(this)}
          locationIsShow={this.state.locationIsShow}
          closeLocation={this.locationFnOff.bind(this)}
        />
      </div>
    )
  }
  componentDidMount(){
    //react-redux部分
    let tabname = this.props['routes'][2]['titleName'];
    this.props.onChange({
      type:'SETHEADERNAME',
      title:tabname
    })
    //react-redux部分
  }

}

// export default Home

export default connect(
  mapStateToprops,
  mapDispatchToprops
)(Home)
