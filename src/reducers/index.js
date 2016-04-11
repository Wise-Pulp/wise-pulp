import { combineReducers } from 'redux'
import FrontPage from './reducerFrontPage'
import Representatives from './reducerRepresentatives'
import { routerReducer as routing } from 'react-router-redux'
import Spinner from './reducerSpinner'
import ContributorVisualization from './reducerContributor'
import HeatMap from './reducerHeatMap'
import UpcomingBills from './reducerBills'
import Login from './reducerLogin'

const rootReducer = combineReducers({
  FrontPage,
  Representatives,
  Spinner,
  ContributorVisualization,
  HeatMap,
  routing,
  UpcomingBills,
  Login
})

export default rootReducer