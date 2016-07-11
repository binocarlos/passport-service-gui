import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { formupdate } from '../actions'
import FormComponent from '../components/Form'

export class Form extends Component {

  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const reducername = ownProps.reducername || 'passport'
  const formname = ownProps.name
  const formstate = state[reducername].forms[formname]
  const apistate = state[reducername].api[formname]
  return {
    data:formstate.data,
    meta:formstate.meta,
    api:apistate
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update:function(data, meta){
      dispatch(formupdate(ownProps.name, data, meta))
    },
    submit:function(){
      console.log('-------------------------------------------');
      console.log(ownProps.url)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)
