import { BILL_DATA, GET_ROLE_BILLS, SENATE_BILL_DATA, HOUSE_BILL_DATA, ADD_TO_BILLS, YES_VOTE, NO_VOTE, BILL_VOTE, REP_VOTING_HISTORY, LOGIN_PASS, LOGIN_FAIL } from '../actions/actionBills'

export default function upcomingBills(state = { 
  billsToShow: 9,
  yes: null,
  no: null,
  bills: []
}, action) {
  switch (action.type) {
    case BILL_DATA:
      return Object.assign({}, state, {
        bills: state.bills.concat(action.payload)
      })
    case GET_ROLE_BILLS:
      return Object.assign({}, state, {
        congress: action.bill
      })
    case REP_VOTING_HISTORY:
      return Object.assign({}, state, {
        votes: action.payload
      })
    case ADD_TO_BILLS:
      return Object.assign({}, state, {
        billsToShow: state.billsToShow += 10
      })
    case YES_VOTE:
      return Object.assign({}, state, {
        yes: action.payload,
        no: null
      })
    case NO_VOTE:
      return Object.assign({}, state, {
        no: action.payload,
        yes: null
      })
    // case LOGIN_PASS:
    //   for (let i = 0; i < state.votes.length; i++) {
    //       if (state.votes[i].id === action.payload.id) {
    //         let before = state.votes.slice(0, i)
    //         let after = state.votes.slice(i+1, state.votes.length)
    //         before.push(action.payload)
    //         let newVotes = before.concat(after)
    //         return Object.assign({}, state, {
    //           loginCheck: true
    //         })
    //       }
    //     }
    // case LOGIN_FAIL:
    //   for (let i = 0; i < state.votes.length; i++) {
    //     if (state.votes[i].id === action.payload.id) {
    //       let before = state.votes.slice(0, i)
    //       let after = state.votes.slice(i+1, state.votes.length)
    //       before.push(action.payload)
    //       let newVotes = before.concat(after)
    //       return Object.assign({}, state, {
    //         votes: newVotes
    //       })
    //     }
    //   }
    case BILL_VOTE:
      if (state.house) {
        return changeBillProps(state, action.payload, 'house')
      }

      if (state.senate) {
        return changeBillProps(state, action.payload, 'senate')
      } else {
        for (let i = 0; i < state.votes.length; i++) {
          if (state.votes[i].id === action.payload.id) {
            let before = state.votes.slice(0, i)
            let after = state.votes.slice(i+1, state.votes.length)
            before.push(action.payload)
            let newVotes = before.concat(after)
            return Object.assign({}, state, {
              votes: newVotes
            })
          }
        }
      }

    default:
      return state
  }
}

//TODO: Refactor 
export function changeBillProps(state, bill, type) {
    console.log('thisi s bill', bill)
    console.log('this is other bill', state[type][0])
  for (let i = 0; i < state[type].length; i++) {
    //console.log(bill._id === state[type][i]._id)
    if (state[type][i]._id === bill._id) {
      let before = state[type].slice(0, i)
      let after = state[type].slice(i+1, state[type].length)
      before.push(bill)
      let newcongressType = before.concat(after)
      // console.log(Object.assign({}, state, {
      //   [type]: newcongressType
      // }))
      return Object.assign({}, state, {
        [type]: newcongressType
      })
    }
  }
}