import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { status } from '../actions'

export class UserSwitch extends Component {

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

    if(!this.props.loaded){
      return (
        <div>loading...</div>
      )
    }

    return this.props.loggedIn ?
      React.createElement(this.props.userview, {}, this.props.children) :
      React.createElement(this.props.guestview, {}, this.props.children)
        
  }
}

function mapStateToProps(state, ownProps) {

  // if the user has installed the reducer somewhere other
  // than 'passport'
  const reducername = ownProps.reducername || 'passport'
  const apistate = state[reducername].api.status
  return {
    loading:apistate.loading,
    loaded:apistate.loaded,
    loggedIn:apistate.data ? apistate.data.loggedIn : false,
    user:apistate.data ? apistate.data.user : null
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loaduser:function(){
      dispatch(status(ownProps.url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSwitch)
