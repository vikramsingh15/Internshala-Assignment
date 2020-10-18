import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';

//get user data
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get('/api/auth/account-detail');
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (err) {
    if (!localStorage.token) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

//register user
export const register = formData => async dispatch => {
  try {
    const response = await axios.post('/api/auth/register', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    dispatch(loadUser());
    if (formData.typeAccess == 'user') {
      history.push('/');
    } else {
      history.push('/dashboard');
    }
  } catch (err) {
    errorHandler(err, REGISTER_FAIL, dispatch);
  }
};

//login user
export const login = formData => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/auth/login', formData);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
    // history.push('/dashboard');
  } catch (err) {
    errorHandler(err, LOGIN_FAIL, dispatch);
  }
};

//logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  history.push('/');
};

//error handler
function errorHandler(err, type, dispatch) {
  const errors = err.response.data.errors;
  if (errors) {
    errors.forEach(error => {
      dispatch(setAlert(error.msg, 'danger'));
    });
    dispatch({ type });
  }
}
