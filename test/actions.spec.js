import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from '../src/actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const API_HOST = 'http://127.0.0.1'
const API_URL = '/v1/auth'

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

  it('should handle a status api request', () => {
    nock(API_HOST)
      .get(API_URL + '/status')
      .times(1)
      .reply(200, {
        loggedIn:false
      })

    const expectedactions = [{
      "type": "PASSPORT_STATUS_REQUEST",
      "url": "http://127.0.0.1/v1/auth/status"
    }, {
      "type": "PASSPORT_STATUS_RESPONSE",
      "data": {
        "loggedIn": false
      }
    }]

    const statusAction = actions.status(API_HOST + API_URL + '/status')
    const store = mockStore({ })
    return store
      .dispatch(statusAction)
      .then(() => {
        const storeactions = store.getActions();
        expect(storeactions).toEqual(expectedactions)
      })

  })
})