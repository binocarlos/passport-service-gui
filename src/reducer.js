import update from 'react/lib/update'
import * as actions from '../src/actions'

function defaultFormState(){
  return {
    data:{},
    meta:null
  }
}

function defaultApiState(){
  return {
    url:null,
    loading:false,
    loaded:false,
    error:null,
    data:null
  } 
}

export const initialState = {
  forms:{
    login:defaultFormState(),
    register:defaultFormState()
  },
  api:{
    status:defaultApiState(),
    login:defaultApiState(),
    register:defaultApiState()
  }
}

function requestHandler(name){
  return (state, action) => {
    return update(state, {
      api: {
        [name]: {
          $merge:{
            url:action.url,
            loading:true,
            loaded:false,
            error:null,
            data:null
          }
        }
      }
    })
  }
}

function responseHandler(name, state, action){
  return (state, action) => {
    return update(state, {
      api: {
        [name]: {
          $merge:{
            loading:false,
            loaded:true,
            error:null,
            data:action.data
          }
        }
      }
    })
  }
}

function errorHandler(name, state, action){
  return (state, action) => {
    return update(state, {
      api: {
        [name]: {
          $merge:{
            loading:false,
            loaded:true,
            error:action.error,
            data:null
          }
        }
      }
    })
  }
}

function formHandler(state, action){
  return update(state, {
    forms: {
      [action.name]: {
        $set:{
          data:action.data,
          meta:action.meta  
        }
      }
    }
  })
}

function getHandlers(name){
  const uppername = name.toUpperCase()
  return {
    ['PASSPORT_' + uppername + '_REQUEST']:requestHandler(name),
    ['PASSPORT_' + uppername + '_RESPONSE']:responseHandler(name),
    ['PASSPORT_' + uppername + '_ERROR']:errorHandler(name)
  }
}

const handlers = {
  [actions.PASSPORT_FORM_UPDATE]:formHandler,    
  ...getHandlers('login'),
  ...getHandlers('register'),
  ...getHandlers('status')
}

export default function reducer(state = initialState, action = {}) {
  
  return handlers[action.type] ? 
    handlers[action.type](state, action) :
    state

}