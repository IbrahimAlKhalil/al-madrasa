import {FunctionComponent} from 'react';
import Link from 'next/link';

interface NavItemInterface {
    title: string;
    href: string;
}

export const NavItem: FunctionComponent<NavItemInterface> = (props) => {
    return (
        <li>
            <i className="bi bi-chevron-right"/>
            <Link href={props.href}>{props.title}</Link>
        </li>
    );
};
