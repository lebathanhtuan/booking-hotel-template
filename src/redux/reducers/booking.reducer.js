const initialState = {
  bookingRooms: {
    data: [],
    load: false,
    error: '',
  },
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOOKING_HOTEL_ROOM_REQUEST': {
      const { carts } = action.payload;
      return {
        ...state,
        bookingRooms: {
          ...state.bookingRooms,
          data: carts,
          load: false,
        },
      }
    }
    default: {
      return state;
    }
  }
}
