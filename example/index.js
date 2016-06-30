import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import { passportreducer, PassportForm, ThemeProvider } from '../src'

const reducer = combineReducers({
  passport: passportreducer
})

const store = createStore(reducer)

ReactDOM.render(  
  <Provider store={store}>
    <ThemeProvider>

      <PassportForm 
        name="auth" 
        url="/v1/auth" />
        
    </ThemeProvider>
  </Provider>,
  document.getElementById('mount')
)