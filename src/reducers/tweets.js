import { RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
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
