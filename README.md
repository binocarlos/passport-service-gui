passport-service-gui
====================

[biro-material-ui](https://github.com/binocarlos/biro-material-ui) login & register GUI that speaks to a [passport-service](https://github.com/binocarlos/passport-service) server

## install

Install the module to your project:

```
$ npm install passport-service-gui --save
```

## usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import { passportreducer, PassportForm, ThemeProvider } from 'passport-service-gui'

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
```

## components

#### PassportForm

A full 2 tabbed form with login and register options.

#### LoginForm

A single tabbed form with just the login option.

#### RegisterForm

A single tabbed form with just the register option.

## license

MIT