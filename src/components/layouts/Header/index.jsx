import { connect } from 'react-redux';
import { Space, Button } from 'antd';

import history from '../../../utils/history';

function Header({ userInfo }) {
  return (
    <div>
      {userInfo.data.id 
        ? (
          <Space>
            <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
            <Button>Đăng xuất</Button>
          </Space>
        )
        : (
          <Space size={32}>
            <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
          </Space>
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo,
  }
};

export default connect(mapStateToProps)(Header);
