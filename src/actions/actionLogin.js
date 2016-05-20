import { browserHistory } from 'react-router'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
export const USER_LOGOUT = 'USER_LOGOUT'
export const PROCESSING_LOGIN = 'PROCESSING_LOGIN'
export const PROCESSING_REGISTRATION = 'PROCESSING_REGISTRATION'
export const USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR'
export const LOGIN_PASS = 'LOGIN_PASS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export function loginSuccess() {
  return {
    type: USER_LOGIN_SUCCESS
  }
}

export function loginError() {
  return {
    type: USER_LOGIN_ERROR,
  }
}

export function registrationError() {
  return {
    type: USER_REGISTRATION_ERROR
  }
}

export function processingLogin() {
  return {
    type: PROCESSING_LOGIN
  }
}

export function userRegister(email, password) {
  return dispatch => {
    dispatch(processRegistration())
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => response.json())
      .then((user) => {
        if (user) {
          handleUser(user.token)
          return dispatch(loginSuccess(user.token))
        } else {
          return dispatch(registrationError())
        }
      })
  }
}

export function processRegistration() {
  return {
    type: PROCESSING_REGISTRATION
  }
}

export function processLogout() {
  browserHistory.push('login')
  localStorage.setItem('token', undefined)
  localStorage.setItem('bills', undefined)
  return {
    type: USER_LOGOUT
  }
}

export function userLogin(email, password) {
  return dispatch => {
    dispatch(processRegistration())
    return fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(function(user) {
      if (user.status === 200) {
        return user.json()
      } else {
        return false
      }
    }).then(function(user) {
      if (user) {
        handleUser(user)
        return dispatch(loginSuccess())
      } else {
        return dispatch(loginError())
      }
    })
  }
}

function handleUser(user) {
  localStorage.setItem('token', user.token)
  localStorage.setItem('bills', JSON.stringify(user.bills))
  browserHistory.push('representatives')
}





