import React, { Component } from 'react';
import { getSenateBillData } from '../actions/actionBills'

export default class SenateUpcomingLegislation extends Component {

  componentWillMount() {
    this.props.dispatch(getSenateBillData());

  }

  render() {

    return (
      <div>
        
      </div>

    )
  }
  
}

function mapStateToProps(state) {
  const bills = state.SenateUpcomingLegislation.bill;
  console.log('bills', bills);
  return {
    bills
  }
}

export default connect(mapStateToProps)(SenateUpcomingLegislation);