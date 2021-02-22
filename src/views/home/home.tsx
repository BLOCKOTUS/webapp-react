import { connect } from 'react-redux';
import type { ReactElement } from 'react';

import NavList from '../../ui/navlist';
import View from '../../ui/view';

import type { UsersType } from '../../modules/user';
import type { State } from '../../store';

const Home = ({ users }: { users?: UsersType }): ReactElement => {

  const navItems = [
    { label: 'Register', to: '/register' },
    { label: 'Manage accounts', to: '/accounts' },
    { label: 'KYC', to: '/kyc' },
    { label: 'Test DID Url', to: '/' },
  ];

  const navItemsGuest = [
    { label: 'Register', to: '/register' },
    { label: 'Login', to: '/login' },
    { label: 'Manage accounts', to: '/accounts' },
  ];
  
  return (
    <View title="Home">
      <NavList items={users?.loggedInUser ? navItems : navItemsGuest} />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { users } = state
  return { users };
}

export default connect(
  mapStateToProps,
  null,
)(Home);
