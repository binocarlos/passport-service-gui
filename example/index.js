import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { passportreducer } from '../src'
import Wrapper from './Wrapper'
import Home from './Home'
import About from './About'

const reducer = combineReducers({
  passport: passportreducer
})

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = finalCreateStore(reducer)

injectTapEventPlugin()

ReactDOM.render(  
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={Wrapper}>
          <IndexRoute component={Home} />
          <Route path="about" component={About}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)