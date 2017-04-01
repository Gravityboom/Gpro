
import React from 'react';
import { Link } from 'react-router';
class Footer extends React.Component{
  render(){
    return(
      <footer id="footer">
        <ul>
          <Link to = 'home' activeStyle={{color:'#007846'}} activeClassName='nav_active'><li><i className='yo-ico'>&#xe611;</i><b>场景</b></li></Link>
          <Link to = 'shop' activeStyle={{color:'#007846'}} activeClassName='nav_active'><li><i className='yo-ico'>&#xe604;</i><b>商城</b></li></Link>
          <Link to = 'user' activeStyle={{color:'#007846'}} activeClassName='nav_active'><li><i className='yo-ico'>&#xe8aa;</i><b>我的</b></li></Link>
        </ul>
      </footer>
    )
  }
}

export default Footer
