import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { Container, Row, Col } from 'kettle-ui/lib/Grid'

const styles = {
  container:{
    marginTop:'100px'
  }
}

class App extends Component {
  
  logout() {
    document.location = '/auth/v1/logout'
  }

  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <AppBar
          showMenuIconButton={false}
          title="Home"
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Sign out" onTouchTap={this.logout.bind(this)} />
            </IconMenu>
          }
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