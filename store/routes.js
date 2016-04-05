import React from 'react';
import { Route, IndexRoute } from 'react-router';
import  App from '../src/components/App';
import FrontPage from '../src/containers/FrontPage'
import Representatives from '../src/containers/Representatives'
import RepresentativeInfo from '../src/containers/RepresentativeInfo'

export default (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
    	<Route path='representatives' component={Representatives} />
  		<Route path='representatives/:id' component={RepresentativeInfo} />
    </Route>
);