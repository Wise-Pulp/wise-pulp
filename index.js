import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'bootstrap/dist/css/bootstrap.css'
import './public/main.css'
import makeRoutes from './store/routes'
import Root from './src/containers/Root'
import configureStore from './store/create-store'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root history={history} store={store} />,
  document.getElementById('app')
)