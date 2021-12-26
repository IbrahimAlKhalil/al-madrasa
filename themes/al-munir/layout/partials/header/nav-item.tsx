import {Link as LinkInterface} from 'shared/types/link';
import {link} from 'shared/dist/components/link';
import { FunctionComponent } from 'react';
import Link from 'next/link';

interface NavItemProps {
  link: LinkInterface
}

export const NavItem: FunctionComponent<NavItemProps> = (props) => {
  return (
    <li>
        {
            link(props.link, (href) => (
                <Link href={href}>
                    <a className="nav-link">
                        <span>{props.link.label}</span>
                    </a>
                </Link>
            ))
        }
    </li>
  );
};
