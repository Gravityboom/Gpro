
class Exchange extends React.Component {
	constructor(props){
		super(props)

	}

	render(){
		return (
				<div className="shop-exchange">
					<div className="head-content">您的留言已收到，感谢支持好在HAOZAI，客服小J将尽快为您处理！联系电话：4008123804</div>
					<form>
						<ul className="exchange-box">
							<li className="your-name">
								<span>姓名:</span><input type="text" placeholder="(必填)"/>
							</li>
							<li className="your-number">
								<span>手机号码:</span><input type="text" placeholder="(必填)"/>
							</li>
							<li className="your-mail">
								<span>电子邮件:</span><input type="text"/>
							</li>
							<li className="your-title">
								<span>留言主题:</span><input type="text"/>
							</li>
							<li className="your-content">
								<span>留言内容:</span>
								<textarea placeholder="(必填)"></textarea>
							</li>
							<li className="ok-quit">
								<span className="ok">确定</span><span className="quit">取消</span>
							</li>
						</ul>
					</form>
				</div>

			)
	}
	componentDidMount(){
	}
}
export default Exchange;
