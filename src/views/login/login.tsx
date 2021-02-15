import type { ReactElement } from 'react';

import BackwardButton from '../../ui/backward-button';
import LoginForm from '../../ui/login-form';

const Login = (): ReactElement => {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm />
        <BackwardButton />
      </div>
    );
  };

export default Login;