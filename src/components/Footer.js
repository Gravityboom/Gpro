
import React from 'react';
import { Link } from 'react-router';
class Footer extends React.Component{
  render(){
    return(
      <footer id="footer">
        <ul>
          <Link to = 'home'><li><i></i><b>场景</b></li></Link>
          <Link to = 'shop'><li><i></i><b>商城</b></li></Link>
          <Link to = 'user'><li><i></i><b>我的</b></li></Link>
        </ul>
      </footer>
    )
  }
}

export default Footer
