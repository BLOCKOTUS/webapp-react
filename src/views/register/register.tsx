import { connect } from 'react-redux';
import type { ReactElement } from 'react';

import { loginUser } from '../../actions/users';
import BackwardButton from '../../ui/backward-button';
import RegisterForm from '../../ui/register-form';

import type { User } from '../../modules/user';
import type { Dispatch } from '../../store';

const Register = (): ReactElement => {

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSucces={loginUser}/>
      <BackwardButton />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loginUser: (user: User) => dispatch(loginUser(user)),
  }
}

export default connect(mapDispatchToProps)(Register);
