import { PROCESSING_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_REGISTRATION_ERROR } from '../actions/actionLogin'
 
export default function user(state = {
  isLoggedIn: false,
  loginError: false,
  processingLogin: false,
  registrationError: false
}, action) {
  switch (action.type) {
    case PROCESSING_LOGIN:
      return Object.assign({}, state, {
        processingLogin: true
      })
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        processingLogin: false,
        loginError: false,
        registrationError: false
      })
    case USER_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: true,
        processingLogin: false
      })
    case USER_REGISTRATION_ERROR:
      return Object.assign({}, state, {
        registrationError: true
      })
    case USER_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      })
    default:
      return state
  }
}