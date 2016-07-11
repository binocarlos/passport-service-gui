import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should handle an update form action', () => {

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

    const updateAction = actions.formupdate('login', data, meta)
    const store = mockStore({ })
    store.dispatch(updateAction)

    const storeactions = store.getActions();
    expect(storeactions).toEqual([updateAction]);
    
  })


})