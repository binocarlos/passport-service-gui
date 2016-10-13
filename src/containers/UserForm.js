import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { details, loaduserdetails } from '../actions'
import Form from './Form'

export class UserForm extends Component {

  componentWillMount() {
    this.props.loadUserData()
  }

  render() {
    const props = {
      title:'Save',
      schema:this.props.schema,
      name:'details',
      submit:(data, meta) => {
        return details({
          url:this.props.url,
          data:data,
          meta:meta
        }, this.props.onUpdate)
      },
      ...this.props
    }
    return (
      <Form { ...props } />
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadUserData:function(data, meta){
      dispatch(loaduserdetails())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
