import {createStore} from "redux";
function reducer(state={value:0},action){
	switch (action.type){
		case "LOGINFLAG":
		return {value:action.value};
		case "EXIT":
		return {value:action.value};
		default:
		return state;
	}
	


}

function test(m) {
	console.log(m);
	switch (m){
		case 0:
		return 0;
		case 1:
		return 1;
		default:
		return 2;
	}

}
function stateToProps(state){
	return {value:test(state.value)}
}
function dispatchToProps(x,y) {
	return {
		changeLogin:function(){
		
			x({
				type:"LOGINFLAG",
				value:1
			});
			
		},
		doExit:function(){
			x({
				type:'EXIT',
				value:0
			})
		}
	}
	
}
export {stateToProps,dispatchToProps,reducer} 