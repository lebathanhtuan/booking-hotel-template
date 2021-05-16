import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Button } from 'antd';

import history from '../../../utils/history';

import { getLocationListAction, getHotelListAction } from '../../../redux/actions';

function HotelListPage({
  getLocationList,
  getHotelList,
  locationList,
  hotelList,
}) {
  const [locationSelected, setLocationSelected] = useState(undefined);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    getLocationList();
    getHotelList({
      page: 1,
      limit: 4,
    });
  }, []);

  function handleFilterLocation(id) {
    setLocationSelected(id);
    // setPage(1);
    getHotelList({
      page: 1,
      limit: 4,
      locationId: id,
    });
  }

  function handleShowMore() {
    // setPage(page + 1);
    getHotelList({
      more: true,
      // page: page + 1,
      page: hotelList.page + 1,
      limit: 4,
      locationId: locationSelected,
    });
  }

  function renderProductList() {
    if (hotelList.load) return <p>Loading...</p>;
    return hotelList.data.map((hotelItem, hotelIndex) => {
      return (
        <Col span={24}>
          <Card
            size="small"
            title={hotelItem.name}
            onClick={() => history.push(`/hotel/${hotelItem.id}`)}
          >
            <p>{hotelItem.name}</p>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Row gutter={16} style={{ padding: '0 16px' }}>
      <Col span={4}>
        <List
          size="small"
          header={<div>Địa điểm</div>}
          bordered
          dataSource={[
            { name: 'Tất cả' },
            ...locationList.data,
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleFilterLocation(item.id)}
              style={{ color: locationSelected === item.id ? 'red': 'black' }}
            >
              {item.name}
            </List.Item>
          )}
        />
      </Col>
      <Col span={20}>
        <Row gutter={[8, 8]} style={{ marginBottom: 8 }}>
          {renderProductList()}
        </Row>
        {hotelList.data.length % 4 === 0 && (
          <Row justify="center">
            <Button onClick={() => handleShowMore()}>Show more</Button>
          </Row>
        )}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  console.log('🚀 ~ file: index.jsx ~ line 100 ~ mapStateToProps ~ state', state);
  const { locationList, hotelList } = state.hotelReducer;
  return {
    locationList,
    hotelList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelList: (params) => dispatch(getHotelListAction(params)),
    getLocationList: (params) => dispatch(getLocationListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelListPage);
