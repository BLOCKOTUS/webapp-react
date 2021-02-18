import { connect } from 'react-redux';
import type { ReactElement } from 'react';

import * as actions from '../../actions/users';
import BackwardButton from '../../ui/backward-button';
import RegisterForm from '../../ui/register-form';

import type { User } from '../../modules/user';

const Register = ({
  loginUser,
}: {
  loginUser: (user: User) => void,
}): ReactElement => {
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSucces={loginUser}/>
      <BackwardButton />
    </div>
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
