import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavList from './ui/navlist';
import BackwardButton from './ui/backward-button';

import './App.css';

export default function App() {

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
}

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
}

const Register = (): ReactElement => {
  return (
    <div>
      <h2>Register</h2>
      <BackwardButton />
    </div>
  );
}

const Login = (): ReactElement => {
  return (
    <div>
      <h2>Login</h2>
      <BackwardButton />
    </div>
  );
}

const Accounts = (): ReactElement => {
  return (
    <div>
      <h2>Accounts</h2>
      <BackwardButton />
    </div>
  );
}

const Kyc = (): ReactElement => {
  return (
    <div>
      <h2>KYC</h2>
      <BackwardButton />
    </div>
  );
}