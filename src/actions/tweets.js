export const RECEIVE_TWEETS = "RECEIVE_TWEETS";

//action creator
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}
