import { combineReducers } from "redux";
import { questionReducer } from "./questions";


const rootReducer = combineReducers({
    questions: questionReducer
})

export {rootReducer};