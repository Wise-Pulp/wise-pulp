import React from 'react';
import { Route } from 'react-router';
import  App from '../src/components/App';
import FrontPage from '../src/containers/FrontPage'
import Profile from '../src/containers/Profile'

export default (store) => (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
    	<Route path='profile' component={Profile} >
  		</Route>
    </Route>
);