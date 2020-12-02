import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BusinessesList extends Component {
  constructor(props) {
    super(props)
  }
  // console.log('what are my props? ', this.props)
  render() {
    console.log('what are my props? ', this.props)
    const markers = this.props.props.markers
    console.log('where are my markers? ', markers)
    return (
      <div id="businesses-list">
					<ul>
						{markers.map((marker) => {
							return (
								<ul key={marker.id}>
									<Link to={marker.url}>
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
