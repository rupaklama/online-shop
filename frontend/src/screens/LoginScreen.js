import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  // console.log(location)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useDispatch hook to dispatch an action creator
  const dispatch = useDispatch();

  // useSelector hook to get access to userLogin state in redux store
  // naming same as our 'userLogin' state in combineReducers - key
  // this hook takes an arrow func with arg state & which part of state we want from combineReducers
  const userLogin = useSelector(state => state.userLogin) 

  // destructuring particular object properties from userLogin state in redux store
  // to display in our component
  const { loading, error, userInfo } = userLogin;
  
  // redirect url
  // location.search to get query string of '?' from url
  // split('=') will set an array with '?' as the first index - 0 index,
  // 'value' as 1 index, we want the 1 index which is value of right hand side of '='
  const redirect = location.search ? location.search.split('=')[1] : '/'; // value after '='
  
  // redirect if user is already logged in
  useEffect(() => {
    // userInfo will be null if we are not logged in 
    // if user exists
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = e => {
    e.preventDefault();
    // dispatching action creator with args as our state values
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      { error && <Message variant='danger'>{error}</Message> }
      { loading && <Loader /> }

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
