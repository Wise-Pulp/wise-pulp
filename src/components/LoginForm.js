import React, { Component } from 'react'

export default class LoginForm extends Component {
   handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.login.value, this.password.value);
      this.login.value = ''
      this.password.value= ''
   }
   render () {
      return (
         <div>
            <h1 className='login-header'>Login</h1>
            <form className='login-form' action="#" onSubmit={(e) => this.handleSubmit(e)}>
               <d1>
                  <dt>
                     <label>Email Address</label>
                  </dt>
                  <dd>
                     <input className='login-input-field' placeholder='email@example.com' type='email' ref={node => { this.login = node }} />
                     <p className='login-description'></p>
                  </dd>
               </d1>
               <d1>
                  <dt>
                     <label>Password</label>
                  </dt>
                  <dd>
                     <input className='login-input-field' placeholder='password' type='password' ref={node => { this.password = node }} />
                  </dd>
               </d1>
               <br />
               <input className='login-button' type='submit' value='Submit' />
            </form>
         </div>
      )
   }
}