import React, { Component, PropTypes } from 'react'
import { REGISTER_SCHEMA } from '../schema'
import Form from './Form'

export default class RegisterForm extends Component {

  render() {
    const props = {
      title:'Register',
      schema:REGISTER_SCHEMA,
      name:'register',
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}