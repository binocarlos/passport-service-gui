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

All for components have the same 2 options:

 * url - the base url of the backend passport-service (default = '/v1/auth')
 * reducername - where you mounted the passport reducer (default = 'passport')

#### PassportForm

A full 2 tabbed form with login and register options.

#### LoginForm

A single tabbed form with just the login option.

#### RegisterForm

A single tabbed form with just the register option.

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