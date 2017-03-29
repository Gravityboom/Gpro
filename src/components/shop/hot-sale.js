import {Link} from 'react-router'
import Scroller from "../../component_dev/scroller/src/index"
class Hotsale extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:[]
		}
	}
	render(){
	
		return (
			<div className="hot-sale">
				<p className="hot-title">{this.props.subtitle}</p>
				<Scroller scrollX={true} scrollY={false}>
					<ul className={this.props.content}>
						{this.state.list}
					</ul>
				</Scroller>
			</div>
			)
	}
	componentDidMount(){
			var _list=[];
		this.props.list.map(function(item){
			_list.push(<li className="item">
						<Link to={{pathname:"cartshop/"+item.id}} data-id={item.id}>
						<img  src={item.urlimg}/>
						<p className="match_name">{item.name}</p>
						<p className="match_price">{item.price}</p>
					</Link></li>)	
		})
		this.setState({
			list:_list
		})
	}
}
export default Hotsale;