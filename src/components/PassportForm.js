import React, { PropTypes, Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

class PassportForm extends Component {
  
  render() {

    let name = this.props.name || 'auth'
    let styles = this.props.styles || {}
    let pageContent = this.props.pageContent || {}
    
    return (

      <Tabs value={this.props.page} onChange={this.props.changePage}>
        <Tab label="Login" value="login">
          <div style={Object.assign({}, styles.loginwrapper, styles.formwrapper)}>
            <LoginForm 
              onLogin={this.props.onLogin}
              url={this.props.url+'/login'}
              reducername={this.props.reducername}>
                {pageContent.login}
            </LoginForm>
          </div>
        </Tab>
        <Tab label="Register" value="register">
          <div style={Object.assign({}, styles.registerwrapper, styles.formwrapper)}>
            <RegisterForm 
              onRegister={this.props.onRegister}
              url={this.props.url+'/register'}
              reducername={this.props.reducername}>
                {pageContent.register}
            </RegisterForm>
          </div>
        </Tab>
      </Tabs>
    )
  }

}

export default PassportForm