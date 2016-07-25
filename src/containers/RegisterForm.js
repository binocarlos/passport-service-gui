import React, { Component, PropTypes } from 'react'
import { REGISTER_SCHEMA } from '../schema'
import { register } from '../actions'
import Form from './Form'

export default class RegisterForm extends Component {

  render() {
    const props = {
      title:'Register',
      schema:REGISTER_SCHEMA,
      name:'register',
      submit:(data, meta) => {
        return register(this.props.url, data, meta)
      },
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}