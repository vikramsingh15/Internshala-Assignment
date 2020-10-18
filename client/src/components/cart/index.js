import React, { useEffect, useState } from 'react';
import Item from './Item';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCart,
  addToCart,
  removeFromCart,
  createOrder
} from '../../actions/cart';
import { Link } from 'react-router-dom';
import Spinner from '../layout/spinner';

function Index({ history }) {
  let dispatch = useDispatch();
  let cart = useSelector(state => state.cart);
  let totalAmount = cart.totalAmount;
  const [Loading, setLoading] = useState(true);

  cart = Object.values(cart.items);

  let AddToCartHandler = item => {
    dispatch(addToCart(item));
  };
  let RemoveCartHandler = item => {
    dispatch(removeFromCart(item._id));
  };

  let createOrderHandler = () => {
    setLoading(true);
    dispatch(createOrder());
    setLoading(false);
    // history.push('/');
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getCart());
    setLoading(false);
  }, [getCart]);

  let renderItems = () =>
    cart.map(item => {
      return (
        <div key={item._id}>
          <Item
            item={item}
            AddToCartHandler={AddToCartHandler}
            RemoveCartHandler={RemoveCartHandler}
          />
          <hr />
        </div>
      );
    });

  if (Loading) {
    return <Spinner />;
  }

  return (
    <div className='container mt-5'>
      <div className='card shopping-cart'>
        <div className='card-header bg-dark text-light place-order '>
          <div>
            <i className='fa fa-shopping-cart' aria-hidden='true'></i> Food cart
          </div>

          {totalAmount <= 0 ? null : <div>Total Amount : $ {totalAmount}</div>}

          {cart.length ? (
            <div>
              <Link
                to='#/'
                className='btn btn-outline-info btn-sm '
                onClick={createOrderHandler}
              >
                Place Order
              </Link>
            </div>
          ) : null}
        </div>
        <div className='card-body'>
          {cart.length ? renderItems() : <div>Oops Your Cart Is Empty</div>}
        </div>
      </div>
    </div>
  );
}

export default Index;
