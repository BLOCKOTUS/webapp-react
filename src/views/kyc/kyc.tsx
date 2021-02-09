import BackwardButton from '../../ui/backward-button';
import NavList from '../../ui/navlist';

import type { ReactElement } from 'react';


const Kyc = (): ReactElement => {
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
        <BackwardButton />
      </div>
    );
}

  export default Kyc;