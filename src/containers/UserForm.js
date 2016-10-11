import React, { Component, PropTypes } from 'react'
import { update } from '../actions'
import Form from './Form'

export default class UserForm extends Component {

  render() {
    const props = {
      title:{this.props.title || 'User Details'},
      name:'details',
      submit:(data, meta) => {
        return update({
          url:this.props.url,
          data:data,
          meta:meta
        }, this.props.onUpdate)
      },
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}