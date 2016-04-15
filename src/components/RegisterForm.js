import React, { Component } from 'react'

export default class RegisterForm extends Component {
   handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.login.value, this.password.value);
      this.login.value = ''
      this.password.value= ''
   }

   render () {
      return (
         <div>
            <h1 className='login-header'>Register</h1>
            <form action="#" onSubmit={(e) => this.handleSubmit(e)}>
               <d1>
                  <dt>
                     <label>Email Address</label>
                  </dt>
                  <dd>
                     <input className='input-field' placeholder='email@example.com' type='email' ref={node => { this.login = node }} />
                     <p className='login-description'>This will be your username. We will not share your email with anyone.</p>
                  </dd>
               </d1>
               <d1>
                  <dt>
                     <label>Password</label>
                  </dt>
                  <dd>
                     <input className='input-field' placeholder='password' type='password' ref={node => { this.password = node }} />
                  </dd>
               </d1>
               <br />
               <input className='login-button' type='submit' value='Create an account' />
            </form>
         </div>
      )
   }
}