import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets";

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };

    case ADD_TWEET:
      const { tweet } = action; //getting the newly added tweet from action

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            //id of the tweet we are replying to
            ...state[tweet.replyingTo], //everything that was before
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        };
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo
      };

    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(uid => uid !== action.authedUser) //if has liked, remove it (dislike it)
              : state[action.id].likes.concat([action.authedUser])
        }
      };

    default:
      return state;
  }
}
