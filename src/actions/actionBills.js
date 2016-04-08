export const SENATE_BILL_DATA = 'SENATE_BILL_DATA'
export const HOUSE_BILL_DATA = 'HOUSE_BILL_DATA'
export const GET_ROLE_BILLS = 'GET_ROLE_BILLS'

export function getRoleBills(role) {
  if( role === 'senator') {
    return dispatch =>{
      return (getSenateBillData('senator'));
      } 
  }else {
    return dispatch => {
      return (getHouseBillData(true));
    }
  }
}

export function getSenateBillData(something) {
let senate = '/api/data/senate_bills';
console.log('i want pizza', something);
  return dispatch => {
    return fetch(senate)
      .then(response => response.json())
      .then(json => dispatch(receiveSenateBillData(json, something))) 
  }
}


export function receiveSenateBillData(bill, anything) {
  console.log('bill outside contidional', bill);
  if (anything) {
    console.log('bill inside condigion', bill);
    return {
      type: GET_ROLE_BILLS,
      bill
    }
  } else { 
    return {
      type: SENATE_BILL_DATA,
      bill
    } 
  }
}

export function getHouseBillData(something) {
let house = '/api/data/house_bills';

  return dispatch => {
    return fetch(house)
      .then(response => response.json())
      .then(json => dispatch(receiveHouseBillData(json, something))) 
  }
}


export function receiveHouseBillData(bill, anything) {
  if (anything) {
    return {
      type: GET_ROLE_BILLS,
      bill
    }
  } else { 
    return {
      type: HOUSE_BILL_DATA,
      bill
    } 
  }
}