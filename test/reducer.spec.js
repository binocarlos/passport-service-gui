import expect from 'expect'
import reducer, { initialState } from '../src/reducer'
import * as actions from '../src/actions'

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

})