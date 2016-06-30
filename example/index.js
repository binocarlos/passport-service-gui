import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { biroreducer, PassportForm, ThemeProvider } from '../src'

const reducer = combineReducers({
  biro: biroreducer
})

const finalCreateStore = compose(
  applyMiddleware.apply(null, []),
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