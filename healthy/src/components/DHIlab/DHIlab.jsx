import React, { Component } from "react";
import "./DHIlab.css";

class DHIlabLogo extends Component {
  render() {
    return (
      <React.Fragment>
        <img
          src="https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-286812750.jpg"
          alt="DHI Lab Logo"
          className="log"
        />
       <h1 style={{color: '#FF6B9E',fontSize: '2.5rem',}}>Symo-sync</h1>
        {/* <h5>Because your imagination is scarier than WebMD.</h5> */}
        <h3 style={{color: '#37b1ea'}}>Probability over panic.</h3>
      </React.Fragment>
    );
  }
}

export default DHIlabLogo;
