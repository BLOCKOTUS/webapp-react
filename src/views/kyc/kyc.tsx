import {
  Switch,
  Route,
} from "react-router-dom";

import ButtonBack from '../../ui/button-back';
import FormCreateIdentity from '../../ui/form-create-identity';
import NavList from '../../ui/navlist';

import type { ReactElement } from 'react';


const Kyc = (): ReactElement => {
    return (
      <div>
        <Switch>
          <Route exact path="/kyc">
            <Init />
          </Route>
          <Route path="/kyc/me">
            <Me />
          </Route>
          <Route path="/kyc/create">
            <Create />
          </Route>
          <Route path="/kyc/jobs">
            <Jobs />
          </Route>
        </Switch>
      </div>
    );
};

const Init = (): ReactElement => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'My identity', to: '/kyc/me' },
    { label: 'Create identity', to: '/kyc/create' },
    { label: 'Verification jobs', to: '/kyc/jobs' },
  ];

  return (
    <div>
      <h2>KYC</h2>
      <NavList items={navItems} />
      <ButtonBack />
    </div>
  );
};

const Me = (): ReactElement => {
  return (
    <div>
      <h2>Me</h2>
      <ButtonBack />
    </div>
  );
};

const Create = (): ReactElement => {
  return (
    <div>
      <h2>Create</h2>
      <FormCreateIdentity />
      <ButtonBack />
    </div>
  );
};

const Jobs = (): ReactElement => {
  return (
    <div>
      <h2>Jobs</h2>
      <ButtonBack />
    </div>
  );
};

export default Kyc;