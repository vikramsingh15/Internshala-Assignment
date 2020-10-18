import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, qty }) => {
  let authLink;
  if (user && user.typeAccess == 'restaurant') {
    authLink = (
      <Fragment>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Orders/Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to='/create-menu'>
            <i className='fas fa-utensil-spoon' />{' '}
            <span className='hide-sm'>Add Food</span>
          </Link>
        </li>

        <li onClick={() => logout()}>
          <a href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </Fragment>
    );
  }
  if (user && user.typeAccess == 'user') {
    authLink = (
      <Fragment>
        <li>
          <Link to='/user/user-cart'>
            <span className='cart-icon'>
              <span className='cartQty'>
                <p>{qty}</p>
              </span>
              <i className='fas fa-cart-plus' />{' '}
            </span>
            <span className='hide-sm'>Cart</span>
          </Link>
        </li>

        <li onClick={() => logout()}>
          <a href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </Fragment>
    );
  }

  const guestLink = (
    <Fragment>
      <li>
        <Link to='/register'>
          <i className='fas fa-user-plus' /> Register
        </Link>
      </li>
      <li>
        <Link to='/register/restaurant'>
          <i className='fas fa-user-tie' /> Restaurant Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt' /> Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-dark' id='navbar'>
      <h1>
        {' '}
        <Link to='/'>
          <i className='fas fa-utensils' /> Home
        </Link>
      </h1>
      <ul>{!loading && (isAuthenticated ? authLink : guestLink)}</ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth, qty: state.cart.totalQty };
};

export default connect(mapStateToProps, { logout })(Navbar);
