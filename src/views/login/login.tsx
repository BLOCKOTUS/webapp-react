import type { ReactElement } from 'react';

import ButtonBack from '../../ui/button-back';
import FormLogin from '../../ui/form-login';
import View from '../../ui/view';

const Login = (): ReactElement => {
    return (
      <View title="Login">
        <FormLogin />
        <ButtonBack />
      </View>
    );
  };

export default Login;
