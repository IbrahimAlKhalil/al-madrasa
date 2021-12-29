import {GetServerSidePropsContext} from 'shared/dist/types/next';
import {CategoryInterface} from 'c/category';

export async function loadSidebarContent(ctx: GetServerSidePropsContext) {
    const categories: CategoryInterface[] = await ctx.req.knex
        .table('video_category')
        .join('video_category_pivot', 'video_category.id', 'video_category_id')
        .groupBy('video_category.id')
        .select('video_category.id', 'name')
        .orderBy('sort', 'asc')
        .limit(10)
        .count();

    return {categories};
}
