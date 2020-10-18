import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import requireAuth from "../unProtectedRoute";
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    typeAccess: 'restaurant'
  });

  const { name, email, password,typeAccess } = formData;
  const change = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData)

  const submit = async e => {
    e.preventDefault();
    if (password.length < 4) {
      setAlert('Password length is less than 4', 'danger');
    } else {
      register({ name, email, password, typeAccess });
    }
  };

  return (
    <Fragment>
      <h1 className='large text-secondary mt-3' style={{ textAlign: 'center' }}>
        Restaurant Sign Up
      </h1>
      <div className='card container mt-5 form-card'>
        <h2 className='lead'>
          <i className='fas fa-user' /> Create Your Account
        </h2>
        <form className='form' onSubmit={e => submit(e)}>
          <div className='form-group'>
            <input
              value={name}
              onChange={e => change(e)}
              type='text'
              placeholder='* Name'
              name='name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              value={email}
              onChange={e => change(e)}
              type='email'
              placeholder='* Email Address'
              name='email'
              required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              value={password}
              onChange={e => change(e)}
              type='password'
              placeholder='* Password'
              name='password'
              minLength='4'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(requireAuth(Register));
