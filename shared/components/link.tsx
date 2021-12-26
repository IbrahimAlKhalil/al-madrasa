import {FunctionComponent} from 'react';
import {Link} from '../types/link';

export function link(item: Link, renderer: (url: string) => ReturnType<FunctionComponent>): ReturnType<FunctionComponent> {
    let href: string = '';

    switch (item.type) {
        case 'article':
            href = item.url ?? `/articles/${item.id}`;
            break;
        case 'video':
            href = item.url ?? `/videos/${item.id}`;
            break;
        case 'audio':
            href = item.url ?? `/audios/${item.id}`;
            break;
        case 'question':
            href = item.url ?? `/questions/${item.id}`;
            break;
        case 'image':
            href = item.url ?? `/gallery/${item.id}`;
            break;
        case 'book':
            href = item.url ?? `/books/${item.id}`;
            break;
        default:
            href = item.url ?? '#';
    }

    return renderer(href);
}
