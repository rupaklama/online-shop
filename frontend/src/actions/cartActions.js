import axios from 'axios';

// action types
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

// params - id & qty
// getState - to access our global state in redux store
export const addToCart = (id, qty) => async(dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:7000/api/products/${id}`)

  // we want to display this data in cart page
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

  // once we dispatch it, we want to save it in local storage
  // Now we want to save entire cart in our local storage, 
  // this is where we use 'getState' to access 'cart' state & store in local storage
  // NOTE: TO PERSIST DATA & we can only store JSON strings in local storage
  localStorage.setItem('cardItems', JSON.stringify(getState().cart.cartItems))

  // NOTE: To get cart data from local storage, 
  // we need to set it as current state in our Redux Store in store.js 
}
  
// to remove item from cart, takes param id
// Dispatching to our reducer & also getState - to get all our items in cart
// so that we can reset our local storage to whatever in the cart minus 
// what we removed from it to PERSIST DATA
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch( {
    type: CART_REMOVE_ITEM,
    payload: id
  })

  // after dispatching, reset items data in local storage to PERSIST DATA
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
  
