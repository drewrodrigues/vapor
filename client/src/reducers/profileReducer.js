import {
  RECEIVE_PROFILE,
  REMOVE_PROFILE
} from '../actions/userDatumActions'

const profileReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_PROFILE:
      return Object.assign(newState, action.profile)
    case REMOVE_PROFILE:
      return {}
    default:
      return oldState
  }
}

export default profileReducer