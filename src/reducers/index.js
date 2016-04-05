import { combineReducers } from 'redux'
import FrontPage from './reducerFrontPage'
import Profile from './reducerProfile'
import { routerReducer as routing } from 'react-router-redux'
import Spinner from './reducerSpinner'
import ContributorVisualization from './reducerContributor'
import HeatMap from './reducerHeatMap'


const rootReducer = combineReducers({
  FrontPage,
  Profile,
  Spinner,
  ContributorVisualization,
  HeatMap,
  routing
})

export default rootReducer