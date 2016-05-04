import { GET_CONTRIBUTOR_DATA, SET_GRAPH_TYPE } from '../actions/actionContributor'

export default function contributorData(state = {
	contributions: null
}, action) {
	switch (action.type) {
		case GET_CONTRIBUTOR_DATA:
		console.log('this is in contributor reducer', action.data)
			return Object.assign({}, state, {
				contributions: action.data
			})
		default:
			return state
	}
}