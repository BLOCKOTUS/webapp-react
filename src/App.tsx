import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux'

import initializeStore from './store'
import Accounts from './views/accounts';
import Home from './views/home';
import Kyc from './views/kyc';
import Login from './views/login';
import Register from './views/register';

import './App.css';

export default function App() {

  const store = initializeStore();

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/accounts">
              <Accounts />
            </Route>
            <Route path="/kyc">
              <Kyc />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
;}
