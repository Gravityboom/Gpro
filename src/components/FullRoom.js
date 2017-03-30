import React from 'react';
import Scroller from '../component_dev/scroller/src/index.js';

import { Link } from 'react-router';

class FullRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullHouseUrl: '/api/v2/h5/index/home?&is_json=',
			jsonIndex: 1,
			pageNum: 1,
			fullHouseList:[],
			sonHouseList:[]
		}
	}

	componentDidMount() {

		let self = this;
		let url = this.state.fullHouseUrl + self.state.jsonIndex + '&page=' + self.state.pageNum + '&type=&style=';
		
		window.fetch(url)
		.then(response => {
			return response.json();
		})
		.then(result => {
			let Data = result.data;
			let tmpArr = [];
			
			Data.map((item,index) => {
				let len = item['aes_list'].length;
				let sonImg = [];
				let width
				for(let i = 0 ; i < len ; i++){
					sonImg.push(
							<li className='fullhome_detail_img_into'  >
								<img style = {{ width:'100%' }} src= {item['aes_list'][i]['img']} />
							</li>
					)
				}
				console.log(sonImg);
				
				tmpArr.push(
				<dl className='good_list'>
				
          <dt className='fullhouse_img'>
            <a href="#"><img style={{height:'3.75rem'}} src={item['img']} /></a>
          </dt>
          
          <div className='fullhome_detail_img_div' style = {{ height:'1.05469rem' }} >
	          <Scroller scrollX={true} scrollY={false} style={{ height:'100%' }} >
				  <div>
				<ul className='sonC' style ={{ width: len*1.2048 + 'rem' }}>
					{sonImg}
				</ul>
				  </div>
			  </Scroller>
          </div>
          
          <dd>
            <ul>
              <li className="good_list_name">{item['app_name']}</li>
              <li className="good_price">￥{item['default_money']}/{item['type_name']}</li>
            </ul>
            <div className="good_list_button">
              <button className="yo-btn yo-btn-goodbtn">商品清单</button>
            </div>
            <div className="good_list_type">
              <button className='yo-btn yo-btn-typebtn'>{item['type_name']}</button>
              <button className='yo-btn yo-btn-typebtn'>{item['style_name']}</button>
            </div>
          </dd>

        </dl>)

			})
			
			self.setState(
				Object.assign({},{fullHouseList:tmpArr})
			)
			
			
			
		})
	}

	render() {
		return(
			<Scroller style={{ height:'100%' }}>
				
				{this.state.fullHouseList}
			</Scroller>
		)
	}
}

//var FullRoom = React.createClass({
//getInitialState: function () {
//  return {
//    checked: false
//  };
//},
//onChildChanged: function (newState) {
//  this.setState({
//    checked: newState
//  });
//},
//render: function() {
//  var isChecked = this.state.checked ? 'yes' : 'no';
//  return (
//    <div>
//      <div>Are you checked: {isChecked}</div>
//      <ToggleButton text="Toggle me"
//        initialChecked={this.state.checked}
//        callbackParent={this.onChildChanged}
//        />
//    </div>
//  );
//}
//});

// 子组件
//var ToggleButton = React.createClass({
//getInitialState: function () {
//  return {
//    checked: this.props.initialChecked
//  };
//},
//onTextChange: function () {
//  var newState = !this.state.checked;
//  this.setState({
//    checked: newState
//  });
//  // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
//  this.props.callbackParent(newState);
//},
//render: function () {
//  // 从【父组件】获取的值
//  var text = this.props.text;
//  // 组件自身的状态数据
//  var checked = this.state.checked;
//
//  return (
//      <label>{text}: <input type="checkbox" checked={checked} onChange={this.onTextChange} /></label>
//  );
//}
//});
export default FullRoom