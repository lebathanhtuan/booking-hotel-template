import { Route, Redirect } from 'react-router-dom';

function LoginLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.role === 'user') {
      return <Redirect to="/" />;
    }
    if (userInfo.role === 'admin') {
      return <Redirect to="/admin/products" />;
    }
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return <Component {...other} {...routeProps} />
      }}
    />
  );
}

export default LoginLayout;
