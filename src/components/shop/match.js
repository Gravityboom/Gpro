import React from "react";
import Mycarousel from "./mycarousel";
import {connect} from "react-redux";
import {stateToProps,dispatchToProps} from "./reduxwwb"
class Matchs extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:["/shopimg/2017011109460138311.jpg"],
			playflag:false
		}
	}
	render(){
		return (
				<div className="shop-match">
					<div className="yo-header yo-header-match">
						<h2 className="title">微搭配</h2>
						
					</div>
					
					<Mycarousel list={this.state.list} autoplay={this.state.playflag}/>
				</div>
			)
	}
}
var Match=connect(stateToProps,dispatchToProps)(Matchs);
export default Match;