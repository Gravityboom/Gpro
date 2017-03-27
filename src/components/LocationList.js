import  React from 'react';

class LocationList extends React.Component{
  constructor(props){
    super(props)
    this.state={
        location_province:[1,2,3],
        location_city:['a','b','c']
    }
  }
  render () {
    return (
      <div style={{display:"none"}}className = "localtion_container">
        <ul className = "location_in">
          <li className = 'location_top'>北京<span className='okay'>√</span></li>
          <li className = 'location_main'>
            <section className = 'location_one'></section>
            <section className = 'location_two'></section>
          </li>
        </ul>
      </div>
    )
  }
}

export default LocationList
