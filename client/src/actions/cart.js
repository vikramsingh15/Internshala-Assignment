import axios from 'axios';
import { setAlert } from "./alert";
import history from '../history';


export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_CART = 'GET_CART';
export const ADD_ORDER = 'ADD_ORDER';

//logout user
export const getCart = () => async dispatch => {
  let response = await axios.get('/api/cart');
  dispatch({ type: GET_CART, cart: response.data });
};

export const addToCart = menuItem => async (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART, product: menuItem });
  let cart = getState().cart;
  await axios.put('/api/cart', cart);
};

export const removeFromCart = pId => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, pId });
  let cart = getState().cart;
  await axios.put('/api/cart', cart);
};

export const createOrder = () => async (dispatch, getState) => {
  let cart = getState().cart;

  await axios.put('/api/cart', { items: {}, totalAmount: 0 });
  await axios.post('/api/orders', cart);
  dispatch({ type: ADD_ORDER });

  history.push('/');

  dispatch(setAlert('We have received your order!!', 'success'));


};
