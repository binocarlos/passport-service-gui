import React, { PropTypes, Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class PassportForm extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <LoginForm 
          reducername={this.props.reducername || 'passport'}
          name={name + '-login'} />
        <hr />
        <RegisterForm 
          reducername={this.props.reducername || 'passport'}
          name={name + '-register'} />
      </div>
    )
  }

}

export default PassportForm