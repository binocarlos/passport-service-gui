import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { formupdate, formerror } from '../actions'
import FormComponent from 'kettle-ui/lib/Form'

export class Form extends Component {

  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {

  // if the user has installed the reducer somewhere other
  // than 'passport'
  const reducername = ownProps.reducername || 'passport'

  // this is 'login' or 'register' or 'details'
  const formname = ownProps.name
  const formstate = state[reducername].forms[formname]
  const apistate = state[reducername].api[formname]
  return {
    data:formstate.data,
    meta:formstate.meta,
    error:apistate.error,
    loading:apistate.loading
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update:function(data, meta){
      dispatch(formupdate(ownProps.name, data, meta))
    },
    submit:function(data, meta){
      if(!meta.valid){
        return dispatch(formerror(ownProps.name, data, meta))
      }
      dispatch(ownProps.submit(data, meta));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
