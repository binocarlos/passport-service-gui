import Promise from 'promise'

export function login(url, data) {

  return new Promise((resolve, reject) => {
    agent('POST', url)
      .send({
        email:data.email,
        password:data.password
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) reject(err)
        resolve(res)
      })
  })

}

export function register(url, data) {
  
  return new Promise((resolve, reject) => {
    agent('POST', url)
      .send({
        email:data.email,
        password:data.password
      })
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err) reject(err)
        resolve(res)
      })
  })

}