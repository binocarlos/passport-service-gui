import validemail from 'valid-email'

export function validateEmail(val = ''){
  return validemail(val) ? null : 'invalid email address'
}

export function validatePassword(val = ''){
  if(val.length<6) return 'must be at least 6 chars'
  return null
}