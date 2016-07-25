import expect from 'expect'
import reducer, { initialState } from '../src/reducer'
import * as actions from '../src/actions'

const URL = 'http://127.0.0.1/v1/auth/status'

describe('reducer', () => {
  it('should return the initial state', () => {

    const state = reducer()

    expect(state).toEqual(initialState)
    
  })

  it('should handle a form update', () => {

    const data = {
      email:'bob@bob.com',
      password:'apples'
    }
    const meta = {
      dirty:true,
      valid:true,
      fields:{
        email:{
          dirty:true,
          valid:true
        },
        password:{
          dirty:true,
          valid:true
        }
      }
    }
    const state = reducer(undefined, actions.formupdate('login', data, meta))
    expect(state.forms.login.data).toEqual(data)
    expect(state.forms.login.meta).toEqual(meta)

  })

  it('should handle a status api request', () => {

    const state = reducer(undefined, {
      type:actions.PASSPORT_LOGIN_REQUEST,
      url:URL
    })

    expect(state.api.login.loading).toBe(true)
    expect(state.api.login.loaded).toBe(false)
    expect(state.api.login.url).toBe(URL)
  })

  it('should handle a status api response', () => {
    
    const DATA = {
      loggedIn:false
    }
    const state = reducer(undefined, {
      type:actions.PASSPORT_LOGIN_RESPONSE,
      data:DATA
    })

    expect(state.api.login.loading).toBe(false)
    expect(state.api.login.loaded).toBe(true)
    expect(state.api.login.data).toEqual(DATA)
    expect(state.api.login.error).toEqual(null)
  })

  it('should handle a status api error', () => {
    
    const ERROR = "connection error"
      
    const state = reducer(undefined, {
      type:actions.PASSPORT_LOGIN_ERROR,
      error:ERROR
    })

    expect(state.api.login.loading).toBe(false)
    expect(state.api.login.loaded).toBe(true)
    expect(state.api.login.data).toEqual(null)
    expect(state.api.login.error).toEqual(ERROR)
  })

})