import Carousel from '../../component_dev/carousel/src/index';
import React from "react";
class Mycarousel extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:[]
		}

	}
	render(){
		return (
			<Carousel autoplay={this.props.autoplay}>
				{this.state.list}
			</Carousel>
			)
	}
	componentWillMount(){
		var _list=[];
		this.props.list.map(function(item){
			_list.push(<li className="item"><img src={item} className=""/></li>)
		})
		
		this.setState({
			list:_list
		})
	}


}
export default Mycarousel;