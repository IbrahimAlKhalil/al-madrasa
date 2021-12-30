import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { loadSidebarContent } from 'm/articles/load-sidebar-content';
import { RecentArticleInterface } from 'c/articles/recent-article';
import { Article, ArticleInterface } from 'c/articles/article';
import { PageProps } from 'shared/dist/types/page-props';
import { LayoutWide } from '../../layout/layout-wide';
import { PaginationLinks } from 'c/pagination-links';
import { Page } from 'shared/dist/components/page';
import { loadRelations } from 'm/load-relations';
import { CategoryInterface } from 'c/category';
import { TagInterface } from 'c/articles/tag';
import { Sidebar } from 'c/articles/sidebar';
import { NextPage } from 'next';
import { find } from 'lodash';
import Head from 'next/head';

interface Props extends PageProps {
  articles: ArticleInterface[];
  recent: RecentArticleInterface[];
  categories: CategoryInterface[];
  tags: TagInterface[];
  pageCount: number;
  activePage: number;
  keyword?: string;
}

const Blog: NextPage<Props> = (props) => {
  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Head>
          <title>প্রবন্ধ সমুহ</title>
        </Head>

        <br />
        <br />
        <br />

        <section id="blog" className="blog recent-blog-posts">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 row entries">
                {props.articles.map((article) => (
                  <Article key={article.id} {...article} />
                ))}

                {props.pageCount > 1 ? (
                  <div className="blog-pagination">
                    <ul className="justify-content-center">
                      <PaginationLinks
                        pageCount={props.pageCount}
                        activePage={props.activePage}
                      />
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="col-lg-4">
                <Sidebar
                  categories={props.categories}
                  recent={props.recent}
                  tags={props.tags}
                  keyword={props.keyword}
                />
              </div>
            </div>
          </div>
        </section>
      </LayoutWide>
    </Page>
  );
};

export const getServerSideProps = getServerSidePageProps(
  ['general'],
  async (props, ctx) => {
    await loadRelations(props, ctx);

    const { knex, schema, query, services } = ctx.req;
    const page = Number(query.page ?? 1) || 1;
    const limit = 6;

    const articleService = new services.ItemsService('article', {
      knex,
      schema,
    });

    const filter: Record<string, any> = {
      status: {
        _eq: 'published',
      },
    };

    if (query.category) {
      filter.categories = {
        id: {
          _eq: query.category,
        },
      };
    }

    if (query.tag) {
      filter.tags = {
        id: {
          _eq: query.tag,
        },
      };
    }

    const articles: ArticleInterface[] = await articleService.readByQuery({
      fields: [
        'id',
        'title',
        'featured_image',
        'excerpt',
        'date_created',
        'user_created.first_name',
        'user_created.last_name',
      ],
      search: query.q,
      filter,
      page,
      limit,
    });

    const commentCount = await knex
      .table('comment_entity')
      .join('comment', 'comment_id', 'comment.id')
      .where('collection', 'article')
      .where('approved', true)
      .whereIn(
        'item',
        articles.map((a) => a.id.toString()),
      )
      .groupBy('item')
      .select('item')
      .count();

    for (const cm of commentCount) {
      const article = find(articles, (a) => a.id.toString() === cm.item);

      if (article) {
        article.commentCount = Number(cm.count);
      }
    }

    const count = await articleService.readByQuery({
      filter,
      aggregate: {
        countDistinct: ['id'],
      },
    });

    const formatter = new Intl.DateTimeFormat('bn-BD', {
      dateStyle: 'full',
    });

    for (let i = 0; i < articles.length; i++) {
      articles[i].date_created = formatter.format(
        new Date(articles[i].date_created),
      );
    }

    const { recent, categories, tags } = await loadSidebarContent(ctx);
    const total = Number(count[0].countDistinct.id);
    const pageCount = Math.ceil(total / limit);

    return {
      articles,
      pageCount,
      activePage: page,
      categories,
      tags,
      recent,
      keyword: query.q ?? '',
    };
  },
);

export default Blog;
