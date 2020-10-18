import React from 'react';
import { Link } from "react-router-dom";


function MenuCard({ menu, CartHandler }) {
  return (
    <div className='card'>
      <img src={menu.image} className='card-img-top' alt={menu.foodName} />
      <div className='card-body'>
        <h5 className='card-title primary-color'>{menu.foodName}</h5>
        <p className='card-text'>{menu.description}</p>
        <div className='u-d-flex'>
          <Link
            href='/#'
            className='btn btn-warning'
            onClick={() => CartHandler(menu)}
          >
            <i className='fas fa-shopping-cart' /> Add To Cart
          </Link>
          <div style={{ color: 'grey' }}>Price: $ {menu.price}</div>
        </div>
      </div>
    </div>
  );
}
export default MenuCard;
