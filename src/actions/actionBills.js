export const SENATE_BILL_DATA = 'SENATE_BILL_DATA'
export const HOUSE_BILL_DATA = 'HOUSE_BILL_DATA'

export function getSenateBillData() {
let senate = '/api/data/senate_bills';

  return dispatch => {
    return fetch(senate)
      .then(response => response.json())
      .then(json => dispatch(receiveSenateBillData(json))) 
  }
}


export function receiveSenateBillData(bill) {

  return {
    type: SENATE_BILL_DATA,
    bill
  } 
}

export function getHouseBillData() {
let house = '/api/data/house_bills';

  return dispatch => {
    return fetch(house)
      .then(response => response.json())
      .then(json => dispatch(receiveHouseBillData(json))) 
  }
}


export function receiveHouseBillData(bill) {

  return {
    type: HOUSE_BILL_DATA,
    bill
  } 
}

export function SingleHouseData() {

  return {
    type: SHOW_SINGLE_HOUSE_DATA
  }
}