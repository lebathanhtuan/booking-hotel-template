import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, Card, InputNumber , Button } from 'antd';

import history from '../../../utils/history';

function CartListPage({
  getCartList,
  cartList
}) {
  let totalPrice = 0;

  function renderCartList(params) {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = cartItem.option.id
        ? totalPrice + (cartItem.price + cartItem.option.price) * cartItem.count
        : totalPrice + cartItem.price * cartItem.count;
      return (
        <Card>
          <Space size={32}>
            <p>{cartItem.name}</p>
            {cartItem.option.id && (
              <p>{cartItem.option.title}</p>
            )}
            <p>{(cartItem.price + (cartItem.option.id ? cartItem.option.price : 0)).toLocaleString() + ' VND'}</p>
            <InputNumber value={cartItem.count} />
          </Space>
        </Card>
      )
    })
  }

  return (
    <div>
      {renderCartList()}
      <p>Total: {totalPrice.toLocaleString() + ' VND'}</p>
      <Button>Thanh Toán</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListPage);
