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
        return login({
          url:this.props.url,
          data:data,
          meta:meta
        }, this.props.onLogin)
      },
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}