import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import PassportFormComponent from '../components/PassportForm'

export class PassportForm extends Component {
  render() {
    return (
      <PassportFormComponent {...this.props} />
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
)(PassportForm)
