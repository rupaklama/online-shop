import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const App = () => {
  return (
    // '/cart/:id?' - adding '?' to make 'id' to be optional
    // because when we go to '/cart/' , its not going to have an id in it,
    // so making id optional
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/' component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
