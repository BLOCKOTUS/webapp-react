import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getMyIdentity } from '../../modules/identity';
import ButtonBack from '../../ui/button-back';
import Identity from '../../ui/identity';
import InfoBar from '../../ui/info-bar';
import View from '../../ui/view';

import type { ReactElement } from 'react';

import type { UsersType } from '../../modules/user';
import type { IdentityTypeWithKYC } from '../../modules/identity';
import type { InfoType } from '../../modules/info';
import type { State } from '../../store';


const Me = ({
  users,
}: {
  users?: UsersType,
}): ReactElement => {
  const [identity, setIdentity] = useState<IdentityTypeWithKYC | null>();
  // const [identity, setIdentity] = useState<IdentityTypeWithKYC | null>(users?.loggedInUser?.identity?);
  const [info, setInfo] = useState<InfoType | null>();

  useEffect(() => {
    const pullIdentityFromNetwork = async () => {
      if (users && users.loggedInUser) {
        const response = await getMyIdentity({ user: users.loggedInUser, onInfo: setInfo })
        response && setIdentity(response);
      }
    };
    pullIdentityFromNetwork();
  }, [users]);

  return (
    <View title="Me">
      <InfoBar info={info} />
      { identity
        ? (<Identity identity={identity} />)
        : (<></>)
      }
      <ButtonBack />
    </View>
  );
};

const mapStateToProps = (state: State) => {
  const { users } = state
  return { users };
};

export default connect(
  mapStateToProps,
  null,
)(Me);;
