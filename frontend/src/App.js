import React from 'react';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/login' element={<LoginScreen/>} index />
              <Route path='/' element={<HomeScreen/>} index />
              <Route path='/product/:id' element={<ProductScreen/>} />
              <Route path='/cart/'>
                <Route index element={<CartScreen/>} />
                <Route path=':id' element={<CartScreen/>} />

              </Route>
            </Routes>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;