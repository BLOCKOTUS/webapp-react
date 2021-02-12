import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux'

import initializeStore from './store'
import BackwardButton from './ui/backward-button';
import LoginForm from './ui/login-form';
import NavList from './ui/navlist';
import RegisterForm from './ui/register-form';
import Kyc from './views/kyc';


import type { ReactElement } from 'react';

import './App.css';

export default function App() {

  const store = initializeStore();
  
  return (
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
  );
;}

const Home = (): ReactElement => {
  const navItems = [
    { label: 'Register', to: '/register' },
    { label: 'Login', to: '/login' },
    { label: 'Manage accounts', to: '/accounts' },
    { label: 'KYC', to: '/kyc' },
    { label: 'Test DID Url', to: '/' },
  ];
  
  return (
    <div>
      <h2>Home</h2>
      <NavList items={navItems} />
    </div>
  );
};

const Register = (): ReactElement => {
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm />
      <BackwardButton />
    </div>
  );
};

const Login = (): ReactElement => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <BackwardButton />
    </div>
  );
};

const Accounts = (): ReactElement => {
  return (
    <div>
      <h2>Accounts</h2>
      <BackwardButton />
    </div>
  );
};
