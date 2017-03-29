import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory ,IndexRoute, IndexRedirect, Redirect } from 'react-router'; //引入router

//import Footer from './Footer.js';

import Home from './Home.js';
import Room from './Room.js';
import FullRoom from './FullRoom.js';


import Shop from './Shop.js';
import User from './User.js';
import Cartshop from './shop/cartshop'
import Footer from './Footer.js';
import Matter from './shop/Matter';
import Standard from './shop/Standard';

class App extends React.Component{
  render(){
    return(
      <div id='main_container'>

        {/* 主体部分 */}
        <section id='header_and_content'>
          {/* 一级路由的视口在这 */}
          {this.props.children}
        </section>

        {/* 底部导航部分 */}
        <Footer/>

      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to="home/room" />
      <Redirect from="home" to="home/room" />
      <Route path='home' component={Home}>
        <Route path='room' component={Room} />
        <Route path='fullroom' component={FullRoom} />
      </Route>
      <Route path='shop' component={Shop} />
      <Route path='user' component={User} />
    </Route>
    <Route path='cartshop/:id' component={Cartshop}>
      <Route path='matter' component={Matter}/>
      <Route path='standard' component={Standard}/>
    </Route>
  </Router>), document.getElementById('root'));





























// class Index extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       name: []
//     }
//   }
//
//   render() {
//     return (
//       <div>{ this.state.name }</div>
//     )
//   }
//
//   componentDidMount() {
//     fetch('/api/list.php')
//     .then(response=>response.json())
//     // function(response) {
//     //   return response.json()
//     // }
//     .then(res=>{
//       // console.log(res);
//       this.setState({
//         name: <div>{res.xixixi}</div>
//       })
//     })
//   }
// }
