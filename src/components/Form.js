import React, { PropTypes, Component } from 'react'
import Biro from 'biro'
import RaisedButton from 'material-ui/RaisedButton'
import library from 'biro-material-ui'
import layout from 'biro-material-ui/layout'

const buttonstyle = {
  marginTop: 12,
}

class Form extends Component {

  submit() {

  }
  
  render() {
    
    return (
      <div>

        <Biro 
          data={this.props.data}
          meta={this.props.meta}
          library={library} 
          layout={layout}
          schema={this.props.schema} 
          validate={this.props.validate} 
          update={this.props.update}
        />

        <RaisedButton 
          label={this.props.title} 
          primary={true} 
          onClick={this.submit.bind(this)}
          style={buttonstyle} 
        />

      </div>
    )
  }

}

export default Form