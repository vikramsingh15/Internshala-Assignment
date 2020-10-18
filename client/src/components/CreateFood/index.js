import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  let dispatch = useDispatch();
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    foodCategory: '',
    image: '',
    price: null
  });

  const { foodName, description, foodCategory, image, price } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/menu', formData);
    dispatch(setAlert('Food Item created successfully !', 'success'));
    history.push('/');
  };
  return (
    <Fragment>
      <h1 className='large text-secondary' style={{ textAlign: 'center' }}>
        Create Food Item
      </h1>
      <div className='card container mt-5 form-card'>
        <p className='lead'>
          <i className='fas fa-utensils' /> Add the details of food
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              onChange={e => onChange(e)}
              type='text'
              placeholder='Name of Food Item'
              name='foodName'
              value={foodName}
              required
            />
          </div>

          <div className='form-group'>
            <input
              onChange={e => onChange(e)}
              type='url'
              placeholder='image url of food item'
              name='image'
              value={image}
              required
            />
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <select
                  id='inputState'
                  className='form-control'
                  name='foodCategory'
                  value={foodCategory}
                  onChange={e => onChange(e)}
                >
                  <option selected>Food Category</option>
                  <option>Vegetarian</option>
                  <option>Non Vegetarian</option>
                </select>
              </div>

              <div className='col-12 col-md-6'>
                <input
                  onChange={e => onChange(e)}
                  type='number'
                  placeholder='Price'
                  name='price'
                  value={price}
                  min='0'
                  step='1'
                  oninput="validity.valid||(value='');"
                  required
                />
              </div>
            </div>
          </div>

          <div class='form-group'>
            <label for='description'>Food Description</label>
            <textarea
              class='form-control'
              id='description'
              rows='2'
              onChange={e => onChange(e)}
              placeholder='Food description'
              name='description'
              value={description}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired
};
export default Login;
