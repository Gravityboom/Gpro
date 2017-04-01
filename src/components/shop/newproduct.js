import {Link } from "react-router"
class Story extends React.Component {
	constructor(props){
		super(props)
		this.state={
			list:[]
		}

	}
	render(){
		return (
				<div className="shop-news">
					<p className="subtitle">新品上新</p>
					<ul>
					{this.state.list}
					</ul>
				</div>
            
			)
	}
	componentDidMount(){
		var that=this;
		var _list=[],_arr=[];
	fetch("http://wwbtygm.duapp.com/readhaozai",{method:"POST"})
    .then(res=>res.json())
    .then(function(res){
    
		for(var i=120;i<152;i+=4){
			_arr.push(res[i]);
		}
		_arr.map(function(item){
				_list.push(<li className="item"><Link to={{pathname:"cartshop/"+item.id}}><img src={item.urlimg}/><p className="goodsname">{item.name}</p><p>{item.price}</p></Link></li>)
			})
		that.setState({
			list:_list

		});

    })
	}
}
export default Story;