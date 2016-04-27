import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoleBills, getSenateBillData, getHouseBillData, addToBills } from '../../actions/actionBills';
import BillList from './BillList'
import Spinner from '../Spinner'

export default class UpcomingRepBills extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills());
  }

  componentWillMount() {
    const { params, representatives, dispatch, bills } = this.props
    representatives.map(function(rep) {
      if (rep.person.id === JSON.parse(params.id)) {
        dispatch(getRoleBills(rep.role_type))
      }
    }.bind(this))
  }

  render() {
    const { bills, billsToShow, role } = this.props;
    return (
      <div>
        { bills.length && bills[0].sponsor ? <BillList bills={bills} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> : <div><Spinner /></div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const bills = state.UpcomingBills.bills
  const billsToShow = state.UpcomingBills.billsToShow
  const role = state.UpcomingBills.role
  return {
    representatives,
    bills,
    billsToShow,
    role
  }
}

export default connect(mapStateToProps)(UpcomingRepBills);