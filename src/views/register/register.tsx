import type { ReactElement } from 'react';

import BackwardButton from '../../ui/backward-button';
import RegisterForm from '../../ui/register-form';

const Register = (): ReactElement => {
    return (
      <div>
        <h2>Register</h2>
        <RegisterForm />
        <BackwardButton />
      </div>
    );
  };

export default Register;
