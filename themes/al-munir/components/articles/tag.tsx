import {FunctionComponent} from 'react';
import Link from 'next/link';

export interface TagInterface {
    id: number;
    name: string;
}

export const Tag: FunctionComponent<TagInterface> = (props) => {
    return (
        <li>
            <Link href={`/articles?tag=${props.id}`}>
                <a>{props.name}</a>
            </Link>
        </li>
    );
};
