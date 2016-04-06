import { GET_HEAT_MAP } from '../actions/actionHeatMap'

export default function heatMapData(state = {
	map: null,
	center: []
}, action) {
	switch (action.type) {
		case GET_HEAT_MAP:
			return Object.assign({}, state, {
				map: action.data,
				center: action.center
			})
		default:
			return state
	}
}