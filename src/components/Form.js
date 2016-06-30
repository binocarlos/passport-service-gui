import React, { PropTypes, Component } from 'react'
import Biro from 'biro'
import muiLibrary, { FormLayout, RowLayout } from 'biro-material-ui'

class Form extends Component {
  
  render() {
    
    return (
      <Biro 
        name={this.props.name}
        reducername={this.props.reducername || 'passport'}
        library={muiLibrary} 
        schema={this.props.schema} 
        validate={this.props.validate} 
        formrenderer={FormLayout}
        rowrenderer={RowLayout} />
    )
  }

}

export default Form