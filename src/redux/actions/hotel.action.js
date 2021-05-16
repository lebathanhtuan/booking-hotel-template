export function getHotelListAction(params) {
  return {
    type: 'GET_HOTEL_LIST_REQUEST',
    payload: params,
  }
}

export function getHotelDetailAction(params) {
  return {
    type: 'GET_HOTEL_DETAIL_REQUEST',
    payload: params,
  }
}

export function getLocationListAction(params) {
  return {
    type: 'GET_LOCATION_LIST_REQUEST',
    payload: params,
  }
}
