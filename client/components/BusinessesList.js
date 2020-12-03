import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {SingleBusiness} from './SingleBusiness'

class BusinessesList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const markers = this.props.props.markers
    return (
      <div id="businesses-list">
					<ul>
						{markers.map((marker) => {
							return (
								<ul key={marker.id}>
									<Link to={`/singleBusiness/${marker.id}`}>
										<h5>{marker.name}</h5>
									</Link>
									<li>{marker.price}</li>
									<li>{marker.rating}</li>
								</ul>
							)
						})}
					</ul>
				</div>
    )
  }
}

export default BusinessesList