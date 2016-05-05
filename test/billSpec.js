import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import { expect }                   from 'chai'
import deepFreeze                   from 'deep-freeze'

import { BILL_VOTE,
         BILL_DATA,
         REP_VOTING_HISTORY,
         userVotes,
         getVotingHistory,
         getSenateBillData,
         getHouseBillData  }        from '../src/actions/actionBills'
import bills                        from '../src/reducers/reducerBills'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const dummyData = [{_id: 1234567}, {_id: 12345}, {_id: 1234}, {_id: 123456}]
const dummyRepData = [{id: 1234567}, {id: 12345}, {id: 1234}, {id: 123456}]
deepFreeze(dummyData)

describe('User Voting', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates BILL_VOTE when posting a bill vote is done', () => {
    nock('https://localhost:3500', {
      reqheaders: {
        'Content-Type': 'application/json',
        'Authorization': 'test'
      }
    })
      .post('/userOpinions', JSON.stringify({
        billNumber: 123456,
        opinion: true
      }))
      .reply(200, {_id: 123456, voted: true})

    const expectedActions = [{ type: BILL_VOTE, payload: {_id: 123456, voted: true}}]

    const store = mockStore({ bills: [] })

    return store.dispatch(userVotes({_id: 123456}, true, 'test', true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })

  })
})

describe('Upcoming Bills', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates BILL_DATA when retrieving house bills is done', () => {
    nock('https://localhost:3500')
      .get('/api/data/house_bills')
      .reply(200, dummyData)
    const expectedActions = [{ type: BILL_DATA, payload: [{_id: 1234567, representative: true}, {_id: 12345, representative: true}, {_id: 1234, representative: true}, {_id: 123456, representative: true}] }]

    const store = mockStore({ bills: [] })

    return store.dispatch(getHouseBillData(true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('creates BILL_DATA when retrieving senate bills is done', () => {
    nock('https://localhost:3500')
      .get('/api/data/senate_bills')
      .reply(200, dummyData)
    const expectedActions = [{ type: BILL_DATA, payload: [{_id: 1234567, senate: true}, {_id: 12345, senate: true}, {_id: 1234, senate: true}, {_id: 123456, senate: true}] }]

    const store = mockStore({ bills: [] })

    return store.dispatch(getSenateBillData(true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})

describe('Representatives Voting History', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('creates REP_VOTING_HISTORY when retrieving a reps voting history is done', () => {
    nock('https://www.govtrack.us')
      .get('/api/v2/vote_voter?order_by=-created&person=123456')
      .reply(200, {objects: dummyRepData})

    const expectedActions = [{ type: REP_VOTING_HISTORY, payload: dummyRepData}]
    const store = mockStore({ repVotes: [] })

    return store.dispatch(getVotingHistory(123456))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})

describe('Bills Reducer', () => {
  it('reducer returns the initial state', () => {
    expect(bills(undefined, {})
      ).to.deep.equal({
        billsToShow: 9,
        yes: null,
        no: null,
        bills: [],
        repVotes: [],
        role: null
      })
  })

  it('should handle BILL_VOTE', () => {
    expect(
      bills({bills: dummyData}, {
        type: BILL_VOTE,
        payload: {
          _id: 123456,
          voted: true
        }
      })).to.deep.equal({bills: [{_id: 1234567}, {_id: 12345}, {_id: 1234}, {_id: 123456, voted: true}] })
  })

  it('should handle BILL_DATA', () => {
    expect(
      bills({bills: []}, {
        type: BILL_DATA,
        payload: dummyData
      })).to.deep.equal({bills: dummyData})
  })

  it('should handle REP_VOTING_HISTORY', () => {
    expect(
      bills({repVotes: []}, {
        type: REP_VOTING_HISTORY,
        payload: dummyRepData
      })).to.deep.equal({repVotes: dummyRepData})
  })
})



