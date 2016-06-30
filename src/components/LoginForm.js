import React, { PropTypes, Component } from 'react'
import { validateEmail, validatePassword } from '../validators'

import Form from './Form'

const SCHEMA = [{
  name:'email',
  type:'text',
  validate:validateEmail
},{
  name:'password',
  type:'text',
  inputtype:'password',
  validate:validatePassword
}]

class LoginForm extends Component {
 
  render() {
    
    return (
      <Form 
        title="Login" 
        name={this.props.name || 'login'}
        reducername={this.props.reducername}
        biroreducername={this.props.biroreducername}
        onSubmit={this.props.onSubmit}
        schema={SCHEMA} />
    )
  }

}

export default LoginForm