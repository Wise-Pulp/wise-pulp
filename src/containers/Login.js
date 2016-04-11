import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../actions/actionLogin'
import LoginForm from '../components/LoginForm'

export class Login extends Component {
   onSubmit(login, password) {
      this.props.dispatch(userLogin(login, password))
   }

   render () {
      const { isLoggedIn, loginError } = this.props
      return (
         <div>
            <LoginForm {...this.props}
                       onSubmit={this.onSubmit.bind(this)} />
         </div>
      )
   }
}

function mapStateToProps(state) {
   const isLoggedIn = state.Login.isLoggedIn
   const loginError = state.Login.loginError

   return {
      isLoggedIn,
      loginError
   }
}

export default connect(mapStateToProps)(Login)