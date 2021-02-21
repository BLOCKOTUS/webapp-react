import { connect } from 'react-redux';
import styled from 'styled-components';
import type { ReactElement } from 'react';

import * as actions from '../../actions/users';

import type { User } from '../../modules/user';

type UserAccountProps = {
    user: User,
    deleteUser: (username: string) => void,
};

const Wrapper = styled.div`
    display: flex;
`;

const UserAccount = ({
    user,
    deleteUser,
}: UserAccountProps): ReactElement => {

    const Delete = ({username}: {username: string}): ReactElement => <span onClick={() => deleteUser(username)}>Logout</span>;

    return (
        <Wrapper>{user.username} -&nbsp;<Delete username={user.username}/></Wrapper>
    )
        
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      deleteUser: (username: string) => dispatch(actions.deleteUser(username)),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(UserAccount);
