import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { status } from '../actions'

export class UserLoader extends Component {

  componentWillMount() {
    // the initial 'load user' trigger
    if(!this.props.loaded && !this.props.loading){
      this.props.loaduser()
    }
  }

  componentWillReceiveProps(nextProps) {
    // the once logged in 'load user' trigger
    if(!nextProps.loaded && !nextProps.loading){
      this.props.loaduser()
    }
  }

  render() {
    return this.props.children
  }
}

function mapStateToProps(state, ownProps) {

  const reducername = ownProps.reducername || 'passport'
  const apistate = state[reducername].api.status
  return {
    loading:apistate.loading,
    loaded:apistate.loaded
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loaduser:function(){
      dispatch(status(ownProps.url, ownProps.onLoaded))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLoader)
