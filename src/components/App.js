import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'; //引入router

import { store } from '../redux/store.js';
import { Provider } from 'react-redux';

import Home from './Home.js';
import Room from './Room.js';
import FullRoom from './FullRoom.js';

import Shop from './Shop.js';


import User from './User.js';

import User_orderList from './User_orderList.js';

import HomeDetail from './HomeDetail.js';

import Footer from './Footer.js';

import User_car from './User_car';
import User_adress from './User_adress';



import Cartshop from './shop/cartshop'
import Login from './login.js';
import Search from './shop/search'
import Goodslists from './shop/goodslists'
import Exchange from "./shop/exchange"

class App extends React.Component {
	render() {
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

{ /* Provider组件接受redux的store作为props 通过context往下传 */ }
ReactDOM.render((
    <Provider store = {store}>
        <Router history = {hashHistory}>
            <Route path = '/' component = {App}>
                <IndexRedirect to = "home/room" />
                <Redirect from = "home" to = "home/room" />
                <Route path = 'home' component = {Home}>
                    <Route path = 'room' titleName = '房间' component = {Room} />
                    <Route path = 'fullroom' titleName = '全屋' component = {FullRoom} />
                </Route>

                <Route path='shop' component={Shop} />
                <Route path='user' component={User} >
                    <Route path='user_orderlist' component={User_orderList} />
                </Route>
                <Route path='login' component={Login} />
                <Route path='user_car' component={User_car} />
                <Route path='user_adress' component={User_adress} />
            </Route>
            <Route path='cartshop/:id' component={Cartshop} />
            <Route path='search' component={Search}/>

            <Route path='goodslist/:cid' component={Goodslists} />
            <Route path="exchange" component={Exchange} />
            <Route path = 'homedetail/:homegoodid' component = {HomeDetail} />
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