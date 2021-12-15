import { Fragment, FunctionComponent, useContext } from 'react';
import { SectionProps } from '../types/section-props';
import { PageContext } from '../modules/page-context';
import { Section } from '../types/section';

interface SectionsInterface {
  pageId: string;
  sections: {
    [id: string]: FunctionComponent<SectionProps>;
  };
}

export const Sections: FunctionComponent<SectionsInterface> = (props) => {
  const ctx = useContext(PageContext);
  const page = ctx?.pages[props.pageId];

  if (!page) {
    throw new Error(`Page ${props.pageId} doesn't exist`);
  }

  const sectionIds = Object.keys(props.sections);
  const sections: Section[] = [];

  for (let i = 0; i < sectionIds.length; i++) {
    const section = page.sections[sectionIds[i]];

    if (!section || !section.visible) {
      continue;
    }

    sections.push(section);
  }

  sections.sort((a, b) => a.sort - b.sort);

  return (
    <Fragment>
      {sections.map((section) => {
        const Comp = props.sections[section.id];
        return <Comp key={section.id} data={section} />;
      })}
    </Fragment>
  );
};
