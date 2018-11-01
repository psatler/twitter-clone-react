import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";

//importing icons from react-icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";

import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    //todo: redirect to parent tweet
  };

  handleLike = e => {
    e.preventDefault();

    const { dispatch, tweet, authedUser } = this.props;

    //dispatching the action creator
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser
      })
    );

    //
  };

  render() {
    console.log(this.props);
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This tweet doesn't exist</p>;
    }

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent
    } = tweet;

    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />

        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)} </div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>

          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            {/* show number only if it's not zero */}
            <span>{replies !== 0 && replies} </span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes} </span>
          </div>
        </div>
      </div>
    );
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
