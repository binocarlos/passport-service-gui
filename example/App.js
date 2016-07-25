import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { Container, Row, Col } from 'kettle-ui/lib/Grid'

const styles = {
  container:{
    marginTop:'100px'
  }
}

class App extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <AppBar
          showMenuIconButton={false}
          title="Home"
          zDepth={2}
        />
        <Container style={styles.container}>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              {this.props.children}
            </Col>
            <Col md={2}></Col>
          </Row>

        </Container>
      </div>
    )
  }

}

export default App