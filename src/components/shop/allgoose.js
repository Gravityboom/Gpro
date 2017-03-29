import List from "../../component_dev/list/src/index"
import Story from './story'
let guid = -1;
class Allgoose extends React.Component {
	constructor(props){
		super(props);
		this.refetch=this.refetch.bind(this);
		this.state={
			listitem:[ 
			{}]
		}
	}
	refetch(){
		var that=this;
		var num=1;
		var _list=[];
		fetch('/api/v2/api/shop/listGoods?').then(res => res.json())
		.then(function(res){
			var _len=res.data.data.length;
			var res=res.data.data;
			console.log(res);
			for(var i=0;i<_len;i++){
			_list.push({content:<li className="listitem">
			<img src={res[i].goods_img}/>
			<p className="goodsname">{res[i].goods_name}</p>
			<p className="goodsprice">￥{res[i].shop_price}</p>
			</li>,key:++guid});
			}
			
			that.setState({
				listitem:that.state.listitem.concat(_list)
			})
		})
	}
	render(){
		console.log(this.state.listitem);
		return (
			<div className="allgoose">
				<p>所有商品</p>
				<List
					ref="list"
					 extraClass = {'goosebox'}
				    dataSource={this.state.listitem}
				      useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
                         	this.refetch();
                            this.refs.list.stopLoading(true);
                        }, 500);
                    }}
				    renderItem={(item,i)=>{
				        return (

				        	<div>
					               {item.content}
				            </div>
				        );
				    }}
				/>
			</div>
			)
	}
	componentWillMount(){
		var that=this;
		var num=1;
		var _list=[];
		fetch('/api/v2/api/shop/listGoods?').then(res => res.json())
		.then(function(res){
			var _len=res.data.data.length;
			var res=res.data.data;
			console.log(res);
			for(var i=0;i<_len;i++){
			_list.push({content:<li className="listitem">
			<img src={res[i].goods_img}/>
			<p className="goodsname">{res[i].goods_name}</p>
			<p className="goodsprice">￥{res[i].shop_price}</p>
			</li>,key:++guid});
			}
			
			that.setState({
				listitem:_list
			})
		})
	}
}
export default Allgoose