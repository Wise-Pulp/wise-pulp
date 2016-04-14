import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSenateBillData, getHouseBillData, addToBills } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class UpcomingBills extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills());
  }

  componentWillMount() {
    this.props.dispatch(getSenateBillData());
    this.props.dispatch(getHouseBillData());
  }

  render() {
    const { senate, house, billsToShow } = this.props;
    return (
      <div className="col-md-10 col-md-offset-1 full-bill-list">
        <div className='col-md-6 col-md-offset-3'>
          <h2>Bills To Be Debated Before Congress</h2>
        </div>
        <div className="col-md-4 col-md-offset-1">
          { senate ? <div> <h3>Senate</h3> <BillList 
            bills={senate} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> </div> : <div><Spinner /></div> }
        </div>
        <div className="col-md-4 col-md-offset-1">
          { house ? <div> <h3>House of Representatives</h3> <BillList 
            bills={house} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> </div>: null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const billsToShow = state.UpcomingBills.billsToShow
  const senate = state.UpcomingBills.senate || null;
  const house = state.UpcomingBills.house || null;

  return {
    senate,
    house,
    billsToShow
  }
}

export default connect(mapStateToProps)(UpcomingBills);