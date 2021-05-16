import { Router, Switch } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';
import PrivateLayout from './components/layouts/PrivateLayout';

import UserHotelListPage from './pages/user/HotelList';
import UserHotelDetailPage from './pages/user/HotelDetail';
import UserCartListPage from './pages/user/CartList';

import AdminHotelListPage from './pages/admin/ProductList';

import LoginPage from './pages/Login';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={UserHotelListPage} />
        <DefaultLayout exact path="/hotel/:id" component={UserHotelDetailPage} />
        <DefaultLayout exact path="/carts" component={UserCartListPage} />
        <PrivateLayout exact path="/admin/hotels" component={AdminHotelListPage} />
        <LoginLayout exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
