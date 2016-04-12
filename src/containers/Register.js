import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userRegister } from '../actions/actionLogin'
import RegisterForm from '../components/RegisterForm'

export class Register extends Component {
   onSubmit(login, password) {
      this.props.dispatch(userRegister(login, password))
   }

   render () {
      const { registrationError } = this.props
      return <div className='login-container'>
            <RegisterForm {...this.props}
                    onSubmit={this.onSubmit.bind(this)} />
            { registrationError ? <div className='registration-error'>Sorry, that email is already taken.</div> : null}
      </div>
   }
}

function mapStateToProps(state) {
   const registrationError = state.user.registrationError
   return {
      registrationError
   }
}

export default connect(mapStateToProps)(Register)