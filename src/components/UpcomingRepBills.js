import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoleBills, getSenateBillData, getHouseBillData, addToBills } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class UpcomingRepBills extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills());
  }

  componentWillMount() {
    const { dispatch, bills } = this.props
    if (!bills.length) {
      dispatch(getSenateBillData());
      dispatch(getHouseBillData());
    }
  }

  componentDidMount() {
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
        { bills.length ? <BillList bills={bills} billType={role} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> : <div><Spinner /></div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const bills = state.UpcomingBills.bills
  const billsToShow = state.UpcomingBills.billsToShow
  const role = state.UpcomingBills.role
  console.log(state)
  return {
    representatives,
    bills,
    billsToShow,
    role
  }
}

export default connect(mapStateToProps)(UpcomingRepBills);