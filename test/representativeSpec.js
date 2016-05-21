import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import { expect }                   from 'chai'
import { RECEIVE_REPRESENTATIVES,
          IS_FETCHING,
          getRepresentatives }      from '../src/actions/actionRepresentatives'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Get Representatives', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECEIVE_REPRESENTATIVES when fetching reps is done', () => {
    nock('https://localhost:3500')
      .get('/api/representatives/94709')
      .reply(200, { objects: { id: 123456 } } )

    const expectedActions = [{ type: IS_FETCHING}, { 
                                type: RECEIVE_REPRESENTATIVES,
                                payload: {
                                  id: 123456
                                }
                             }] 
    const store = mockStore({ representatives: [] })

    return store.dispatch(getRepresentatives(94709, true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})