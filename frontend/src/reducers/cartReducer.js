import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/cartActions';

// initial/current state of cart reducer
// cartItems:[] - adding 'cartItems property' into our state to add items into our cart

// other way of declaring initial state with object property 
// All uppercase is to signify this is 'true constant', we should never change its value
const INITIAL_STATE = {
  cartItems: [], 
}
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // this is going to be tricky like if an item is already exists in our CART
      // So, we are going to put payload in a variable
      // and this payload has data related to the product
      const currentItem = action.payload; // new item

      // The find() method returns the value of the FIRST element in the provided array
      // that satisfies the provided testing function
      // const array1 = [5, 12, 8, 130, 44];
      // const found = array1.find(element => element > 10);
      // console.log(found);
      // expected output: 12

      // let's find if item is already exists in our CART
      const existItem = state.cartItems.find(item => item.id === currentItem.id);

      if (existItem) {
        return {
          ...state, 
          // mapping through current items 
          // if current item's id === existItem's id, then return currentItem
          cartItems: state.cartItems.map(item => item.id === existItem.id ? currentItem : item)
        }
      } else {
        // if it doesn't exists, we will push/add it in array - cartItems 
        return {
          ...state,
          cartItems: [...state.cartItems, currentItem]
        }
      }
    
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter( item => item.id !== action.payload)
      }
    default:
      return state;
  }
};
