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
                items.map((i, n) => <li><Link to={i.to} key={n}>{i.label}</Link></li>)
            }
        </ul>
    );
        
};

export default NavList;