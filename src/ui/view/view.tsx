import styled from 'styled-components';
import type { ReactChild, ReactElement } from 'react';

import SelectLoggedUser from '../select-logged-user';

const TopBar = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
`;

const View = ({
    children,
    title,
}: {
    children: Array<ReactChild> | ReactChild,
    title?: string,
}): ReactElement => {
    return (
        <div>
            <TopBar>
                <SelectLoggedUser />
            </TopBar>
            { title ? (<h2>{ title }</h2>) : null }
            { children }
        </div>
    );
        
};

export default View;
