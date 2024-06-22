// store.js
import { createStore, combineReducers } from 'redux';
import userReducer from './redux/reducers/userReducer'; // Assuming you have a user reducer

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

// Create Redux store without middleware
const store = createStore(rootReducer);

export default store;
