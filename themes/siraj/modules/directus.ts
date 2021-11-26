import { Collections } from '../typings/collections';
import { Directus } from '@directus/sdk';

export const directus = new Directus<Collections>('http://localhost:7000');
