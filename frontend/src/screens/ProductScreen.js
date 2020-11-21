import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';

const ProductScreen = ({ match, history }) => {
  // component states
  const [quantity, setQuantity] = useState(0);

  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  // useSelector hook to get access to productDetail state in redux store
  // naming same as our 'productDetail' state in combineReducers - key
  // this hook takes an arrow func with arg state & which part of state we want from combineReducers
  const productDetails = useSelector(state => state.productDetails); // must pass a selector to useSelector

  // destructuring particular object properties from productDetail state in redux store
  // to display in our component
  const { product, loading, error } = productDetails;

  // dispatching action creator to make api request when component renders
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  // add to cart button
  const addToCartHandler = () => {
    // adding query string of ?qty=
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }

  // match id param & find that product
  // The find() method returns the value of the FIRST element in the provided array
  // that satisfies the provided testing function
  // const array1 = [5, 12, 8, 130, 44];
  // const found = array1.find(element => element > 10);
  // console.log(found);
  // expected output: 12
  // const product = products.find(product => product._id === match.params.id);

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {/** if loading, display loader,
          else if there is an error, display error component,
          else display row with our data
      */}
      {loading ? (
        <Loader />
      ) : error ? (
        <DisplayMessage variant='danger'>{error}</DisplayMessage>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: ${product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {/** This is like if statement, if condition met, render this
                  which can also be done with ternary operator like below, same thing
                  product.countInStock > 0 ? (render this) : null;
                */}
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        >
                          {/** The keys() method returns a new Array Iterator object 
                            that contains the keys for each index in the array. 
                            Here, using spread operator with Array constructor & accessing
                            countInStock in product to get keys from it. Let's say product count
                            in stock is 5, then we want to create an array of [0,1,2,3,4]
                          */}

                          {[...Array(product.countInStock).keys()].map(
                            count => (
                              // an array starts at 0, we do 'count + 1' to get values from 1 - 5 
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ProductScreen;
