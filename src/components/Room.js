import React from 'react';
import Scroller from '../component_dev/scroller/src/index.js';
import List from '../component_dev/list/src/index.js';
import { Link } from 'react-router';

let guid = -1;

class Room extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      good_list:[{}]
    }
  }

  loadMore(){
      fetch('/api/v2/h5/index/space?is_json=1&page='+ 2 +'&space=&style=')
          .then(function(response){
              return response.json();})
          .then(function(result){
              let tempArr = [];{/* 定义空数组保存dom元素集合 */}
              let _data = result.data;
              _data.map(function(item){

                  tempArr.push({content:
                      <dl className='good_list'>
                        <dt>
                          <Link to={'homedetail/' + item['id']}>
                            <List.LazyImage style={{width:'100%'}} src={item['img']} />
                          </Link>
                        </dt>
                        <dd>
                          <ul>
                            <li className="good_list_name">{item['app_title']}</li>
                            <li className="good_price">￥{item['default_money']}/{item['space_name']}</li>
                          </ul>
                          <div className="good_list_button">
                            <button className="yo-btn yo-btn-goodbtn">商品清单</button>
                          </div>
                          <div className="good_list_type">
                            <button className='yo-btn yo-btn-typebtn'>{item['space_name']}</button>
                            <button className='yo-btn yo-btn-typebtn'>{item['style_name']}</button>
                          </div>
                        </dd>
                      </dl>
                      ,key: ++guid})
              });
              this.setState({
                  good_list:tempArr
              })
          }.bind(this))
          .catch(function(err){
              console.log(err);
          })
  }

  render () {
    return (
      <div className="scrol">
        <List
            ref="list"
            dataSource={this.state.good_list}
            useLoadMore={true}
            onLoad={() => {
              this.loadMore();
              this.refs.list.stopLoading(true);
            }}

            renderItem={(item,i)=>{
                return (
                    <div>
                    {item.content}
                    </div>
                );
            }}

        />


      </div>
    )
  }


  componentDidMount () {
      fetch('/api/v2/h5/index/space?is_json=1&page='+ 1 +'&space=&style=')
          .then(function(response){
              return response.json();})
          .then(function(result){
              let tempArr = [];{/* 定义空数组保存dom元素集合 */}
              let _data = result.data;
              _data.map(function(item){

                  tempArr.push({content:
                      <dl className='good_list'>
                        <dt>
                          <Link to={'homedetail/' + item['id']}>
                            <img style={{width:'100%'}} src={item['img']} />
                          </Link>
                        </dt>
                        <dd>
                          <ul>
                            <li className="good_list_name">{item['app_title']}</li>
                            <li className="good_price">￥{item['default_money']}/{item['space_name']}</li>
                          </ul>
                          <div className="good_list_button">
                            <button className="yo-btn yo-btn-goodbtn">商品清单</button>
                          </div>
                          <div className="good_list_type">
                            <button className='yo-btn yo-btn-typebtn'>{item['space_name']}</button>
                            <button className='yo-btn yo-btn-typebtn'>{item['style_name']}</button>
                          </div>
                        </dd>
                      </dl>
                      ,key: ++guid})
              });
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
