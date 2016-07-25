import React, { PropTypes, Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

class PassportForm extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <Tabs>
        <Tab label="Login">
          <LoginForm 
            url={this.props.url+'/login'}
            reducername={this.props.reducername} />
        </Tab>
        <Tab label="Register">
          <RegisterForm 
            url={this.props.url+'/register'}
            reducername={this.props.reducername} />
        </Tab>
      </Tabs>
    )
  }

}

export default PassportForm