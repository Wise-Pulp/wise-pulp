import { USER_LOGIN, USER_LOGIN_ERROR } from '../actions/actionLogin'
 
export default function userLogin(state = {
  isLoggedIn: false,
  loginError: null
}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true
      })
    case USER_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload
      })
    default:
      return state
  }
}