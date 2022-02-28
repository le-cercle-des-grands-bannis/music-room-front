import { configureStore } from '@reduxjs/toolkit'
import { compose } from "redux"
import notificationReducer from "@Redux/notification";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = "development" === process.env.NODE_ENV && process.browser ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default configureStore({
    reducer: {
        notification: notificationReducer
    },
    enhancers: composeEnhancers
})