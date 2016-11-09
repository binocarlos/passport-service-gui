import update from 'react/lib/update'
import * as actions from './actions'

const defaultFormState = () => {
  return {
    data:{},
    meta:null
  }
}

const defaultApiState = () => {
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

const requestHandler = (name) => {
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

const responseHandler = (name) => {
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

const errorHandler = (name) => {
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

const formHandler = (state, action) => {
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
const resetStatusHandler = (state, action) => {
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


/*

  once the user details are loaded - we write them to the form state for the updater
  
*/

const TOP_LEVEL_USER_FIELDS = {
  name:true,
  email:true,
  accesslevel:true
}

const loadUserDetailsHandler = (state, action) => {

  const userData = state.api.status.data.user

  const newData = Object.assign({}, userData.data)

  Object.keys(TOP_LEVEL_USER_FIELDS || {}).forEach((key) => {
    newData[key] = userData[key]
  })

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


const commitUserDetailsHandler = (state, action) => {

  const formData = Object.assign({}, state.forms.details.data)

  Object.keys(TOP_LEVEL_USER_FIELDS || {}).forEach((key) => {
    delete(formData[key])
  })

  return update(state, {
    api: {
      status: {
        data: {
          user: {
            data: {
              $set: formData
            }
          }
        }
      }
    }
  })
}

const getHandlers = (name, handlers = {}) => {
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
  [actions.PASSPORT_COMMIT_USER_DETAILS]:commitUserDetailsHandler,
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