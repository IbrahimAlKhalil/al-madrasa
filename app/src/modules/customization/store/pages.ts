import {SectionData} from "@/modules/customization/typings/section-data";
import {Section} from "@/modules/customization/typings/section";
import {isEmpty, merge, pick} from 'lodash';
import {useRequestsStore} from "@/stores";
import {Page} from '../typings/page';
import {defineStore} from 'pinia';
import api from '@/api';

export const usePageStore = defineStore({
	id: 'pageStore',
	state: () => ({
		pages: [] as Page[],
		sectionsMap: new Map<string, Section>(),
		pagesMap: new Map<string, Page>(),
		model: new Map<string, Record<string, any> | null>(),
		hydrated: false,
		loading: false,
	}),
	actions: {
		async hydrate() {
			const requestStore = useRequestsStore();
			const requestId = requestStore.startRequest();

			if (this.hydrated) {
				return requestStore.endRequest(requestId);
			}

			this.loading = true;

			const theme = await api.get<any>(`/items/website`, {
				params: {
					limit: 1,
					fields: ['theme']
				}
			});
			const pages = await api.get<any>(`/items/theme_page`, {
				params: {
					limit: -1,
					filter: {
						theme: {
							_eq: theme.data.data.theme
						}
					},
					fields: ['id', 'name', 'icon'],
					sort: ['sort'],
				}
			});

			for (const page of pages.data.data) {
				page.id = page.id.toString();
				this.pagesMap.set(page.id, page);
			}

			this.pages = pages.data.data;
			this.hydrated = true;
			this.loading = false;

			requestStore.endRequest(requestId);
		},
		async dehydrate() {
			this.$reset();
		},
		async hydratePage(pageId: string) {
			const requestStore = useRequestsStore();
			const requestId = requestStore.startRequest();

			await this.hydrate();

			const page = this.pagesMap.get(pageId);

			if (!page || page.sections) {
				return requestStore.endRequest(requestId);
			}

			this.loading = true;

			const sections = await api.get<{ data: Section[] }>('/items/theme_page_section', {
				params: {
					limit: -1,
					filter: {
						page: {
							_eq: pageId,
						}
					},
					fields: ['id', 'name', 'sort', 'icon', 'sortable', 'can_hide'],
					sort: ['sort'],
				}
			});
			const sectionValue = await api.get<{ data: SectionData[] }>('/items/section', {
				params: {
					limit: -1,
					filter: {
						page_section: {
							_in: sections.data.data.map((d: any) => d.id)
						}
					},
					fields: ['id', 'sort', 'visible', 'page_section'],
					sort: ['sort']
				},
			});

			page.sections = {
				sortable: [] as Section[],
				still: [] as Section[],
			};

			for (const section of sections.data.data) {
				if (section.sortable) {
					page.sections.sortable.push(section);
				} else {
					page.sections.still.push(section);
				}

				const value = sectionValue.data.data.find((v: any) => v.page_section === section.id);

				if (value) {
					section.data = {
						id: value.id,
						visible: value.visible,
						sort: value.sort,
					};
				} else {
					section.data = {
						visible: true,
						sort: null,
					}
				}

				section.id = section.id.toString();
				this.sectionsMap.set(section.id, section);
			}

			page.sections.sortable.sort((a, b) => {
				const sort1 = typeof a.data.sort === 'number' ? a.data.sort : 1;
				const sort2 = typeof b.data.sort === 'number' ? b.data.sort : 1;

				return sort1 - sort2;
			});

			this.loading = false;
			requestStore.endRequest(requestId);
		},
		async hydrateSection(pageId: string, sectionId: string) {
			const requestStore = useRequestsStore();
			const requestId = requestStore.startRequest();

			await this.hydratePage(pageId);

			const section = this.sectionsMap.get(sectionId);

			if (!section || section.fields) {
				return requestStore.endRequest(requestId);
			}

			this.loading = true;

			const sectionFields = await api.get<{ data: Section[] }>('/items/theme_page_section', {
				params: {
					limit: 1,
					filter: {
						id: {
							_eq: sectionId
						}
					},
					fields: ['fields'],
				}
			});
			const sectionValue = await api.get<{ data: SectionData[] }>('/items/section', {
				params: {
					limit: 1,
					filter: {
						page_section: {
							_eq: sectionId
						}
					},
					fields: ['value']
				},
			});

			if (!section) {
				this.loading = false;
				return;
			}

			section.fields = sectionFields.data.data[0]?.fields || [];
			section.data.value = sectionValue.data.data[0]?.value || null;

			this.loading = false;
			requestStore.endRequest(requestId);
		},
		async sort(pageId: string, items: Section[]) {
			const requestStore = useRequestsStore();
			const requestId = requestStore.startRequest();
			const page = this.pagesMap.get(pageId);

			if (!page || !page.sections) {
				return;
			}

			page.sections.sortable = items;

			for (let i = 0; i < items.length; i++) {
				const section = items[i];

				if (section.data.sort === i) {
					continue;
				}

				section.data.sort = i;

				if (section.data.id) {
					await api.patch(`/items/section/${section.data.id}`, {
						sort: i,
					});
				} else {
					const response = await api.post<{ data: SectionData }>('/items/section', {
						page_section: section.id,
						sort: i,
					});

					merge(section.data, pick(response.data.data, 'id', 'visible', 'sort', 'page_section'));
				}
			}

			requestStore.endRequest(requestId);
		},
		async update(pageId: string, sectionId: string, data: Partial<SectionData>) {
			const requestStore = useRequestsStore();
			const requestId = requestStore.startRequest();

			const page = this.pagesMap.get(pageId);
			const section = this.sectionsMap.get(sectionId);

			if (!page || !page.sections || section?.data.visible === undefined) {
				return requestStore.endRequest(requestId);
			}

			if (section.data.id) {
				await api.patch(`/items/section/${section.data.id}`, {
					...data,
					sort: page.sections.sortable.indexOf(section),
				});

				merge(section.data, data);
			} else {
				const response = await api.post<{ data: SectionData }>('/items/section', {
					page_section: sectionId,
					sort: page.sections.sortable.indexOf(section),
					...data,
				});

				merge(section.data, pick(response.data.data, 'id', 'sort', 'visible', 'value', 'page_section'));
			}

			await this.sort(pageId, page.sections.sortable);
			this.model.delete(sectionId);
			requestStore.endRequest(requestId);
		},
		async input(sectionId: string, value: Record<string, any>) {
			if (isEmpty(value)) {
				this.model.delete(sectionId);
			} else {
				this.model.set(sectionId, value);
			}
		}
	},
	debounce: {
		input: 500
	}
});
