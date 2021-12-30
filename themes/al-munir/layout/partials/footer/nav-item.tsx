import {Link as LinkInterface} from 'shared/types/link';
import {link} from 'shared/dist/modules/link';
import {FunctionComponent} from 'react';
import Link from 'next/link';

export const NavItem: FunctionComponent<LinkInterface> = (props) => {
    return (
        <li>
            <i className="mi">chevron_right</i>
            {
                link(props, (href) => <Link href={href}><a>{props.label}</a></Link>)
            }
        </li>
    );
};
