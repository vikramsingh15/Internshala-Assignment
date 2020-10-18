import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MenuCard from './MenuCard';
import { addToCart, getCart } from '../../actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/spinner';


const Landing = ({ history }) => {
  const [Menu, setMenu] = useState([]);
  const [Loading, setLoading] = useState(true)
  let dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    if (authState.token) {
      dispatch(getCart());
    }
  }, [getCart]);

  useEffect(() => {
    (async function() {
      let response = await axios.get('/api/menu');
      setMenu(response.data);
      setLoading(false)
    })();
  }, [setMenu]);

  let CartHandler = item => {
    if (!authState.isAuthenticated) {
      dispatch(setAlert('Please login first!', 'danger'));
      history.push('/login');
    } else if (authState.user.typeAccess == 'user') {
      dispatch(
        setAlert(`${item.foodName} added to cart succesfully!`, 'success')
      );
      dispatch(addToCart(item));
    } else if (authState.user.typeAccess == 'restaurant') {
      dispatch(
        setAlert(`Please Login with user account to place order!`, 'danger')
      );
    }
  };

  if(Loading){
    return <Spinner/>
  }

  let renderMenu = () => {
    return Menu.map(menu => {
      return (
        <div className='col-12 col-md-4 mt-3'>
          <MenuCard menu={menu} CartHandler={CartHandler} />
        </div>
      );
    });
  };

  return <div className='row mt-4 mb-4'>{renderMenu()}</div>;
};

const mapStateToProps = state => ({ isAuth: state.auth.isAuthenticated });
export default connect(mapStateToProps)(Landing);
