import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
