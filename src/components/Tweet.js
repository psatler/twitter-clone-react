import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";

class Tweet extends Component {
  render() {
    console.log(this.props);
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This tweet doesn't exist</p>;
    }

    return <div className="tweet">Tweet</div>;
  }
}

//id comes from the props passed by a parent component
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id]; //getting the specific tweet by its id
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null; //check if the specific tweet is a reply to another one. If so, get information about that parent tweet

  return {
    authedUser,
    tweet: tweet //making sure a tweet exists
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
}

export default connect(mapStateToProps)(Tweet);
