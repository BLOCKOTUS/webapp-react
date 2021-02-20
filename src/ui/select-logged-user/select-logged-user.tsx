import { connect } from 'react-redux';
import type { ChangeEvent, ReactElement } from 'react';

import * as actions from '../../actions/users';
import { store  } from '../../store';

import type { User } from '../../modules/user';

const SelectLoggedUser = ({
    selectLoggedUser,
}: {
    selectLoggedUser: (username: string) => void,
}): ReactElement => {

    const state = store.getState();

    const onChange = (e: ChangeEvent<HTMLSelectElement>): void => selectLoggedUser(e.target.value);

    return (
        <div>
            <select onChange={onChange}>
                { state.users?.users.map((u: User) => {
                    return (
                        <option 
                            key={u.username} 
                            value={u.username} 
                            selected={state.users?.loggedInUser === u.username}
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
    }
  }

export default connect(
    null,
    mapDispatchToProps,
  )(SelectLoggedUser);
