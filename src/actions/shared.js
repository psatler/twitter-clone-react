import { getInitialData } from "../utils/api";

//importing action creators
import { receiveTweets } from "./tweets";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";

//hard-coding an autherized user
const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID)); //hard-coded above
    });
  };
}
