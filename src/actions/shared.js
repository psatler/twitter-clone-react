import { getInitialData } from "../utils/api";

//importing action creators
import { receiveTweets } from "./tweets";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";

//importing action creators of loading bar
import { showLoading, hideLoading } from "react-redux-loading";

//hard-coding an autherized user
const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    //before retrieving info, show loading bar
    dispatch(showLoading());

    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID)); //hard-coded above

      //after everything has loaded, hide loading bar
      dispatch(hideLoading());
    });
  };
}
