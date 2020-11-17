import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap';


import Rating from '../components/Rating';
const ProductScreen = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({}); 

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:7000/api/products/${id}`);
      setProduct(data)
    }
    fetchProduct()
  }, [id])

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
              <ListGroupItem>
                <Button
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
    </Fragment>
  );
};

export default ProductScreen;
