export function getUser(state, reducername = 'passport') {
  const apistate = state[reducername].api.status
  return {
    loading:apistate.loading,
    loaded:apistate.loaded,
    loggedIn:apistate.data ? apistate.data.loggedIn : false,
    user:apistate.data ? apistate.data.user : null
  }
}