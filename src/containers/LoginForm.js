import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoginFormComponent from '../components/LoginForm'

export class LoginForm extends Component {
  render() {
    return (
      <LoginFormComponent {...this.props} />
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
)(LoginForm)
