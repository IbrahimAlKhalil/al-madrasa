import {Field} from "@directus/shared/types";
import {SectionData} from './section-data';

export interface Section {
	id: string;
	name: string;
	icon: string | null;
	sort: number | null;
	sortable: boolean;
	can_hide: boolean;
	fields?: Field[] | null;
	data: SectionData
}
