import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory ,IndexRoute, IndexRedirect, Redirect } from 'react-router'; //引入router

import { store } from '../redux/store.js';
import { Provider } from 'react-redux';

import Home from './Home.js';
import Room from './Room.js';
import FullRoom from './FullRoom.js';

import Shop from './Shop.js';


import User from './User.js';

import User_orderList from './User_orderList.js';

import Footer from './Footer.js';
import Login from './login.js';
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
  componentDidMount(){
  	
  }
}

{/* Provider组件接受redux的store作为props 通过context往下传 */}
ReactDOM.render((
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to="home/room" />
      <Redirect from="home" to="home/room" />
      <Route path='home' component={Home}>
        <Route path='room' titleName='房间' component={Room} />
        <Route path='fullroom' titleName='全屋' component={FullRoom} />
      </Route>
      <Route path='shop' component={Shop} />
      <Route path='user' component={User} >
	      <Route path='login' component={Login} />
	      <Route path='user_orderlist' component={User_orderList} />
      </Route>
      
    </Route>
    <Route path='login' component={Login} />
  </Router>
  </Provider>), document.getElementById('root'));





























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
