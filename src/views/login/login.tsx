import type { ReactElement } from 'react';

import ButtonBack from '../../ui/button-back';
import FormLogin from '../../ui/form-login';

const Login = (): ReactElement => {
    return (
      <div>
        <h2>Login</h2>
        <FormLogin />
        <ButtonBack />
      </div>
    );
  };

export default Login;