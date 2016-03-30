import React from 'react';
import { Route, IndexRoute } from 'react-router';
import  App from '../src/components/App';
import FrontPage from '../src/containers/FrontPage'
import Profile from '../src/containers/Profile'
import RepresentativeInfo from '../src/components/RepresentativeInfo'

export default (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
    	<Route path='profile' component={Profile} >
    		<Route path=':id' component={RepresentativeInfo} />
  		</Route>
    </Route>
);