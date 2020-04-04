import React, { createContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import { AuthProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';

function App() {
  const user = {name: 'Rahul Biswas', email: 'rbiswas596@gmail.com'}
  return (
    <div>
      <AuthProvider value={user.name}>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
            </Route>
            <PrivateRoute path="/shipment">
                <Shipment></Shipment>
            </PrivateRoute>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
