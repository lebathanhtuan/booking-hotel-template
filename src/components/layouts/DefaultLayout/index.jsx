import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';

function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // if (!userInfo) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Component {...other} {...routeProps} />
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;
