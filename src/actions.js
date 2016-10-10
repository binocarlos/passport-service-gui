import superagent from 'superagent'

export const PASSPORT_FORM_UPDATE = 'PASSPORT_FORM_UPDATE'

/*

  form actions
  
*/
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

export function formservererror(name, data, meta, servererrors) {
  meta = JSON.parse(JSON.stringify(meta))
  Object.keys(servererrors || {}).forEach(function(key){
    meta.fields[key].dirty = true
    meta.fields[key].valid = false
    meta.fields[key].error = servererrors[key].message
  })
  meta.dirty = true
  meta.valid = false
  return {
    type: PASSPORT_FORM_UPDATE,
    name,
    data,
    meta
  }
}

export const PASSPORT_STATUS_RESET = 'PASSPORT_STATUS_RESET'

// action to clear the current status api response
// this will trigger it to load again without knowing the url
// used once the user has logged in to trigger to re-fetch of user status
export function resetStatus(){
  return {
    type:PASSPORT_STATUS_RESET
  }
}

/*

  request helpers
  
*/
function requestAction(action, url, data){
  return {
    type: action,
    url,
    data
  }
}

function responseAction(action, data){
  return {
    type: action,
    data
  }
}

function errorAction(action, error){
  return {
    type:action,
    error
  }
}

// check if the http status code is OK
// if not then return the res.body error packet
function getResponseErrors(res){
  return res.status >= 200 && res.status < 300 ?
    null : res.body
}

/*

  login
  
*/
export const PASSPORT_LOGIN_REQUEST = 'PASSPORT_LOGIN_REQUEST'
export const PASSPORT_LOGIN_RESPONSE = 'PASSPORT_LOGIN_RESPONSE'
export const PASSPORT_LOGIN_ERROR = 'PASSPORT_LOGIN_ERROR'

export function login(url, data, meta) {

  return dispatch => {

    dispatch(requestAction(PASSPORT_LOGIN_REQUEST, url, data))

    superagent
      .post(url)
      .set('Content-Type', 'application/json')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err){

          // do we have a normal error or are there field errors 
          // in the JSON packet
          if(err.response && err.response.headers && err.response.headers['content-type']=='application/json'){
            const servererrors = err.response.body && err.response.body.errors ? err.response.body.errors : {}
            dispatch(formservererror('login', data, meta, servererrors))
            dispatch(errorAction(PASSPORT_LOGIN_ERROR, 'incorrect details'))
          }
          else{
            dispatch(errorAction(PASSPORT_LOGIN_ERROR, 'incorrect details'))
          }

        }
        else{
          dispatch(responseAction(PASSPORT_LOGIN_RESPONSE, res.body))

          // this will re-load the /v1/auth/status data
          if(res.body.loggedIn){
            dispatch(resetStatus())
          }
        }
      })

  }

}


/*

  register
  
*/
export const PASSPORT_REGISTER_REQUEST = 'PASSPORT_REGISTER_REQUEST'
export const PASSPORT_REGISTER_RESPONSE = 'PASSPORT_REGISTER_RESPONSE'
export const PASSPORT_REGISTER_ERROR = 'PASSPORT_REGISTER_ERROR'

export function register(url, data, meta) {

  return dispatch => {

    dispatch(requestAction(PASSPORT_REGISTER_REQUEST, url, data))

    superagent
      .post(url)
      .set('Content-Type', 'application/json')
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {

        if(err){

          // do we have a normal error or are there field errors 
          // in the JSON packet
          if(err.response && err.response.headers && err.response.headers['content-type']=='application/json'){
            const servererrors = err.response.body && err.response.body.errors ? err.response.body.errors : {}
            dispatch(formservererror('register', data, meta, servererrors))
            dispatch(errorAction(PASSPORT_REGISTER_ERROR, 'server error'))
          }
          else{
            dispatch(errorAction(PASSPORT_REGISTER_ERROR, err.message))
          }

        }
        else{
          dispatch(responseAction(PASSPORT_REGISTER_RESPONSE, res.body))
        }

      })
  }

}

/*

  status
  
*/
export const PASSPORT_STATUS_REQUEST = 'PASSPORT_STATUS_REQUEST'
export const PASSPORT_STATUS_RESPONSE = 'PASSPORT_STATUS_RESPONSE'
export const PASSPORT_STATUS_ERROR = 'PASSPORT_STATUS_ERROR'

export function status(url, done) {

  return dispatch => {

    dispatch(requestAction(PASSPORT_STATUS_REQUEST, url))

    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(res.status<500){
          dispatch(responseAction(PASSPORT_STATUS_RESPONSE, res.body))
          done && done(res.body)
        }
        else{
          dispatch(errorAction(PASSPORT_STATUS_ERROR, err ? err.message : res.body))
        }
      })

  }

}