import React from 'react';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/admin/orderlist' element={<OrderListScreen/>} />
              <Route path='/admin/userlist' element={<UserListScreen/>} />
              <Route path='/admin/productlist' element={<ProductListScreen/>} />
              <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>} />
              
              <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
              <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
              
              <Route path='/placeorder' element={<PlaceOrderScreen/>} />
              <Route path='/payment' element={<PaymentScreen/>} />
              <Route path='/shipping' element={<ShippingScreen/>} />
              <Route path='/profile' element={<ProfileScreen/>} />
              <Route path='/register' element={<RegisterScreen/>} />
              <Route path='/login' element={<LoginScreen/>} />
              
              <Route path='/search/:keyword' element={<HomeScreen/>}/>
              <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
              <Route path='/' element={<HomeScreen/>} index/>
              <Route path='/page/:pageNumber' element={<HomeScreen/>} />
              
              <Route path='/product/:id' element={<ProductScreen/>} />
              <Route path='/order/:id' element={<OrderScreen/>} />
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