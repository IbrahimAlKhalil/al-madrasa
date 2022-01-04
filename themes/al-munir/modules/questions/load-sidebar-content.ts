import { GetServerSidePropsContext } from 'shared/dist/types/next';
import { CategoryInterface } from 'c/category';

export async function loadSidebarContent(ctx: GetServerSidePropsContext) {
  const { knex } = ctx.req;

  const categories: CategoryInterface[] = await knex
    .table('question_category')
    .join(
      'question_category_pivot',
      'question_category.id',
      'question_category_id',
    )
    .groupBy('question_category.id')
    .select('question_category.id', 'name')
    .orderBy('sort', 'asc')
    .limit(10)
    .count();

  return { categories };
}
