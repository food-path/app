import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBusiness,fetchSingleBusinessDetails} from '../store/singleBusiness'


class SingleBusiness extends Component {
constructor(props){
    super()
}
componentDidMount() {
    this.props.getSingleBusiness(this.props.match.params.businessId)
  }

  convertTime(time){
    let numValue = Number(time)/100
    let AmOrPm = numValue >= 12 ? 'pm' : 'am';
    let finalTime = AmOrPm === 'pm'? String(numValue-12)+AmOrPm : String(numValue)+AmOrPm
    return finalTime
  }

  render(){
      const {singleBusiness} = this.props
      console.log('singleBusiness:', singleBusiness)
     
      return(
          <div>
      <h1>{singleBusiness.name}</h1>
      {singleBusiness.categories?(
        <div>
      <h4>Category:{singleBusiness.categories.map(obj => obj.title).join('|')}</h4>

      {/* <img src={singleBusiness.photos.map(imageUrl => imageUrl)}/> */}

      <h4>Hours: {singleBusiness.hours[0].open.map(hrsObj => this.convertTime(hrsObj.start))}</h4>

        <h1>{this.convertTime('0700')}</h1>

      <h4>Street Address: {singleBusiness.location.address1}</h4>
      <h4>Phone: {singleBusiness.display_phone}</h4>
      <h4>Rating: {singleBusiness.rating}</h4>
      <h4>Price: {singleBusiness.price}</h4>

      <img className="resize" src={singleBusiness.image_url}/>

      </div>
      ):(
        <h1>Error</h1>
      )}
      
      </div>
      )
  }
}

const mapState = (state) => {
    return {
      singleBusiness: state.singleBusiness //state.singleBusiness value comes from store
    }
  }
  const mapDispatch = dispatch => {
    return {
      // getSingleBusiness: (id) => dispatch(fetchSingleBusiness(id))
      getSingleBusiness: (id) => dispatch(fetchSingleBusinessDetails(id))
    }
  }
  export default connect(mapState, mapDispatch)(SingleBusiness)