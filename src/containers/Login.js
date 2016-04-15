import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../actions/actionLogin'
import LoginForm from '../components/LoginForm'

export class Login extends Component {
   onSubmit(login, password) {
      this.props.dispatch(userLogin(login, password))
   }

   render () {
      const { processingLogin, isLoggedIn, loginError } = this.props
      return <div>
         <div className='login-background'></div>
         <div className='tutorial-container'>
            <div className='login-container'>
               <LoginForm onSubmit={this.onSubmit.bind(this)} />
               { processingLogin ? <div className='login-process'>Processing your login...</div> : null }
               { loginError ? <div className='login-process'>Sorry, please try again.</div> : null}
            </div>
         </div>   
      </div>
   }
}

function mapStateToProps(state) {
   const isLoggedIn = state.user.isLoggedIn
   const loginError = state.user.loginError
   const processingLogin = state.user.processingLogin
   return {
      isLoggedIn,
      loginError,
      processingLogin
   }
}

export default connect(mapStateToProps)(Login)