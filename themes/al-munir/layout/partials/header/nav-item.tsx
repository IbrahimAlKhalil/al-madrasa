import {FunctionComponent} from 'react';
import Link from 'next/link';

interface NavItemProps {
    text: string;
    href: string;
}

export const NavItem: FunctionComponent<NavItemProps> = (props) => {
    return (
        <li>
            <Link href={props.href}>
                <a className="nav-link">
                    <span>{props.text}</span>
                </a>
            </Link>
        </li>
    );
};
