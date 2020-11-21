import axios from 'axios';

// action types
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

// params - id & qty
// getState - to access our global state in redux store
export const addToCart = (id, qty) => async(dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:7000/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty
    }
  })

  // one we dispatch it, we want to save it local storage
  // we want to save entire cart, we are going to use getState for that purpose
  // to access 'cart' state in redux store. 
  // NOTE: we can only store JSON in local storage
  localStorage.setItem('cardItems', JSON.stringify(getState().cart.cartItems))
}
