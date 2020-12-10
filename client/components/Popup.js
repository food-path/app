import React from "react";


class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <h1>{this.props.text}</h1>
          {/* <button onClick={this.props.closePopup}>Okay</button> */}
          <a href={this.props.url} target={'_blank'} rel={'noreferrer'} onClick={this.props.closePopup}> Okay </a>
        </div>
      </div>
    );
  }
}

export default Popup;
