import { RECEIVE_STATS } from '../actions/statActions'

const statsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)

  switch (action.type) {
    case RECEIVE_STATS:
      return action.stats
    default:
      return oldState
  }
}

export default statsReducer