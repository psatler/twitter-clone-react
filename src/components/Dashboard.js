import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashbord-list">
          {this.props.tweetsIds.map(id => (
            <li key={id}>
              <div>TWEET ID: {id} </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

//destructuring tweets from state
function mapStateToProps({ tweets }) {
  return {
    tweetsIds: Object.keys(tweets).sort(
      //sorting from the newest to the oldest tweet
      //If compareFunction(a, b) is greater than 0, sort b to an index lower than a, i.e. b comes first.
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
