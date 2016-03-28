import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
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