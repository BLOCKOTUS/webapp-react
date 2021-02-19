import { connect } from 'react-redux';
import type { ReactElement } from 'react';

import * as actions from '../../actions/users';
import ButtonBack from '../../ui/button-back';
import FormRegister from '../../ui/form-register';
import View from '../../ui/view';

import type { User } from '../../modules/user';

const Register = ({
  loginUser,
}: {
  loginUser: (user: User) => void,
}): ReactElement => {
  return (
    <View title="Register">
      <FormRegister onSucces={loginUser}/>
      <ButtonBack />
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (user: User) => dispatch(actions.loginUser(user)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Register);
