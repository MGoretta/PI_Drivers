import thunk from "redux-thunk";
import rootReducer from "../Reducer/reducer";
import { applyMiddleware, createStore } from "redux";

export const store = createStore (
    rootReducer,
    applyMiddleware(thunk)
);