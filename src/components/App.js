import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

import LoadingBar from "react-redux-loading"; //importing the loading bar given by react-redux-loading

import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <Dashboard />}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
