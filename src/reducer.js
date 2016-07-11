import update from 'react/lib/update'

export const initialState = {
  forms:{
    login:{
      data:{},
      meta:{}
    },
    register:{
      data:{},
      meta:{}
    }
  },
  api:{
    status:{
      url:null,
      loading:false,
      loaded:false,
      error:null,
      data:null
    },
    login:{
      url:null,
      loading:false,
      loaded:false,
      error:null,
      data:null
    },
    register:{
      url:null,
      loading:false,
      loaded:false,
      error:null,
      data:null
    }
  }
}

export default function reducer(state = initialState, action = {}) {
  
  switch (action.type) {
    case 'PASSPORT_FORM_UPDATE':

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
      
    default:
      return state
  }
}