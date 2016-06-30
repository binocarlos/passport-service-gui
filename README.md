passport-service-gui
====================

[biro](https://github.com/binocarlos/biro) and [biro-material-ui](https://github.com/binocarlos/biro-material-ui) login & register GUI that speaks to a [passport-service](https://github.com/binocarlos/passport-service) server

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

import { biroreducer, passportreducer, PassportForm, ThemeProvider } from 'passport-service-gui'

const reducer = combineReducers({
  biro: biroreducer,
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

NOTE - if you are using other biro forms in your project - you can use the standard `biro/reducer` for `biroreducer`

## components

#### PassportForm

A full 2 tabbed form with login and register options.

 * name - the name of the passport form (default = 'auth')
 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')
 * biroreducername - where you mounted the biro reducer (default = 'biro')

#### LoginForm

A single tabbed form with just the login option.

 * name - the name of the passport form (default = 'login')
 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')
 * biroreducername - where you mounted the biro reducer (default = 'biro')

#### RegisterForm

A single tabbed form with just the register option.

 * name - the name of the passport form (default = 'register')
 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')
 * biroreducername - where you mounted the biro reducer (default = 'biro')

## license

MIT