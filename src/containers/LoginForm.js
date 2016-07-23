import React, { Component, PropTypes } from 'react'
import { LOGIN_SCHEMA } from '../schema'
import { login } from '../actions'
import Form from './Form'

export default class LoginForm extends Component {

  render() {
    const props = {
      title:'Login',
      schema:LOGIN_SCHEMA,
      name:'login',
      submit:(data, meta) => {
        return login(this.props.url, data)
      },
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}