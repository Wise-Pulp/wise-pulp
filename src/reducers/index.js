import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import FrontPage from './reducerFrontPage'
import Profile from './reducerProfile'

export default combineReducers({
  FrontPage,
  Profile,
  router
})

