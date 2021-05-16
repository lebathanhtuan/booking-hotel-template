import { combineReducers } from 'redux';
import hotelReducer from './hotel.reducer';
import userReducer from './user.reducer';
import bookingReducer from './booking.reducer';

export default combineReducers({
  hotelReducer,
  userReducer,
  bookingReducer,
});
