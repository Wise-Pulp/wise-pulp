import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoleBills, getSenateBillData, getHouseBillData } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class UpcomingRepBills extends Component {

  getBills(role) {
    console.log(role)
    this.props.dispatch(getRoleBills(role))
  }

  render() {
    const { params, representatives } = this.props;
    representatives.map(function(rep) {
      if (rep.id === JSON.parse(params.id)) {
        this.getBills(rep.role_type)
      }
    }.bind(this))
    return (
      <div className="col-md-10 col-md-offset-1 full-bill-list">
      </div>
    )
  }
}


function mapStateToProps(state) {
  const representatives = state.Representatives.representatives
  const bills = state.UpcomingBills.congress
  console.log('noooooooooooo', state) 
  return {
    representatives,
    bills
  }
}

export default connect(mapStateToProps)(UpcomingRepBills);