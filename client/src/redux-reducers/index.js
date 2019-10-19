import { combineReducers } from "redux";
import userReducers from "./user";
import navbarReducers from "./navbar";

const rootReducer = combineReducers({
  user: userReducers,
  navbar: navbarReducers
});

export default rootReducer;
