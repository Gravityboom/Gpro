import aJax from "./Ajax"
import List from "../../component_dev/list/src/index"
class Goodslists extends React.Component {
	constructor(props){
		super(props)
		this.goBack=this.goBack.bind(this);
		this.state={
			listitem:[{},{},{},{},{},{},{},{}],
			playflag:false
		}
	}
	goBack(){
		history.go(-1);
	}
	render(){
		return (
				<div className="shop-goodslist">
				<div className="yo-header yo-header-goodslist">
					<p className="title">所有商品</p>
					<span className="regret" onClick={this.goBack}>返回</span>
				</div>
				
				<List
					ref="list"
					 extraClass = {'goosebox'}
				    dataSource={this.state.listitem}
				      useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
                         	
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
		console.log(this.props.params.cid);
		var _cid=this.props.params.cid;
		var _arr=[];
		var that=this;
		var _url="http://wwbtygm.duapp.com/hlist";
		aJax("post",_url,true,{region_id:37,page:1,page_size:8,cid:_cid},function(data){
			var value=JSON.parse(data).data.data;
			console.log(value);
			for(var i=0;i<value.length;i++){
				_arr.push({content:<li data-id={value[i].goods_id} className="list-box"><img src={value[i].goods_img}/>
				<div className="shop-goodsname">{value[i].goods_name}</div>
				<div className="shop-goodsprice">￥{value[i].market_price}</div>
				</li>})
			}
			
			that.setState({
				listitem:_arr
			})
		})

	}
}
export default Goodslists;