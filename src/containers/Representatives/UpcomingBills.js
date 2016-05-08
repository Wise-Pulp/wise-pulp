import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSenateBillData, getHouseBillData, addToBills } from '../../actions/actionBills'
import BillList from '../../components/Bills/BillList'
import Spinner from '../../components/Spinner/Spinner'

export class UpcomingBills extends Component {

  showMoreBills() {
    this.props.dispatch(addToBills())
  }

  componentWillMount() {
    const { bills } = this.props
    if (!bills.length) {
    this.props.dispatch(getSenateBillData())
    this.props.dispatch(getHouseBillData())
    }
  }

  render() {
    const { bills, billsToShow } = this.props
    return (
      <div className="col-md-10 col-md-offset-1 full-bill-list">
        <div className='col-md-6 col-md-offset-3'>
          <h2>Bills To Be Debated Before Congress</h2>
        </div>
        <div className="col-md-4 col-md-offset-1">
          { bills.length ? <div> <h3>Senate</h3> <BillList 
            bills={bills} role={'senate'} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> </div> : <div><Spinner /></div> }
        </div>
        <div className="col-md-4 col-md-offset-1">
          { bills.length ? <div> <h3>House of Representatives</h3> <BillList 
            bills={bills} role={'representative'} billsToShow={billsToShow} showMoreBills={this.showMoreBills.bind(this)}/> </div>: null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const billsToShow = state.UpcomingBills.billsToShow
  const bills = state.UpcomingBills.bills
  return {
    bills,
    billsToShow
  }
}

export default connect(mapStateToProps)(UpcomingBills)