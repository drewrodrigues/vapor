import * as APIUtil from '../util/sessionUtil'
import jwt_decode from 'jwt-decode'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const RECEIVE_USER_LOGOUT  = "RECEIVE_USER_LOGOUT"

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
})

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
})

export const login = token => dispatch => {
  localStorage.setItem("jwt", token)
  APIUtil.setAuthToken(token)
  const decoded = jwt_decode(token)
  dispatch(receiveCurrentUser(decoded))
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwt')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
}