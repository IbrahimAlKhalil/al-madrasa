import {FunctionComponent} from 'react';
import Link from 'next/link';

export interface CategoryInterface {
    id: number;
    count: string;
    name: string;
}

export const Category: FunctionComponent<CategoryInterface> = (props) => {
    return (
        <li>
            <Link href={`/articles?category=${props.id}`}>
                <a>{props.name} <span>({props.count})</span></a>
            </Link>
        </li>
    );
};
