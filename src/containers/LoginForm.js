import React, { Component, PropTypes } from 'react'
import { LOGIN_SCHEMA } from '../schema'
import Form from './Form'

export default class LoginForm extends Component {

  render() {
    const props = {
      title:'Login',
      schema:LOGIN_SCHEMA,
      name:'login',
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}