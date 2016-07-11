import validemail from 'valid-email'

export function validateEmail(val = ''){
  return validemail(val) ? null : 'invalid email address'
}

export function validatePassword(val = ''){
  if(val.length<8) return 'must be at least 8 chars'
  if(!val.match(/\s/)) return 'cannot contain spaces'
  return null
}

const EMAIL_FIELD = {
  name:'email',
  type:'text',
  validate:validateEmail
}

const PASSWORD_FIELD = {
  name:'password',
  type:'text',
  inputtype:'password',
  validate:validatePassword
}

export const LOGIN_SCHEMA = [
  EMAIL_FIELD,
  PASSWORD_FIELD
]

export const REGISTER_SCHEMA = [
  EMAIL_FIELD,
  PASSWORD_FIELD
]