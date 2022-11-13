import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from './reducer'

const rootReducer = combineReducers({
    city: reducer,
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)))