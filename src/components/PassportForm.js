import React, { PropTypes, Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

class PassportForm extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    var styles = this.props.styles || {}
    
    return (

      <Tabs>
        <Tab label="Login">
          <div style={Object.assign({}, styles.loginwrapper, styles.formwrapper)}>
            <LoginForm 
              url={this.props.url+'/login'}
              reducername={this.props.reducername} />
          </div>
        </Tab>
        <Tab label="Register">
          <div style={Object.assign({}, styles.registerwrapper, styles.formwrapper)}>
            <RegisterForm 
              url={this.props.url+'/register'}
              reducername={this.props.reducername} />
          </div>
        </Tab>
      </Tabs>
    )
  }

}

export default PassportForm