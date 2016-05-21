import { GET_CONTRIBUTOR_DATA } from '../actions/actionContributor'

export default function contributorData(state = {
	contributions: null
}, action) {
	switch (action.type) {
		case GET_CONTRIBUTOR_DATA:
			return Object.assign({}, state, {
				contributions: action.data
			})
		default:
			return state
	}
}