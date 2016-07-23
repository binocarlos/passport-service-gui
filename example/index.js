import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import { Container, Row, Col } from 'kettle-ui/lib/Grid'

import { passportreducer, PassportForm } from '../src'

const reducer = combineReducers({
  passport: passportreducer
})

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = finalCreateStore(reducer)

injectTapEventPlugin()


const styles = {
  container:{
    marginTop:'20px'
  }
}

ReactDOM.render(  
  <Provider store={store}>
    <MuiThemeProvider>

      <div>
        <AppBar
          showMenuIconButton={false}
          title="Login App"
          zDepth={2}
        />
        <Container style={styles.container}>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <PassportForm 
                url="/v1/auth" />
            </Col>
            <Col md={6}></Col>
          </Row>

        </Container>
      </div>

    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)