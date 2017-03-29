
import Scroller from "../../component_dev/scroller/src/index"
import aJax from "./Ajax"
class Myscroller extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list:[{ id: 'goods_id=2989',
				    urlimg: 'http://img5.haozaishop.com/images/201607/thumb_img/2989_thumb_P_1468218870564.jpg',
				    name: '环保玻璃 复古瓶5711_1',
				    price: ' ￥104.13' },
				  { id: 'goods_id=2986',
				    urlimg: 'http://img5.haozaishop.com/images/201607/thumb_img/2986_thumb_P_1468217448866.jpg',
				    name: '手工玻璃圆形果盘7006',
				    price: ' ￥92.43' },
				  { id: 'goods_id=2966',
				    urlimg: 'http://img2.haozaishop.com/images/201607/thumb_img/2966_thumb_P_1467964237082.jpg',
				    name: '红蓝线大盘',
				    price: ' ￥57.33' },
				  { id: 'goods_id=2965',
				    urlimg: 'http://img1.haozaishop.com/images/201607/thumb_img/2965_thumb_P_1467964018161.jpg',
				    name: 'TCM茶壶',
				    price: ' ￥117.00' }]
		}
	}
	render(){
		var _list=[];
		this.state.list.map(function(item){
			_list.push(<li className="item" data-id={item.id}>
						<img  src={item.urlimg}/>
						<p className="match_name">{item.name}</p>
						<p className="match_price">{item.price}</p>
					</li>)	
		})
		return (
			<div className="shop-scroller">
				<Scroller scrollX={true}>
				<ul className="scroller-box">
					{_list}
			
				</ul>
				</Scroller>
			</div>
			)
	}
	componentDidMount(){

	}
}
export default Myscroller;