import React, { PropTypes, Component } from 'react'
import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

class PassportForm extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <LoginForm 
          reducername={this.props.reducername}
          url={this.props.url+'/login'}
          biroreducername={this.props.biroreducername}
          name={name + 'login'} />
        <hr />
        <RegisterForm 
          reducername={this.props.reducername}
          url={this.props.url+'/register'}
          biroreducername={this.props.biroreducername}
          name={name + 'register'} />
      </div>
    )
  }

}

export default PassportForm