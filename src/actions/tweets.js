import { saveLikeToggle, saveTweet } from "../utils/api";

//importing loading bar to show when we submit a tweet
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

//args: tweet text and the tweet that the newTweet is replying to, if any
export function handleAddTweet(text, replyingTo) {
  //using getState to get the current state of our store
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading()); //show loading bar
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()));
  };
}

//action creator
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

//functions for toggling tweet likes
function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  };
}
//assynchronous action creator (which is exported)
export function handleToggleTweet(info) {
  return dispatch => {
    //using optimistic updates here, so first we toggle the tweet and then update the backend (server)
    dispatch(toggleTweet(info));

    //now update inside server and watch for possible errors
    return saveLikeToggle(info).catch(e => {
      console.warn("Error in handleToggleTweet ", e);
      dispatch(toggleTweet(info)); //resetting back to what it was initially
      alert("There was an error liking the tweet. Try again!");
    });
  };
}
