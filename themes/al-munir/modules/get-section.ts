import { PageProps } from 't/page-props';
import { Section } from 't/section';

export function getSection(
  props: PageProps | null,
  pageId: string,
  sectionId: string,
): Section | null {
  if (
    !props ||
    !props.pages ||
    !props.pages.hasOwnProperty(pageId) ||
    !props.pages[pageId].sections.hasOwnProperty(sectionId) ||
    !props.pages[pageId].sections[sectionId].value
  ) {
    return null;
  }

  return props.pages[pageId].sections[sectionId];
}
