import React, { PropTypes, Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class PassportForm extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <LoginForm 
          url={this.props.url+'/login'}
          reducername={this.props.reducername} />
        <hr />
        <RegisterForm 
          url={this.props.url+'/register'}
          reducername={this.props.reducername} />
      </div>
    )
  }

}

export default PassportForm