import Carousel from '../../component_dev/carousel/src/index';
import React from "react";
class Mycarousel extends React.Component {
	render(){
		return (
			<Carousel>
				<li className="item">
					<img src="/shopimg/2017011216550161634.jpg"/>
				</li>
				<li className="item"><img src="/shopimg/2017011216550161634.jpg"/></li>
				<li className="item"><img src="/shopimg/2017011216550161634.jpg"/></li>
			</Carousel>
			)
	}

}
export default Mycarousel;