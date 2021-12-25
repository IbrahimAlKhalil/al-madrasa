import {FunctionComponent} from 'react';
import Link from 'next/link';

export interface PaginationLinkInterface {
    label: string;
    page: number;
    active: boolean;
}

export const PaginationLink: FunctionComponent<PaginationLinkInterface> = (props) => {
    return (
        <li className={props.active ? 'active' : ''}>
            <Link href={`?page=${props.page}`}>{props.label}</Link>
        </li>
    );
};
