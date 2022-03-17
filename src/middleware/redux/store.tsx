import { configureStore } from '@reduxjs/toolkit'
import { compose } from "redux"
import notificationReducer from "@Root/middleware/redux/notification";
import loginReducer from "@Root/middleware/redux/login"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = "development" === process.env.NODE_ENV && process.browser ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default configureStore({
    reducer: {
        notification: notificationReducer,
        login: loginReducer,
    },
    enhancers: composeEnhancers
})