
import { useEffect, useState } from 'react';
import { Card, Radio, Button, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import history from '../../../utils/history';

import {
  getHotelDetailAction,
  bookingHotelRoomAction,
} from '../../../redux/actions';

function HotelDetailPage({
  hotelDetail,
  getHotelDetail,
  match,
  bookingHotelRoom,
}) {
  const hotelId = match.params.id;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [dateSelected, setDateSelected] = useState();

  useEffect(() => {
    getHotelDetail({ id: hotelId });
  }, []);
  
  function handleSelectedDate(value) {
    const [startDate, endDate] = value;
    setDateSelected([moment(startDate).format('YYYY/MM/DD'), moment(endDate).format('YYYY/MM/DD')]);
  }

  function handleBookingHotel(id) {
    if (!userInfo) {
      alert('Bạn cần đăng nhập!');
    } else if (!dateSelected) {
      alert('Cần chọn ngày đặt phòng!');
    } else {
      bookingHotelRoom({
        userId: userInfo.id,
        hotelId: parseInt(hotelId),
        roomId: id,
        startDate: dateSelected[0],
        endDate: dateSelected[1]
      })
      
    }
  }

  function renderHotelRooms() {
    return hotelDetail.data.rooms.map((roomItem, roomIndex) => {
      let isDisabled = false;
      if (dateSelected) (
        hotelDetail.data.bookingRooms.forEach((bookingItem, bookingIndex) => {
          if (
            (
              (
                moment(dateSelected[0], 'YYYY/MM/DD').unix() - moment(bookingItem.startDate, 'YYYY/MM/DD').unix() >= 0 &&
                moment(bookingItem.endDate, 'YYYY/MM/DD').unix() - moment(dateSelected[1], 'YYYY/MM/DD').unix() >= 0
              ) || (
                moment(dateSelected[1], 'YYYY/MM/DD').unix() - moment(bookingItem.startDate, 'YYYY/MM/DD').unix() > 0 &&
                moment(bookingItem.startDate, 'YYYY/MM/DD').unix() - moment(dateSelected[0], 'YYYY/MM/DD').unix() > 0
              ) || (
                moment(bookingItem.endDate, 'YYYY/MM/DD').unix() - moment(dateSelected[0], 'YYYY/MM/DD').unix() > 0 &&
                moment(dateSelected[1], 'YYYY/MM/DD').unix() - moment(bookingItem.endDate, 'YYYY/MM/DD').unix() > 0
              )
            ) && bookingItem.roomId === roomItem.id
          ) {
            isDisabled = true;
          }
        })
      )
      console.log('🚀 ~ file: index.jsx ~ line 55 ~ returnhotelDetail.data.rooms.map ~ isDisabled', isDisabled);
      return (
        <Card>
          {isDisabled && (
            <p>Hết phòng</p>
          )}
          <p>Tên phòng: {roomItem.title}</p>
          <p>Giá phòng: {roomItem.price.toLocaleString()}</p>
          {!isDisabled && (
            <Button onClick={() => handleBookingHotel(roomItem.id)}>Đặt phòng</Button>
          )}
        </Card>
      )
    })
  }

  return (
    <Card title={hotelDetail.data.name}>
      <DatePicker.RangePicker onChange={(value) => handleSelectedDate(value)} />
      <p>Vị trí: {hotelDetail.data.location.name}</p>
      {renderHotelRooms()}
    </Card>
  );
}

const mapStateToProps = (state) => {
  const { hotelDetail } = state.hotelReducer;
  console.log('🚀 ~ file: index.jsx ~ line 99 ~ mapStateToProps ~ hotelDetail', hotelDetail);
  return {
    hotelDetail,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelDetail: (params) => dispatch(getHotelDetailAction(params)),
    bookingHotelRoom: (params) => dispatch(bookingHotelRoomAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetailPage);
