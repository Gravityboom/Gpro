import { createStore } from 'redux'

function reducer(state={title:'defaultTitle'},action){
  switch (action.type) {
    case 'SETHEADERNAME':
      return {title:action.title};
      break;
    default:
      return state
  }
}

function mapStateToprops(state){
  return {
    value:state.title
  }
}

function mapDispatchToprops(dispatch) {
  return {
    //返回一个方法
    onChange:(action)=>dispatch(action)
  }
}

let store = createStore(reducer);//将reducer纯函数作为参数输入 生成新的store

export { mapStateToprops,mapDispatchToprops,store }
