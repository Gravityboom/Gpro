/*import createStore from "redux"

function reducer(state={count:0},action){
	switch(action.type){
		case "INCREASE":
		return {count:count+1}
		default:
		return state
	}
}
function mapStateToProps(state){
	return {
		value:state.count
	}
}
function mapDispatchToProps(dispatch){
	return {
		onIncrease:function(dispatch){
			dispatch({type:"INCREASE"})
		}
	}
}
let store=createStore(reducer);

export {mapDispatchToProps,mapStateToProps,store}*/