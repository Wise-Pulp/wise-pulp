import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import './public/main.css'
import 'jquery'
import 'bootstrap-webpack!./node_modules/bootstrap-webpack/bootstrap.config.js'
import makeRoutes from './store/routes'
import Root from './src/containers/Root'
import configureStore from './store/create-store'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} store={store} />,
  document.getElementById('app')
)