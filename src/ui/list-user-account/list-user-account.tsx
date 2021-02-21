import styled from 'styled-components';
import type { ReactElement } from 'react';

import UserAccount from '../user-account';

import type { UsersType, User } from '../../modules/user';

type ListUserAccountProps = {
    users?: UsersType,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListUserAccount = ({
    users,
}: ListUserAccountProps): ReactElement => {

    return (
        <Wrapper>
            {
                users?.users.map((u: User) => <UserAccount user={u} />)
            }
        </Wrapper>
    )
        
};

export default ListUserAccount;
