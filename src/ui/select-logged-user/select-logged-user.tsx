import { connect } from 'react-redux';
import type { ChangeEvent, ReactElement } from 'react';

import * as actions from '../../actions/users';

import type { User, UsersType } from '../../modules/user';
import type { State } from '../../store';

const SelectLoggedUser = ({
    selectLoggedUser,
    users,
}: {
    selectLoggedUser: (username: string) => void,
    users: UsersType,
}): ReactElement => {

    const onChange = (e: ChangeEvent<HTMLSelectElement>): void => selectLoggedUser(e.target.value);

    return (
        <div>
            <select onChange={onChange} value={users?.loggedInUser?.username}>
                { users?.users.map((u: User) => {
                    return (
                        <option 
                            key={u.username} 
                            value={u.username} 
                        >
                            {u.username}
                        </option>
                    )
                })}
            </select>
        </div>
    );
        
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      selectLoggedUser: (username: string) => dispatch(actions.selectLoggedUser(username)),
    };
};

const mapStateToProps = (state: State) => {
    const { users } = state
    return { users };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectLoggedUser);
