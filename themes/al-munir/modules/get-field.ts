import {PageProps} from 't/page-props';

export function getField<T = any>(props: PageProps | null, pageId: string, sectionId: string, field: string): T {
    if (
        !props
        || !props.pages
        || !props.pages.hasOwnProperty(pageId)
        || !props.pages[pageId].sections.hasOwnProperty(sectionId)
        || !props.pages[pageId].sections[sectionId].value
        || !props.pages[pageId].sections[sectionId].value.hasOwnProperty(field)
    ) {
        return null as unknown as T;
    }

    return props.pages[pageId].sections[sectionId].value[field];
}
