import { combineReducers } from 'redux';
import sessionsReducer from './sessionsReducer';
import entitiesReducer from './entitiesReducer';

const RootReducer = combineReducers({
  session: sessionsReducer,
  entities: entitiesReducer
});

export default RootReducer;