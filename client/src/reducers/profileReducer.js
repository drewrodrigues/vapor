import {
  RECEIVE_PROFILE,
  REMOVE_PROFILE,
  RECEIVE_OWNED_GAMES
} from '../actions/userDatumActions'

const profileReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_PROFILE:
      return Object.assign(newState, action.profile)
    case REMOVE_PROFILE:
      return {}
    case RECEIVE_OWNED_GAMES:
      return Object.assign(newState, { "ownedGames": action.ownedGames })
    default:
      return oldState
  }
}

export default profileReducer