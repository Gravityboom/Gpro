import Searchlist from './searchlist';
class Search extends React.Component {
	constructor(props){
		super(props)
		this.onBack=this.onBack.bind(this);
		
	}
	onBack(){
		history.go(-1);
	}
	render(){
		return (
				<div className="shop-search">
					<div className="yo-header yo-header-search">
						<div className="title" ><input type="text" placeholder="请输入要搜索的商品"/></div>
						<span className="regret" onClick={this.onBack}><img src="/shopimg/return.png"/></span>
					</div>
					<div className="tabb clearfix">
						<div className="classify active tabb1">分类</div>
						<div className="brand tabb1">品牌</div>
					</div>
					<Searchlist/>

				</div>
			)
	}
}
export default Search;