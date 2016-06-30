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

class RegisterForm extends Component {
  
  render() {
    
    return (
      <Form 
        name={this.props.name || 'register'}
        reducername={this.props.reducername || 'passport'}
        schema={SCHEMA} />
    )
  }

}

export default RegisterForm