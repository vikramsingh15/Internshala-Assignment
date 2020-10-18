import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART } from '../actions/cart';
import Cart from '../models/cartItem';
import { ADD_ORDER } from '../actions/cart';

let INITIAL_STATE = {
  items: {},
  totalAmount: 0,
  totalQty: 0
};

function cart(state = INITIAL_STATE, action) {
  let { items } = state;
  let { product, type, pId } = action;
  let newOrUpdateProd;

  switch (type) {
    case GET_CART:
      return action.cart;

    case ADD_TO_CART:
      //check whether item exists in state
      let item = items[product._id];

      if (item) {
        //yes
        newOrUpdateProd = { ...item };
        //add qty
        newOrUpdateProd.quantity += 1;
        //add price
        newOrUpdateProd.sum += item.price;
      } else {
        let { price, foodName, _id, image, restaurantId } = product;
        //add new product
        newOrUpdateProd = new Cart(
          1,
          price,
          foodName,
          price,
          _id,
          image,
          restaurantId
        );
      }
      //add totalAmount;
      return {
        ...state,
        items: { ...state.items, [newOrUpdateProd._id]: newOrUpdateProd },
        totalAmount: state.totalAmount + product.price,
        totalQty: state.totalQty + 1
      };

    case REMOVE_FROM_CART:
      let cartItem = items[pId];
      let updatedItems;
      if (cartItem.quantity > 1) {
        newOrUpdateProd = { ...cartItem };
        newOrUpdateProd.quantity -= 1;
        newOrUpdateProd.sum -= cartItem.price;
        updatedItems = { ...items, [pId]: newOrUpdateProd };
      } else {
        updatedItems = { ...items };
        delete updatedItems[pId];
      }

      return {
        ...state,
        items: { ...updatedItems },
        totalAmount: state.totalAmount - cartItem.price,
        totalQty: state.totalQty - 1
      };
    case ADD_ORDER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default cart;
