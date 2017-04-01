import  React from 'react';
import Scroller from '../component_dev/scroller/src/index.js';

class LocationList extends React.Component{
    constructor(props){
        super(props);
        this.selectProvince = this.selectProvince.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.state={
            regionUrl:'/api/v2/h5/address/getRegionList?&region_id=',
            location_name:'北京',
            location_provinceArr:[],
            location_cityArr:[],
            location_state:'location_leave',
            currentSelectLocation:0
        }
    }

    loadLocation(){

        let self = this;
        let tmpArr = [];

        window.fetch(self.state.regionUrl+1)
            .then(function(response){
                return response.json();
            })
            .then(function (result){
                let Data = result['data']['region_list'];
                Data.map((item,index) => {
                    tmpArr.push(
                        <button data-index = {index} className = {'location_name_' + (self.state.currentSelectLocation == index ? 'active' : 'none')}
                                onClick={self.selectProvince.bind(self,index)}>{item['region_name']}
                        </button>
                    );
                });
                self.setState({
                    location_provinceArr:tmpArr
                })
            })
    }


    componentDidMount(){

        this.loadLocation();

    }

    changeCity(event){
        this.setState({
            location_name:event.target.innerHTML
        });
        this.props.callbackHome(event.target.innerHTML);
        this.props.closeLocation();
    }

    selectProvince (index) {
        let self = this;
        let tmpCityArr = [];
        let regionNum = Number(event.target.getAttribute('data-index'))+2;

        this.setState({
            currentSelectLocation:index
        });

        this.loadLocation();

        window.fetch(self.state.regionUrl+regionNum)
            .then(response => {
                return response.json();
            })
            .then(result=>{
                let Data = result['data']['region_list'];

                Data.map((item,index) =>{
                    tmpCityArr.push(
                        <button data-index={item['region_id']} onClick={self.changeCity}>{item['region_name']}</button>
                    )
                });
                self.setState({
                    location_cityArr:tmpCityArr
                })
            })
    }

    render(){
        {/*console.log(this.state.isshowL)*/}

        let isShowL = this.props.locationIsShow;
        return (
            <div className = {"location_container "+isShowL}>
              <ul className = "location_in">
                <li className = 'location_top'> {this.state.location_name} <span className='okay'></span></li>
                <li className = 'location_main'>
                  <section className = 'location_one'>
                    <Scroller style={{height:'100%'}}>
                        {this.state.location_provinceArr}
                    </Scroller>
                  </section>

                  <section className = 'location_two'>
                    <Scroller style={{height:'100%'}}>
                        {this.state.location_cityArr}
                    </Scroller>
                  </section>
                </li>
              </ul>
            </div>
        )
    }
}


export default LocationList
