import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/cartActions';

// initial/current state of cart reducer
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // this is going to be tricky like if an item is already exists
      // So, we are going to put payload in a variable
      // and this payload has data related to the product
      const currentItem = action.payload; 

      // The find() method returns the value of the FIRST element in the provided array
      // that satisfies the provided testing function
      // const array1 = [5, 12, 8, 130, 44];
      // const found = array1.find(element => element > 10);
      // console.log(found);
      // expected output: 12

      // let's find if item is already exists in cardItems 
      const existItem = state.cardItems.find(item => item.id === currentItem.id);

      if (existItem) {
        return {
          ...state, 
          cartItems: state.cartItems.map(item => item.id === existItem.id ? currentItem : item)
        }
      } else {
        // if it doesn't exists, we will push it in array in our state
        return {
          ...state,
          cartItems: [...state.cardItems, currentItem]
        }
      }

    default:
      return state;
  }
};
