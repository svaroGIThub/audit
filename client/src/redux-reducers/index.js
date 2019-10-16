import { combineReducers } from "redux";
import clientReducers from "./client";

const rootReducer = combineReducers({
  client: clientReducers
});

export default rootReducer;
