import update from 'react/lib/update'
import * as actions from './actions'

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
    register:defaultFormState(),
    details:defaultFormState()
  },
  api:{
    status:defaultApiState(),
    login:defaultApiState(),
    register:defaultApiState(),
    details:defaultApiState(),
    logout:defaultApiState()
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

function responseHandler(name){
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

function errorHandler(name){
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

// reset the 'have loaded user data'
// this will re-trigger any UserSwitches
function resetStatusHandler(state, action){
  return update(state, {
    api: {
      status: {
        $set:{
          loading:false,
          loaded:false
        }
      }
    }
  })
}

function loadUserDetailsHandler(state, action){

  const userData = state.api.status.data.user
  let newData = userData.data || {}
  newData.email = userData.email

  return update(state, {
    forms: {
      details: {
        data: {
          $set:newData
        }
      }
    }
  })
}

function getHandlers(name, handlers = {}){
  const uppername = name.toUpperCase()

  const defaultHandlers = {
    request:requestHandler(name),
    response:responseHandler(name),
    error:errorHandler(name)
  }

  let useHandlers = {}

  Object.keys(defaultHandlers || {}).forEach(function(key){
    useHandlers[key] = (state, action) => {
      state = defaultHandlers[key](state, action)
      if(handlers[key]){
        state = handlers[key](state, action)
      }
      return state
    }
  })

  return {
    ['PASSPORT_' + uppername + '_REQUEST']:useHandlers.request,
    ['PASSPORT_' + uppername + '_RESPONSE']:useHandlers.response,
    ['PASSPORT_' + uppername + '_ERROR']:useHandlers.error
  }
}

const handlers = {
  [actions.PASSPORT_FORM_UPDATE]:formHandler,
  [actions.PASSPORT_STATUS_RESET]:resetStatusHandler,
  [actions.PASSPORT_LOAD_USER_DETAILS]:loadUserDetailsHandler,
  ...getHandlers('login'),
  ...getHandlers('register'),
  ...getHandlers('details'),
  ...getHandlers('status'),
  ...getHandlers('logout')
}

export default function reducer(state = initialState, action = {}) {
  
  return handlers[action.type] ? 
    handlers[action.type](state, action) :
    state

}