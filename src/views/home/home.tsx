import type { ReactElement } from 'react';

import NavList from '../../ui/navlist';

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

export default Home;