import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { validateForm } from 'biro/actions'
import { getFormState } from 'biro/tools'

import LoginFormComponent from '../components/LoginForm'

export class LoginForm extends Component {

  componentWillReceiveProps(nextProps) {
    var formState = nextProps.formstate

    if(formState.has_validated_all && formState.valid){
      this.props.confirmSubmit && this.props.confirmSubmit()
    }
  }

  render() {
    return (
      <LoginFormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    formstate:getFormState(state, ownProps)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit:function(){
      dispatch(validateForm(ownProps.name))
    },
    confirmSubmit:function(){
      console.log('-------------------------------------------');
      console.log('run form')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
