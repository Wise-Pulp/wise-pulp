export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

export function userLogin(login, password) {
  return dispatch => {
    return fetch('/signup', {
      method: 'POST',
      body: {
        login,
        password
      }
    }).then((err, success) => {
      if(err) {
        if (err.status == 422) {
          return dispatch(loginError('Please enter an email address'))
        }
      }
    })
  }
}

export function loginError(err) {
  return {
    type: USER_LOGIN_ERROR,
    payload: err
  }
}