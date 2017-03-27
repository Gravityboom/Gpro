
import Scroller from "../../component_dev/scroller/src/index"
class Myscroller extends React.Component{
	render(){
		return (
			<div className="shop-scroller">
				<Scroller scrollX={true}>
				<ul className="scroller-box">
					<li className="item">1</li>
					<li className="item">1</li>

					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
					<li className="item">1</li>
				</ul>
				</Scroller>
			</div>
			)
	}
}
export default Myscroller;