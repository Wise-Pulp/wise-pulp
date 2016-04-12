import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSenateBillData, getHouseBillData } from '../actions/actionBills';
import BillList from '../components/BillList'
import Spinner from '../components/Spinner'

export default class RepUpcomingBills extends Component {

  componentWillMount() {
    this.props.dispatch(getSenateBillData());
    this.props.dispatch(getHouseBillData());
  }

  render() {
    const { senate, house } = this.props;
    // if on Senator, title, gets senate. else title gets House.
    const title;
    return (
      <div className="col-md-10 col-md-offset-1 full-bill-list">
        <div className='col-md-6 col-md-offset-3'>
          <h2>Bills To Be Debated Before Congress</h2>
        </div>
        <div className="col-md-4 col-md-offset-1">
          { title.length ? <div> <h3>Senate</h3> <BillList 
            bills={title} /> </div> : <div><Spinner /></div> }
        </div>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  
  const senate = state.UpcomingBills.senate || [];
  const house = state.UpcomingBills.house || [];
  return {
    senate,
    house
  }
}

export default connect(mapStateToProps)(RepUpcomingBills);