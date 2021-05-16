import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import hotelSaga from './hotel.saga';
import bookingSaga from './booking.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(hotelSaga);
  yield fork(bookingSaga);
}
