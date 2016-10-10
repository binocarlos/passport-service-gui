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
import { passportreducer, PassportForm, UserSwitch } from 'passport-service-gui'

const PASSPORT_URL = '/v1/auth'

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
      <UserSwitch url={PASSPORT_URL}>
      <PassportForm 
        reducername="passport" 
        url="/v1/auth" />
        
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)
```

NOTE - if you are using other biro forms in your project - you can use the standard `biro/reducer` for `biroreducer`

## Form Components

All form components have the same 2 options:

 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')

#### PassportForm

A full 2 tabbed form with login and register options.

 * styles - an object with styles that are used for the tabs
   * formwrapper - the div that wraps the login and register forms

#### LoginForm

A single tabbed form with just the login option.

#### RegisterForm

A single tabbed form with just the register option.

## UserLoader

A container component that is used to load the current user status.

The user data can then be loaded from another container component.

 * url - the url used to load the user status ('/v1/auth/status')
 * onLoaded - a function to run when the status has been loaded

```javascript
import React, { PropTypes, Component } from 'react'
import { UserLoader } from '../src'
import App from './App'

class Wrapper extends Component {
  
  render() {

    return (

      <UserLoader 
        url="/v1/auth/status">
        <App {...appprops} />
      </UserLoader>

    )

  }

}

export default Wrapper
```

If you include this container component anywhere in your application - you can use the following `mapStateToProps` function in another container to decide what to do:

```javascript
function mapStateToProps(state, ownProps) {
  const reducername = ownProps.reducername || 'passport'
  const apistate = state[reducername].api.status
  return {
    loading:apistate.loading,
    loaded:apistate.loaded,
    loggedIn:apistate.data ? apistate.data.loggedIn : false,
    user:apistate.data ? apistate.data.user : null
  }
}
```

## UserSwitch

Use this to say `if the user is logged in render this, otherwise, render that`:

```javascript
...
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
...
import Wrapper from './Wrapper'
import Home from './Home'
import About from './About'
...

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
```

Wrapper.js:

```javascript
import React, { PropTypes, Component } from 'react'
import { UserSwitch } from '../src'
import App from './App'
import Login from './Login'

class Wrapper extends Component {
  
  render() {

    return (

      <UserSwitch 
        url="/v1/auth/status" 
        children={this.props.children}
        user={App}
        guest={Login} />

    )

  }

}

export default Wrapper
```

 * [App.js](example/App.js)
 * [Login.js](example/Login.js)

props:

 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')
 * user - the component to render if the user is logged in
 * guest - the component to render if the user is not logged in

## passporttools

Some useful functions for dealing with passport-service-gui state objects.

#### `getUser`

Given a reducer name (defaults to 'passport') - return an object with the current user information extracted from the passort-service-gui reducer state object:

```javascript
{
  loading:false,
  loaded:true,
  loggedIn:true,
  "user": {
    "_id": "576bce9a1218f30100379b96",
    "__v": 0,
    "provider": "local",
    "username": "",
    "email": "g@g.com",
    "type": "user",
    "name": ""
  }
}
```

Here is how to include it in a container component:

```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { passporttools } from 'passport-service-gui'

export class MyComponent extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const reducername = ownProps.reducername || 'passport'
  return {
    passport:passporttools.getUser(state, reducername)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent)
```

## reducer

An example data structure under the `passport` reducer key:

```javascript
{
  passport:{
    forms:{
      login:{
        meta:{},                  // these are biro 'meta' and 'data' props
        data:{}
      },
      register:{
        meta:{},
        data:{}
      }
    },
    api:{                         // status of the 3 network endpoints
      register:{
        url: '/v1/auth/register', // the url used for this request
        loading: false,           // currently loading
        loaded: true,             // has loaded
        error: null,              // error 
        data: {}                  // data
      },
      login:...,
      status:...
    },
    user:{                        // the status of the current user
      loggedIn:false,
      user:null
    }
  }
}
```

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