import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateForm } from 'biro/actions'

import RegisterFormComponent from '../components/RegisterForm'

export class RegisterForm extends Component {
  render() {
    return (
      <RegisterFormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit:function(){
      dispatch(validateForm(ownProps.name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
