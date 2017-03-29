import React from 'react';
import Scroller from '../component_dev/scroller/src/index.js';

class Room extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      good_list:[]
    }
  }

  render () {
    return (
      <Scroller style={{height:'100%'}}>
          {this.state.good_list}
      </Scroller>
    )
  }

  componentDidMount () {

    fetch('/api/v2/h5/index/space?is_json=1&page='+ 1 +'&space=&style=')

    .then(function(response){
      return response.json();})

    .then(function(result){

      {/* bind 改变this指向 console.log(this)*/}
      var tempArr = [];{/* 定义空数组保存dom元素集合 */}
      var _data = result.data;
      _data.map(function(item,index){

        tempArr.push(
          <dl className='good_list'>
          <dt>
            <a href="#"><img style={{width:'100%'}} src={item.img}/></a>
          </dt>
          <dd>
            <ul>
              <li>{item['app_title']}</li>
              <li>￥{item['default_money']}/{item['space_name']}</li>
            </ul>
            <div>
              <button>商品清单</button>
            </div>
          </dd>
          <div>
            <span>{item['space_name']}</span>
            <span>{item['style_name']}</span>
          </div>
        </dl>
      )
      })
      this.setState({
        good_list:tempArr
      })
    }.bind(this))

    .catch(function(err){
      console.log(err);
    })
  }
}

export default Room
