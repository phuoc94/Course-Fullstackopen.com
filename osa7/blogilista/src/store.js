import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notificationReducer'
import userReducer from './reducer/userReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    message: notificationReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store