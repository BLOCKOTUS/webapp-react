import {
    Link,
} from "react-router-dom";

import type { ReactElement } from 'react';

type NavItem = {
  label: string,
  to?: string,
  onClick?: (...args: any) => any,
};

type NavListProps = {
  items: Array<NavItem>,
};

const NavList = ({
  items,
}: NavListProps): ReactElement => {
  return (
    <ul>
      {
        items.map((i, n) => i.to
          ? <li key={n}><Link to={i.to}>{i.label}</Link></li>
          // eslint-disable-next-line
          : i.onClick && <li key={n}><a href="#" onClick={i.onClick}>{i.label}</a></li>
        )
      }
    </ul>
  );  
};

export default NavList;
