import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER
} from '../actions/sessionActions'

const sessionsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      }
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.currentUser
      }
    default:
      return state
  }
}

export default sessionsReducer