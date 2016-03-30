import { combineReducers } from 'redux'
import FrontPage from './reducerFrontPage'
import Profile from './reducerProfile'
import { routerReducer as routing } from 'react-router-redux'
import Spinner from './reducerSpinner'


const rootReducer = combineReducers({
  FrontPage,
  Profile,
  Spinner,
  routing
})

export default rootReducer