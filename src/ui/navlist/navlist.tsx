import {
    Link,
} from "react-router-dom";

import type { ReactElement } from 'react';

type NavItem = {
    label: string,
    to: string,
};

type NavListProps = {
    items: Array<NavItem>,
};

const NavList = ({
    items
}: NavListProps): ReactElement => {
    return (
        <ul>
            {
                items.map(i => <li><Link to={i.to}>{i.label}</Link></li>)
            }
        </ul>
    );
        
};

export default NavList;