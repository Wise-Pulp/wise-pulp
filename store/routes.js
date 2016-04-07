import React from 'react';
import { Route, IndexRoute } from 'react-router';
import  App from '../src/components/App';
import FrontPage from '../src/containers/FrontPage'
import Representatives from '../src/containers/Representatives'
import RepresentativeInfo from '../src/containers/RepresentativeInfo'
import UpcomingBills from '../src/containers/UpcomingBills'

export default (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
    	<Route path='representatives' component={Representatives} />
  		<Route path='representatives/:id' component={RepresentativeInfo} />
      <Route path='upcoming_bills' component={UpcomingBills} />
    </Route>
);