import { combineReducers } from 'redux';
import sessionsReducer from './sessionsReducer'

const RootReducer = combineReducers({
  session: sessionsReducer
})

export default RootReducer;