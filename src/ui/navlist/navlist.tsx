import {
    Link,
} from "react-router-dom";

type NavItem = {
    label: string,
    to: string,
};

type NavListProps = {
    items: Array<NavItem>,
};

const NavList = ({
    items
}: NavListProps) => {
    return (
        <ul>
            {
                items.map(i => <li><Link to={i.to}>{i.label}</Link></li>)
            }
        </ul>
    );
        
};

export default NavList;