import {
  Switch,
  Route,
} from "react-router-dom";

import ButtonBack from '../../ui/button-back';
import FormCreateIdentity from '../../ui/form-create-identity';
import NavList from '../../ui/navlist';
import View from '../../ui/view';

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
    <View title="KYC">
      <NavList items={navItems} />
      <ButtonBack />
    </View>
  );
};

const Me = (): ReactElement => {
  return (
    <View title="Me">
      <ButtonBack />
    </View>
  );
};

const Create = (): ReactElement => {
  return (
    <View title="Create">
      <FormCreateIdentity />
      <ButtonBack />
    </View>
  );
};

const Jobs = (): ReactElement => {
  return (
    <View title="Jobs">
      <ButtonBack />
    </View>
  );
};

export default Kyc;
