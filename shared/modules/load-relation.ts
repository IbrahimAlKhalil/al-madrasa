import { GetServerSidePropsContext } from '../types/next';
import { getSection } from './get-section';
import { PageProps } from '../types/page-props';

export const loadRelation = async (
  props: PageProps,
  ctx: GetServerSidePropsContext,
  table: string,
  pageId: string,
  sectionId: string,
  field: string,
  columns?: string[],
  pKey = 'id',
) => {
  const section = getSection(props, pageId, sectionId);

  if (!section || !section.value || !section.value[field]) {
    return;
  }

  const multiple = Array.isArray(section.value[field]);

  const ids = multiple ? section.value[field] : [section.value[field]];

  const queryBuilder = ctx.req.knex.from(table).whereIn(pKey, ids);

  const items = columns
    ? await queryBuilder.select(columns)
    : await queryBuilder.select();
  section.value[field] = multiple ? items : items[0];

  if (section.value[field] === undefined) {
    section.value[field] = null;
  }
};
