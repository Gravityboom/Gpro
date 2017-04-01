const multiData = {
	subItemType: 'ProductMenu',
    subList: [{
        name: '产品1',
        value: 1,
        subList: '精品家居',
         msg:[{
         	imgurl:"http://img4.haozaishop.cn/category/chuang.jpg",
         	goodsname:"床",
         	cid:21
         },{
         	imgurl:"http://img4.haozaishop.cn/category/chuangdian.jpg",
         	goodsname:"床垫",
         	cid:22
         },{
         	imgurl:"http://img4.haozaishop.cn/category/shafa.jpg",
         	goodsname:"沙发",
         	cid:23
         },{
         	imgurl:"http://img4.haozaishop.cn/category/guizi.jpg",
         	goodsname:"柜子",
         	cid:24
         },{
         	imgurl:"http://img4.haozaishop.cn/category/chaji.jpg",
         	goodsname:"茶几",
         	cid:25
         },{
         	imgurl:"http://img4.haozaishop.cn/category/zhuozi.jpg",
         	goodsname:"桌子",
         	cid:26
         },{
         	imgurl:"http://img4.haozaishop.cn/category/yizi.jpg",
         	goodsname:"床垫",
         	cid:27
         },{
         	imgurl:"http://img4.haozaishop.cn/category/jiazi.jpg",
         	goodsname:"架子",
         	cid:28
         },{
         	imgurl:"http://img4.haozaishop.cn/category/pingjing.jpg",
         	goodsname:"镜子",
         	cid:29
         },{
         	imgurl:"http://img4.haozaishop.cn/category/pingfeng.jpg",
         	goodsname:"屏风",
         	cid:224
         },{
         	imgurl:"http://img4.haozaishop.cn/category/all.png?v=2016050411",
         	goodsname:"全部",
         	cid:16
         }],
    },{
        name: '产品2',
        value: 2,
        subList: '家具布艺',
         msg:[{imgurl:"http://img4.haozaishop.cn/category/209.jpg?v=20160325",goodsname:"床品套件"},
         	{imgurl:"http://img4.haozaishop.cn/category/188.jpg",goodsname:"靠垫/抱枕"},
         	{imgurl:"http://img4.haozaishop.cn/category/207.jpg",goodsname:"被子/被芯"},
         	{imgurl:"http://img4.haozaishop.cn/category/208.jpg?v=20160325",goodsname:"枕头/枕芯"},
         	{imgurl:"http://img4.haozaishop.cn/category/190.jpg?v=2016122911",goodsname:"地毯/地垫"},
         	{imgurl:"http://img4.haozaishop.cn/category/185.jpg?v=20160325",goodsname:"餐桌布艺"},
         	{imgurl:"http://img4.haozaishop.cn/category/206.jpg?v=20160325",goodsname:"毛毯/披毯"},
         	{imgurl:"http://img4.haozaishop.cn/category/all.png?v=2016050411",goodsname:"全部"}
         ]
    },
    {
        name: '产品3',
        value: 3,
        subList: '配饰日用',
        msg:[{imgurl:"http://img4.haozaishop.cn/category/181-1.jpg",goodsname:"创意饰品"},
         	{imgurl:"http://img4.haozaishop.cn/category/180.jpg?v=20160325",goodsname:"花瓶/花盆"},
         	{imgurl:"http://img4.haozaishop.cn/category/175-1.jpg",goodsname:"装饰画/相框"},
         	{imgurl:"http://img4.haozaishop.cn/category/177-1.jpg",goodsname:"蜡烛/香薰"},
         	{imgurl:"http://img4.haozaishop.cn/category/176.jpg",goodsname:"装饰器皿"},
         	{imgurl:"http://img4.haozaishop.cn/category/227-1.jpg",goodsname:"礼品鲜花"},
         	{imgurl:"http://img4.haozaishop.cn/category/161.jpg",goodsname:"收纳用品"},
         	{imgurl:"http://img4.haozaishop.cn/category/196.jpg",goodsname:"浴室用品"},
         	{imgurl:"http://img4.haozaishop.cn/category/all.png?v=2016050411",goodsname:"全部"}
         ]

    },{
        name: '产品4',
        value: 4,
        subList: '厨房餐饮',
        msg:[{imgurl:"http://img4.haozaishop.cn/category/116.jpg?v=2016122711",goodsname:"餐具"},
         	{imgurl:"http://img4.haozaishop.cn/category/112.jpg",goodsname:"茶具"},
         	{imgurl:"http://img4.haozaishop.cn/category/113.jpg",goodsname:"酒具"},
         	{imgurl:"http://img4.haozaishop.cn/category/115-1.jpg",goodsname:"杯子"},
         	{imgurl:"http://img4.haozaishop.cn/category/114.jpg?v=20161229411",goodsname:"咖啡具"},
         	{imgurl:"http://img4.haozaishop.cn/category/117.jpg",goodsname:"烹饪工具"},
         	{imgurl:"http://img4.haozaishop.cn/category/118.jpg",goodsname:"厨房收纳"},
         	{imgurl:"http://img4.haozaishop.cn/category/all.png?v=2016050411",goodsname:"全部"}
         ]
    },{
        name: '产品5',
        value: 5,
        subList: '灯饰照明',
         msg:[{imgurl:"http://img4.haozaishop.cn/category/170.jpg",goodsname:"吊灯"},
         	{imgurl:"http://img4.haozaishop.cn/category/169.jpg",goodsname:"壁灯"},
         	{imgurl:"http://img4.haozaishop.cn/category/168.jpg",goodsname:"装饰台灯"},
         	{imgurl:"http://img4.haozaishop.cn/category/167.jpg",goodsname:"落地灯"},
         	{imgurl:"http://img4.haozaishop.cn/category/166.jpg",goodsname:"其他灯"},
         	{imgurl:"http://img4.haozaishop.cn/category/all.png?v=2016050411",goodsname:"全部"}
         ]
    }]
};

import MultiList from '../../component_dev/multilist/src/index'
import Menu from './menu'
class Searchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: multiData,
            value: [1]
        }
    }
    updateValue(value) {
        this.setState({
            value,
        })
    }
    render() {
   return (
   		<div className="searchlistbox">
           <MultiList
               dataSource={ this.state.dataSource}

               value={this.state.value}
               onChange={({newValue}) => {
               
                   this.updateValue(newValue);
               }}
               onItemTap={({item})=>{

               		
                   return [item.value];
               }}
               renderItem={({itemType, data, isSpread, index})=>{
          			//console.log(data);

                   switch (itemType){
                       case 'ProductMenu':
                           return <div className={index==this.state.value[0]?'active_list leftmenu':'leftmenu'}>{data.subList}</div>
                   }
               }}
               renderContent={({type,data}) => {
					
                   switch (type){
                       case '精品家居':
                       return <Menu menu={data.msg}/>;
                       			
                       case '家具布艺':
                           return <Menu menu={data.msg}/>;
                       case '配饰日用':
                           return <Menu menu={data.msg}/>;
                        case '厨房餐饮':
                           return <Menu menu={data.msg}/>;
                        case '灯饰照明':
                           return <Menu menu={data.msg}/>;
                   }
               }}
           />
         </div>
   )
  }
  componenDidMount(){
		
  	}
}
export default Searchlist;