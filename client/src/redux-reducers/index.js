import { combineReducers } from "redux";
import userReducers from "./user";
import navbarReducers from "./navbar";
import auditReducers from "./audit";

const rootReducer = combineReducers({
  user: userReducers,
  navbar: navbarReducers,
  audit: auditReducers
});

export default rootReducer;
