export const GET_HEAT_MAP = 'STOP_PROGRESS'

export function getHeatMapData (data, center) {
  return {
    type: GET_HEAT_MAP,
    data,
    center
  }
}