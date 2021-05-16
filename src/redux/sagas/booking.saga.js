import { put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';

function* bookingHotelRoom(action) {
  try {
    const { userId, hotelId, roomId, startDate, endDate } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3001/bookingRooms',
      data: {
        userId,
        hotelId,
        roomId,
        startDate,
        endDate
      }
    });
    yield notification.open({
      message: 'Đặt phòng thành công',
      description: `Bạn đã đặt phòng từ ${startDate} - ${endDate}`,
    });
    yield put({
      type: "BOOKING_HOTEL_ROOM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "BOOKING_HOTEL_ROOM_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery('BOOKING_HOTEL_ROOM_REQUEST', bookingHotelRoom);
}
