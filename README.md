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
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { passportreducer, PassportForm } from 'passport-service-gui'

const reducer = combineReducers({
  passport: passportreducer
})

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

const store = finalCreateStore(reducer)

ReactDOM.render(  
  <Provider store={store}>
    <MuiThemeProvider>

      <PassportForm 
        reducername="passport" 
        url="/v1/auth" />
        
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)
```

NOTE - if you are using other biro forms in your project - you can use the standard `biro/reducer` for `biroreducer`

## components

All components have the same 2 options:

 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')

#### PassportForm

A full 2 tabbed form with login and register options.

#### LoginForm

A single tabbed form with just the login option.

#### RegisterForm

A single tabbed form with just the register option.

## Developer setup

You can run the passport auth server using the `docker-compose.yml`

Combine this with `npm run watch` for a hot reloading gui against a live server.

```
$ npm run watch
```

Then:

```
$ docker-compose up
```

Then visit [http://localhost](http://localhost)

## license

MIT