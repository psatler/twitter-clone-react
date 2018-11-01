import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";

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
