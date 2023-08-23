// redux/reducers.js
import { combineReducers } from 'redux';
import destinationReducer from './reducers/DestinationReducer';

const rootReducer = combineReducers({
  destinations: destinationReducer,
});

export default rootReducer;
