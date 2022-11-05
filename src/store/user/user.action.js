import { createAction } from "../../utils/reducer/reducerUtils";
import { USER_ACTION_TYPES } from "./user.types";

//This function is to set the current user by calling dispatch to send our reducer the action
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
