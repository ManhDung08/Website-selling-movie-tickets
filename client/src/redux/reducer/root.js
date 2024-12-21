import {combineReducers} from "redux";
import { userReducer } from "./user";
import {spinnerReducer} from "./spinner";
export let rootReducer = combineReducers({
    userReducer,spinnerReducer
})