import { AWAIT_MARKER } from 'redux-await'
import { login, register } from './api'

export const POST_LOGIN = 'POST_LOGIN'
export const POST_REGISTER = 'POST_REGISTER'

export function postLogin(url, data) {

  console.log('-------------------------------------------');
  console.dir(url)
  console.dir(data)
  return
  return {
    type:POST_LOGIN,
    AWAIT_MARKER,
    payload:{
      authlogin: login(url, data)
    }
  }


}

export function postRegister(url, data) {
  
  return {
    type:POST_REGISTER,
    AWAIT_MARKER,
    payload:{
      authregister: register(url, data)
    }
  }

}