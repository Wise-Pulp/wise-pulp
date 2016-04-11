import { GET_CONTRIBUTOR_DATA, SET_GRAPH_TYPE } from '../actions/actionContributor'

export default function contributorData(state = {
	grouped: false,
	m: null,
	n: null,
	layers: null
}, action) {
	switch (action.type) {
		case GET_CONTRIBUTOR_DATA:
		console.log(action)
			return Object.assign({}, state, action.data)
		case SET_GRAPH_TYPE:
			return Object.assign({}, state, {
				grouped: !state.grouped
			})
		default:
			return state
	}
}