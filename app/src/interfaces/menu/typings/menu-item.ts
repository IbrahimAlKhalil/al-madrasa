import {Link} from '@/interfaces/link/types/link';

export interface MenuItem {
	id: string;
	link?: Link;
	children?: MenuItem[];
}
