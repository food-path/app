import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBusiness} from '../store/singleBusiness'


class SingleBusiness extends Component {
constructor(props){
    super()
}
componentDidMount() {
    this.props.getSingleBusiness('C26UmGrapfbbE14ucEoXtg')
  }

  render(){
      console.log('this.props.singleBusiness: ', this.props.singleBusiness)
      const {singleBusiness} = this.props
      return(
          <div>
      <h1>{singleBusiness.name}</h1>
      <h4>Category:{singleBusiness.categories}</h4>
      <h4>Street Address: {singleBusiness.streetAddress}</h4>
      <h4>Rating: {singleBusiness.rating}</h4>
      <h4>Price: {singleBusiness.price}</h4>
      <img src={singleBusiness.imageUrl}/>
      </div>
      )
  }
}

const mapState = (state) => {
    return {
      singleBusiness: state.singleBusiness
    }
  }
  const mapDispatch = dispatch => {
    return {
      getSingleBusiness: (id) => dispatch(fetchSingleBusiness(id))
    }
  }
  export default connect(mapState, mapDispatch)(SingleBusiness)