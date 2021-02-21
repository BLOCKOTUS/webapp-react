import { connect } from 'react-redux';
import {
  Switch,
  Route,
} from "react-router-dom";

import ButtonBack from '../../ui/button-back';
import FormCreateIdentity from '../../ui/form-create-identity';
import NavList from '../../ui/navlist';
import View from '../../ui/view';

import type { ReactElement } from 'react';

import type { UsersType } from '../../modules/user';
import type { State } from '../../store';

const Kyc = (): ReactElement => {
    return (
      <div>
        <Switch>
          <Route exact path="/kyc">
            <ConnectedInit />
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

const Init = ({ users }: { users?: UsersType }): ReactElement => {

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'My identity', to: '/kyc/me' },
    { label: 'Verification jobs', to: '/kyc/jobs' },
  ];

  const navItemsNoIdentity = [
    { label: 'Home', to: '/' },
    { label: 'Create identity', to: '/kyc/create' },
  ];

  return (
    <View title="KYC">
      <NavList items={users?.loggedInUser?.identity ? navItems : navItemsNoIdentity} />
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

const mapStateToProps = (state: State) => {
  const { users } = state
  return { users };
};

const ConnectedInit = connect(
  mapStateToProps,
  null,
)(Init);

export default Kyc;
