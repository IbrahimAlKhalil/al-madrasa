import {Link} from './link';

export interface MenuItem {
  id: string;
  link: Link;
  children: MenuItem[];
}

export interface Menu {
  id: number;
  items: MenuItem[];
}
