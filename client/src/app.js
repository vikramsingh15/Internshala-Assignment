import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { connect } from 'react-redux';
import PrivateRoute from './routes/privateRoute';
import history from './history';
import './app.css';

import Navbar from './components/layout/navbar';
import Landing from './components/landingPage/index';
import Login from './components/auth/login';
import Register from './components/auth/register';
import RestaurantRegister from './components/auth/restaurantRegister';
import Dashboard from './components/dashboard/dashboard';
import Alert from './components/layout/alert';
import CartScreen from './components/cart/index';
import CreateFood from './components/CreateFood/index';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router history={history}>
      <Navbar />

      <div className='container'>
        <Alert />
        <Switch>
          <Route exact path='/' component={Landing} />

          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route
            exact
            path='/register/restaurant'
            component={RestaurantRegister}
          />

          <PrivateRoute exact path='/user/user-cart' component={CartScreen} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-menu' component={CreateFood} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, { loadUser })(App);
