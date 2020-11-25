import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile, USER_UPDATE_PROFILE_RESET } from '../actions/userActions';
// import { listMyOrders } from '../actions/orderActions';


const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // const orderListMy = useSelector(state => state.orderListMy);
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    // user is not signed in
    if (!userInfo) {
      history.push('/login');
    } else {
      // we are checking for the name
      // if no user name
      if (!user.name || success) {
        // first, reset to empty object to start fresh
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        // Second, get fresh user data
        dispatch(getUserDetails('profile')); // string value - api/users/${user}
        // dispatch(listMyOrders());
      } else {
        // if we do have a user, set the form fields
        setName(user.name);
        setEmail(user.email);
      }
    }
    // success to apply updates 
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // passing user object to update
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated!</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>

      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
