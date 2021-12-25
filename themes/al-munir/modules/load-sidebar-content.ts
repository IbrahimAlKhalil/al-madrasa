import {RecentArticleInterface} from 'c/articles/recent-article';
import {GetServerSidePropsContext} from 'shared/types/next';
import {CategoryInterface} from 'c/articles/category';

export async function loadSidebarContent(ctx: GetServerSidePropsContext) {
    const {knex, schema, services} = ctx.req;

    const articleService = new services.ItemsService('article', {
        knex,
        schema,
    });

    const recent: RecentArticleInterface[] = await articleService.readByQuery({
        fields: ['id', 'title', 'featured_image', 'date_created'],
        sort: ['date_created'],
        limit: 5,
        filter: {
            status: {
                _eq: 'published',
            }
        },
    });

    const categories: CategoryInterface[] = await knex
        .table('article_category')
        .join('article_category_pivot', 'article_category.id', 'article_category_id')
        .groupBy('article_category.id')
        .select('article_category.id', 'name')
        .orderBy('sort', 'asc')
        .limit(10)
        .count();

    const formatter = new Intl.DateTimeFormat('bn-BD', {
        hour12: true,
        timeStyle: 'short',
        dateStyle: 'full',
    });

    for (let i = 0; i < recent.length; i++) {
        recent[i].date_created = formatter.format(new Date(recent[i].date_created));
    }

    return {categories, recent};
}
