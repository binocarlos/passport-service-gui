import React, { PropTypes, Component } from 'react'
import { UserSwitch } from '../src'
import App from './App'
import Login from './Login'

class Wrapper extends Component {
  
  render() {

    return (

      <UserSwitch 
        url="/auth/v1/status" 
        children={this.props.children}
        userview={App}
        guestview={Login} />

    )

  }

}

export default Wrapper