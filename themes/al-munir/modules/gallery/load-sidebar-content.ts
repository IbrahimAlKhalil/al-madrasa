import {GetServerSidePropsContext} from 'shared/dist/types/next';
import {CategoryInterface} from 'c/category';

export async function loadSidebarContent(ctx: GetServerSidePropsContext) {
    const categories: CategoryInterface[] = await ctx.req.knex
        .table('image_category')
        .join('image_category_pivot', 'image_category.id', 'image_category_id')
        .groupBy('image_category.id')
        .select('image_category.id', 'name')
        .orderBy('sort', 'asc')
        .limit(10)
        .count();

    return {categories};
}
