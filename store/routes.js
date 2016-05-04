import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../src/components/App/App'
import FrontPage from '../src/containers/FrontPage/FrontPage'
import Representatives from '../src/containers/Representatives/Representatives'
import RepresentativeInfo from '../src/containers/Representatives/RepresentativeInfo'
import UpcomingBills from '../src/containers/Representatives/UpcomingBills'
import UpcomingRepBills from '../src/components/Bills/UpcomingRepBills'
import CampaignContributions from '../src/components/RepresentativeView/ContributorVisualization'
import Login from '../src/containers/Login/Login'
import VotingHistory from '../src/containers/Representatives/VotingHistory'
import RepWords from '../src/containers/Representatives/RepWords'

export default (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
      <Route path='home' component={FrontPage} />
    	<Route path='representatives' component={Representatives} />
      <Route path='representatives/:id' component={RepresentativeInfo} >
        <IndexRoute component={VotingHistory} />
        <Route path='upcoming_rep_bills' component={UpcomingRepBills} />
        <Route path='campaign_contributions' component={CampaignContributions} />
        <Route path='voting_history' component={VotingHistory} />
        <Route path='words' component={RepWords} />
      </Route>
      <Route path='upcoming_bills' component={UpcomingBills} />
      <Route path='login' component={Login} />
    </Route>
)