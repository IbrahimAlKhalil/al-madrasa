import {Section} from "./section";

export interface Page {
	id: string;
	name: string;
	icon: string | null;
	sections?: {
		sortable: Section[],
		still: Section[],
	}
}
