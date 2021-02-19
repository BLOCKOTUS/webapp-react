import type { ReactElement } from 'react';

import NavList from '../../ui/navlist';
import View from '../../ui/view';

const Home = (): ReactElement => {
  const navItems = [
    { label: 'Register', to: '/register' },
    { label: 'Login', to: '/login' },
    { label: 'Manage accounts', to: '/accounts' },
    { label: 'KYC', to: '/kyc' },
    { label: 'Test DID Url', to: '/' },
  ];
  
  return (
    <View title="Home">
      <NavList items={navItems} />
    </View>
  );
};

export default Home;