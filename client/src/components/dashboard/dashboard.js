import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Spinner from '../layout/spinner';

function Dashboard() {
  const [Orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async function() {
      let response = await axios.get('/api/orders');
      setOrders(response.data);
      setLoading(false);
    })();
  }, []);

  let renderOrders = () =>
    Orders.map((order, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{order.menuId.foodName}</td>
          <td>{order.customerId.name}</td>
          <td>{order.customerId.email}</td>
          <td>{order.quantity}</td>
          <td>$ {order.quantity * order.menuId.price}</td>
          <td>{new Date(order.menuId.date).toDateString()}</td>
        </tr>
      );
    });

  if (Loading) {
    return <Spinner />;
  }

  return (
    <div style={{ textAlign: 'center', color: 'grey' }} className='mt-3'>
      <h1>All Orders</h1>
      <div className='card p-3 mt-5 flex-center'>
        {Orders.length ? (
          <table class='table table-bordered table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Food Name</th>
                <th scope='col'>Customer Name</th>
                <th scope='col'>Customer Email</th>
                <th scope='col'>Qty</th>
                <th scope='col'>Price</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        ) : (
          <h2>No Orders</h2>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
