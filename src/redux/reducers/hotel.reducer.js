const initialState = {
  hotelList: {
    data: [],
    page: 1,
    load: false,
    error: '',
  },
  hotelDetail: {
    data: {
      location: {},
      rooms: [],
      bookingRooms: [],
    },
    load: false,
    error: '',
  },
  locationList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_HOTEL_LIST_REQUEST': {
      return {
        ...state,
        hotelList: {
          ...state.hotelList,
          load: true,
        },
      }
    }
    case 'GET_HOTEL_LIST_SUCCESS': {
      const { data, page, more } = action.payload;
      if (more) {
        return {
          ...state,
          hotelList: {
            ...state.hotelList,
            data: [
              ...state.hotelList.data,
              ...data,
            ],
            page: page,
            load: false,
          },
        }
      } else {
        return {
          ...state,
          hotelList: {
            ...state.hotelList,
            data: data,
            page: page,
            load: false,
          },
        }
      }
    }
    case 'GET_HOTEL_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        hotelList: {
          ...state.hotelList,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_HOTEL_DETAIL_REQUEST': {
      return {
        ...state,
        hotelDetail: {
          ...state.hotelDetail,
          load: true,
        },
      }
    }
    case 'GET_HOTEL_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        hotelDetail: {
          ...state.hotelDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_HOTEL_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        hotelDetail: {
          ...state.hotelDetail,
          load: false,
          error: error,
        },
      }
    }
    case 'BOOKING_HOTEL_ROOM_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        hotelDetail: {
          ...state.hotelDetail,
          data: {
            ...state.hotelDetail.data,
            bookingRooms: [
              ...state.hotelDetail.data.bookingRooms,
              data,
            ]
          },
        },
      }
    }

    case 'GET_LOCATION_LIST_REQUEST': {
      return {
        ...state,
        locationList: {
          ...state.locationList,
          load: true,
        },
      }
    }
    case 'GET_LOCATION_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        locationList: {
          ...state.locationList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_LOCATION_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        locationList: {
          ...state.locationList,
          load: false,
          error: error,
        },
      }
    }
    default: {
      return state;
    }
  }
}
