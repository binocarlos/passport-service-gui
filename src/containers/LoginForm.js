import React, { Component, PropTypes } from 'react'
import { connect } from 'redux-await'
import { validateForm } from 'biro/actions'
import { getFormState } from 'biro/tools'

import { postLogin } from '../actions'
import LoginFormComponent from '../components/LoginForm'

export class LoginForm extends Component {

  componentWillReceiveProps(nextProps) {
    var formState = nextProps.formstate

    if(formState.has_validated_all && formState.valid){
      this.props.confirmSubmit && this.props.confirmSubmit(formState.data)
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
    confirmSubmit:function(data){
      dispatch(postLogin(ownProps.url, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
