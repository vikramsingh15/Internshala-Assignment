import React from 'react';
import { Link } from 'react-router-dom';

function Item({ item, AddToCartHandler, RemoveCartHandler }) {
  return (
    <div className='row'>
      <div className='col-12 col-md-2 text-center flex-center ml-3 ml-md-0'>
        <img
          className='img-responsive'
          src={item.image}
          alt='prewiew'
          width='120'
          height='80'
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className='col-12 text-sm-center text-md-left col-md-4 flex-center cart-item ml-3 ml-md-0'>
        <div>
          <h4 className='product-name lead'>
            <strong>{item.productTitle}</strong>
          </h4>
        </div>
      </div>
      <div className='col-12 text-sm-center col-md-2 text-md-right row flex-center ml-3 ml-md-0'>
        <div
          className='text-md-right tex-sm-center '
          style={{ paddingTop: '5px' }}
        >
          <div>
            <strong className='text-danger'>
              Total price : <span className='text-danger '>$ {item.sum}</span>
            </strong>
          </div>
        </div>
      </div>
      <div className='col-md-4 col-12 flex-center cart-item'>
        <div className='action'>
          <div className='minus'>
            <Link to='#/' onClick={() => RemoveCartHandler(item)}>
              <i className='fas fa-minus' />
            </Link>
          </div>

          <div className='qty'>{item.quantity}</div>
          <div className='plus'>
            <Link to='#/' onClick={() => AddToCartHandler(item)}>
              <i className='fas fa-plus' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
