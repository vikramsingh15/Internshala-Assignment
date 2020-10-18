import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import requireAuth from '../unProtectedRoute';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Fragment>
      <h1 className='large text-secondary' style={{ textAlign: 'center' }}>
        Sign In user/Restaurant
      </h1>
      <div className='card container mt-5 form-card'>
        <p className='lead'>
          <i className='fas fa-user' /> Sign into Your Account
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              onChange={e => onChange(e)}
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              required
            />
          </div>
          <div className='form-group'>
            <input
              onChange={e => onChange(e)}
              type='password'
              placeholder='Password'
              name='password'
              value={password}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired
};
export default connect(null, { login })(requireAuth(Login));
