import React, { PropTypes, Component } from 'react'
import Biro from 'biro'
import muiLibrary, { FormLayout, RowLayout } from 'biro-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

const buttonstyle = {
  marginTop: 12,
}

class Form extends Component {

  render() {
    
    return (
      <div>

        <Biro 
          name={this.props.name}
          reducername={this.props.biroreducername}
          library={muiLibrary} 
          schema={this.props.schema} 
          validate={this.props.validate} 
          formrenderer={FormLayout}
          rowrenderer={RowLayout} />

        <RaisedButton 
          label={this.props.title} 
          primary={true} 
          onClick={this.props.onSubmit}
          style={buttonstyle} />

      </div>
    )
  }

}

export default Form