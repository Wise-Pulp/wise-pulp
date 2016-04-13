import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSenateBillData, getHouseBillData } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class UpcomingBills extends Component {

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
          { senate.length ? <div> <h3>Senate</h3> <BillList 
            bills={senate} billsToShow={billsToShow} /> </div> : <div><Spinner /></div> }
        </div>
        <div className="col-md-4 col-md-offset-1">
          { house.length ? <div> <h3>House of Representatives</h3> <BillList bills={house} billsToShow={billsToShow} /> </div>: null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  const senate = state.UpcomingBills.senate || [];
  const house = state.UpcomingBills.house || [];
  var billsToShow = billsToShow || 9;
  return {
    senate,
    house,
    billsToShow
  }
}

export default connect(mapStateToProps)(UpcomingBills);