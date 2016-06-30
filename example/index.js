import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { middleware as awaitMiddleware } from 'redux-await'
import { reducer as awaitreducer } from 'redux-await'
import thunk from 'redux-thunk'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { biroreducer, passportreducer, PassportForm, ThemeProvider } from '../src'

const reducer = combineReducers({
  biro: biroreducer,
  passport: passportreducer,
  await: awaitreducer
})

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    awaitMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = finalCreateStore(reducer)

ReactDOM.render(  
  <Provider store={store}>
    <ThemeProvider>

      <Card>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          <PassportForm 
            name="auth" 
            url="/v1/auth" />
        </CardText>
      </Card>
        
    </ThemeProvider>
  </Provider>,
  document.getElementById('mount')
)