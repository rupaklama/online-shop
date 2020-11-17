import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/product/:id' component={ProductScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
