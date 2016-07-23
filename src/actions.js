require('es6-promise').polyfill()
require('isomorphic-fetch')

export const PASSPORT_FORM_UPDATE = 'PASSPORT_FORM_UPDATE'

export function formupdate(name, data, meta) {
  return {
    type: PASSPORT_FORM_UPDATE,
    name,
    data,
    meta
  }
}

export function formerror(name, data, meta) {
  meta = JSON.parse(JSON.stringify(meta))
  Object.keys(meta.fields || {}).forEach(function(key){
    meta.fields[key].dirty = true
  })
  meta.dirty = true
  return {
    type: PASSPORT_FORM_UPDATE,
    name,
    data,
    meta
  }
}

// with some actions and a fetch promise
// return the thunk
function apiRequest(actions, req, url, data) {

  return dispatch => {

    const reqAction = { type: actions[0], url }
    if(data) reqAction.data = data
    dispatch(reqAction)

    return req
      .then(
        data => dispatch({ type: actions[1], data }),
        error => dispatch({ type: actions[2], error })
      )    
  }
}

// generate a POST JSON request
function postJSON(url, data){
  return fetch(url, {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
}

// generate a GET JSON request
function getJSON(url){
  return fetch(url, {
    method:'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
}

export const PASSPORT_LOGIN_REQUEST = 'PASSPORT_LOGIN_REQUEST'
export const PASSPORT_LOGIN_RESPONSE = 'PASSPORT_LOGIN_RESPONSE'
export const PASSPORT_LOGIN_ERROR = 'PASSPORT_LOGIN_ERROR'

export function login(url, data) {

  var req = postJSON(url, data)  

  var actions = [
    PASSPORT_LOGIN_REQUEST,
    PASSPORT_LOGIN_RESPONSE,
    PASSPORT_LOGIN_ERROR
  ]

  return apiRequest(actions, req, url, data)

}

export const PASSPORT_REGISTER_REQUEST = 'PASSPORT_REGISTER_REQUEST'
export const PASSPORT_REGISTER_RESPONSE = 'PASSPORT_REGISTER_RESPONSE'
export const PASSPORT_REGISTER_ERROR = 'PASSPORT_REGISTER_ERROR'

export function register(url, data) {

  var req = postJSON(url, data)  

  var actions = [
    PASSPORT_LOGIN_REQUEST,
    PASSPORT_LOGIN_RESPONSE,
    PASSPORT_LOGIN_ERROR
  ]

  return apiRequest(actions, req, url, data)

}

export const PASSPORT_STATUS_REQUEST = 'PASSPORT_STATUS_REQUEST'
export const PASSPORT_STATUS_RESPONSE = 'PASSPORT_STATUS_RESPONSE'
export const PASSPORT_STATUS_ERROR = 'PASSPORT_STATUS_ERROR'

export function status(url) {

  var req = getJSON(url)  

  var actions = [
    PASSPORT_STATUS_REQUEST,
    PASSPORT_STATUS_RESPONSE,
    PASSPORT_STATUS_ERROR
  ]

  return apiRequest(actions, req, url)

}