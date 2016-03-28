import { combineReducers } from 'redux'
import FrontPage from './reducerFrontPage'
import Profile from './reducerProfile'
import { routerReducer as routing } from 'react-router-redux'


const rootReducer = combineReducers({
  FrontPage,
  Profile,
  routing
})

export default rootReducer