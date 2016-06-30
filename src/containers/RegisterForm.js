import React, { Component, PropTypes } from 'react'
import { connect } from 'redux-await'
import { validateForm } from 'biro/actions'
import { getFormState } from 'biro/tools'

import { postRegister } from '../actions'
import RegisterFormComponent from '../components/RegisterForm'

export class RegisterForm extends Component {

  componentWillReceiveProps(nextProps) {
    var formState = nextProps.formstate

    if(formState.has_validated_all && formState.valid){
      this.props.confirmSubmit && this.props.confirmSubmit(formState.data)
    }
  }

  render() {
    return (
      <RegisterFormComponent {...this.props} />
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
      dispatch(postRegister(ownProps.url, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
