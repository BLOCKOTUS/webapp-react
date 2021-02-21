import { connect } from 'react-redux';
import type { ReactElement } from 'react';

import ButtonBack from '../../ui/button-back';
import ListUserAccount from '../../ui/list-user-account';
import View from '../../ui/view';

import type { UsersType } from '../../modules/user';
import type { State } from '../../store';

const Accounts = ({ users }: { users?: UsersType }): ReactElement => {

  return (
    <View title="Accounts">
      <ListUserAccount users={users} />
      <ButtonBack />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { users } = state
  return { users };
}

export default connect(
  mapStateToProps,
  null,
)(Accounts);
