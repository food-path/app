import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBusiness} from '../store/singleBusiness'


class SingleBusiness extends Component {
// constructor(props){
//     super()
// }
componentDidMount() {
    this.props.getSingleBusiness(this.props.match.params.businessId)
  }

  render(){
      const {singleBusiness} = this.props
 
    
      return(
          <div>
      <h1>{singleBusiness.name}</h1>
      {singleBusiness.categories?(
      <h4>Category:{singleBusiness.categories.join('|')}</h4>
      ):(
        <h1>Error</h1>
      )}
      <h4>Street Address: {singleBusiness.streetAddress}</h4>
      <h4>Rating: {singleBusiness.rating}</h4>
      <h4>Price: {singleBusiness.price}</h4>
      <img className="resize" src={singleBusiness.imageUrl}/>
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