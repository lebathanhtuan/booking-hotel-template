import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getHotelListSaga(action) {
  try {
    const { more, page, limit, locationId } = action.payload;
    console.log('🚀 ~ file: hotel.saga.js ~ line 7 ~ function*getHotelListSaga ~ locationId', locationId);
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/hotels',
      params: {
        _page: page,
        _limit: limit,
        ...locationId && { locationId },
        // ...searchKey && { q: searchKey },
        // _sort: 'price',
        // _order: 'desc',
      }
    });
    yield put({
      type: "GET_HOTEL_LIST_SUCCESS",
      payload: {
        data: result.data,
        page,
        more,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_HOTEL_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getHotelDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/hotels/${id}?_embed=rooms&_embed=bookingRooms&_expand=location`,
    });
    yield put({
      type: "GET_HOTEL_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_HOTEL_DETAIL_FAIL", message: e.message});
  }
}

function* getLocationListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/locations',
    });
    yield put({
      type: "GET_LOCATION_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_LOCATION_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* hotelSaga() {
  yield takeEvery('GET_HOTEL_LIST_REQUEST', getHotelListSaga);
  yield takeEvery('GET_HOTEL_DETAIL_REQUEST', getHotelDetailSaga);
  yield takeEvery('GET_LOCATION_LIST_REQUEST', getLocationListSaga);
}
