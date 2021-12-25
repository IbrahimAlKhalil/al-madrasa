import {getServerSidePageProps} from 'm/get-server-side-page-props';
import {RecentArticleInterface} from 'c/articles/recent-article';
import {Article, ArticleInterface} from 'c/articles/article';
import {loadSidebarContent} from 'm/load-sidebar-content';
import {PaginationLink} from 'c/articles/pagination-link';
import {PageProps} from 'shared/dist/types/page-props';
import {CategoryInterface} from 'c/articles/category';
import {LayoutWide} from '../../layout/layout-wide';
import {Page} from 'shared/dist/components/page';
import {loadRelations} from 'm/load-relations';
import {Sidebar} from 'c/articles/sidebar';
import {NextPage} from 'next';
import {find} from 'lodash';

interface Props extends PageProps {
  articles: ArticleInterface[];
  recent: RecentArticleInterface[];
  categories: CategoryInterface[];
  pageCount: number;
  activePage: number;
  keyword?: string;
}

const Blog: NextPage<Props> = (props) => {
  const paginationLinks: ReturnType<typeof PaginationLink>[] = [];
  const intl = new Intl.NumberFormat('bn-BD');

  if (props.pageCount > 1) {
    for (let i = 0; i < props.pageCount; i++) {
      const page = i+1;

      paginationLinks.push(
          <PaginationLink
              active={page === props.activePage}
              label={intl.format(page)}
              page={page}
              key={page}
          />
      );
    }
  }

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <br/>
        <br/>
        <br/>

        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-8 entries">
                {
                  props.articles.map(article => <Article key={article.id} {...article} />)
                }

                {
                  paginationLinks.length ? (
                      <div className="blog-pagination">
                        <ul className="justify-content-center">
                          { paginationLinks }
                        </ul>
                      </div>
                  ): null
                }
              </div>

              <div className="col-lg-4">
                <Sidebar categories={props.categories} recent={props.recent} keyword={props.keyword}/>
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

      const {knex, schema, query, services} = ctx.req;
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
                  _eq: query.category
              }
          }
      }

      const articles: ArticleInterface[] = await articleService.readByQuery({
        fields: ['id', 'title', 'featured_image', 'excerpt', 'date_created', 'user_created.first_name', 'user_created.last_name'],
        search: query.q,
        filter,
        page,
        limit,
      });

      const commentCount = await knex.table('comment_entity')
          .join('comment', 'comment_id', 'comment.id')
          .where('collection', 'article')
          .where('approved', true)
          .whereIn('item', articles.map(a => a.id.toString()))
          .groupBy('item')
          .select('item')
          .count();

      for (const cm of commentCount) {
        const article = find(articles, a => a.id.toString() === cm.item);

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
        hour12: true,
        timeStyle: 'short',
        dateStyle: 'medium',
      });

      for (let i = 0; i < articles.length; i++) {
        articles[i].date_created = formatter.format(new Date(articles[i].date_created));
      }

      const {recent, categories} = await loadSidebarContent(ctx);
      const total = Number(count[0].countDistinct.id);
      const pageCount = Math.ceil(total / limit);

      return { articles, pageCount, activePage: page, categories, recent, keyword: query.q ?? '' };
    },
);

export default Blog;
