import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoleBills, getSenateBillData, getHouseBillData, addToBills } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class UpcomingRepBills extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills());
  }

  componentDidMount() {
    const { params, representatives, dispatch } = this.props
    representatives.map(function(rep) {
      if (rep.id === JSON.parse(params.id)) {
        dispatch(getRoleBills(rep.role_type))
      }
    }.bind(this))
  }

  render() {
    const { bills, billsToShow } = this.props;
    return (
      <div>
        { bills ? <BillList bills={bills} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> : <div><Spinner /></div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const bills = state.UpcomingBills.congress
  var billsToShow = state.UpcomingBills.billsToShow
  return {
    representatives,
    bills,
    billsToShow
  }
}

export default connect(mapStateToProps)(UpcomingRepBills);