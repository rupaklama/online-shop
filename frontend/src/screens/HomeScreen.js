import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import DisplayMessage from '../components/DisplayMessage';
const HomeScreen = () => {
  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  // useSelector hook to get access to productList state in redux store
  // naming same as our 'productList' state in combineReducers - key
  // this hook takes an arrow func with arg state & which part of state we want from combineReducers
  const productList = useSelector(state => state.productList); // must pass a selector to useSelector

  // destructuring particular object properties from productList state in redux store
  // to display in our component
  const { loading, error, products } = productList;

  // dispatching action creator to make api request when component renders
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Latest Products</h1>

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
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default HomeScreen;
