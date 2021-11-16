export interface SectionData {
	id?: number;
	visible: boolean;
	sort: number | null;
	value?: Record<string, any> | null;

	[key: string]: any
}
