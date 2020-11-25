import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../actions/cartActions';
import DisplayMessage from '../components/Message';
const CartScreen = ({ match, location, history }) => {
  
  // to get product id
  const productId = match.params.id;

  // to get the 'items quantity' from the url
  // location.search to get 'query string' of '?qty=1' from url - item quantity param
  // but we don't want whole string query, we want the quantity number only - 1
  // Now, check to see if there's a quantity value like '1, 2, 3 items' in '?qty=',
  // if so we only want the value/number
  // split('=') will set an array with '?qty=' as the first index - 0 index,
  // 'value' as 1 index, items quantity value '1, 2, 3' & we want the 1 index, numeric value
  const qty = location.search ? Number(location.search.split('=')[1]) : 1; 
  // else the quantity would be 1 - default value
  // wrap it with Number func to get numeric values
  // console.log(qty)

  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  // Now, we want to get those items in local storage to put them in our cart
  // useSelector hook to get access to cart state in redux store
  // naming same as our 'cart' state in combineReducers - key
  // this hook takes an arrow func with arg state & which part of state we want from combineReducers
  const cart = useSelector(state => state.cart);
 
  // destructuring particular object properties from cart state in redux store
  // to display in our component
  const { cartItems } = cart;
  

  // dispatching action creator to make api request 
  useEffect(() => {
    // we only want to dispatch this if we have productId 
    // but if we just go to cart page with no id, we don't want to dispatch
    if (productId) {
      // passing params values
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    // if user is not logged in, direct user to login
    // if logged in, direct user to shipping
    history.push('/login?redirect=shipping')
  }
  
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/** Check to see if there's items in our cart */}
        {cartItems.length === 0 ? (
          <DisplayMessage>
            Your cart is empty <Link to='/'>Go Back</Link>
          </DisplayMessage>
        ) : (
          // if we have items, display it 
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>

                    {/** Changing quantity within the cart & update the state */}
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/** 
                // The reduce() method executes a reducer function (that you provide) on each element of the array, 
                // resulting in single output value.
                const array1 = [1, 2, 3, 4];
                const reducer = (accumulator, currentValue) => accumulator + currentValue;

                // 1 + 2 + 3 + 4
                console.log(array1.reduce(reducer));
                // expected output: 10

                // To display total items quantity. 
                // Using 'reduce' array method with args accumulator & current item to add values
                // We want to take an accumulator & just add current item. 
                // On second arg is where we want accumulator to start - 0 
              */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>

              {/** here we have price & quantity together 
                // using reduce fun, passing accumulator & current item 
                // taking accumulator & add item.qty & multiply that by the price
                // starting for the accumulator is 0
                // toFixed(2) - price value to be two decimals 
              */}
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
