import Carousel from '../../component_dev/carousel/src/index';
class Design extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:[{urlimg:"/shopimg/2017011110460169349.png",title:"中粮项目小高层 客厅 现代风格"}],
			playflag:false,
			datalist:[]
		}
	}
	render(){
		return (
				<div className="shop-design">
					<div className="yo-header yo-header-design">
						<h2 className="title">搭配设计方案</h2>
					
					</div>
					<Carousel autoplay={false}>
						{this.state.datalist}
					</Carousel>
				</div>
			)
	}
	componentWillMount(){
	var _list=[];
	this.state.list.map(function(item){
		_list.push(<li className="item"><img src={item.urlimg} className=""/><p className="subtitle">{item.title}</p></li>)
	})
	
	this.setState({
		datalist:_list
	})
	}
}
export default Design;