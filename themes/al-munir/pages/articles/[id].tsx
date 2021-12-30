import { ArticleInterface as ArticleInterfaceBase } from 'c/articles/article';
import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { RecentArticleInterface } from 'c/articles/recent-article';
import { loadSidebarContent } from 'm/articles/load-sidebar-content';
import { PageProps } from 'shared/dist/types/page-props';
import { CategoryInterface } from 'c/category';
import { LayoutWide } from '../../layout/layout-wide';
import { Page } from 'shared/dist/components/page';
import { loadRelations } from 'm/load-relations';
import { TagInterface } from 'c/articles/tag';
import { Sidebar } from 'c/articles/sidebar';
import userAvatar from 'a/img/user.svg';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

interface ArticleInterface extends ArticleInterfaceBase {
  tags: TagInterface[];
  categories: TagInterface[];
}

interface Props extends PageProps {
  article: ArticleInterface;
  recent: RecentArticleInterface[];
  categories: CategoryInterface[];
  tags: TagInterface[];
}

const Article: NextPage<Props> = (props) => {
  const { article } = props;

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Head>
          <title>{props.article.title}</title>
          <meta
            name="keywords"
            content={props.article.tags.map((t) => t.name).join(',')}
          />
        </Head>

        <br />
        <br />
        <br />

        <section id="blog" className="blog">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-8 entries">
                <article className="entry entry-single">
                  <div className="entry-img">
                    <img
                      src={`/assets/${article.featured_image}`}
                      alt={article.title}
                      className="img-fluid"
                    />
                  </div>
                  <h2 className="entry-title">{article.title}</h2>
                  <div className="entry-meta">
                    <ul>
                      <li className="d-flex align-items-center">
                        <i className="mi">person</i>
                        <a>
                          {article.user_created.first_name}{' '}
                          {article.user_created.last_name}
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="mi">access_time</i>
                        <a>
                          {/* TODO: Add datetime attribute */}
                          <time>{article.date_created}</time>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  <div className="entry-footer">
                    <ul className="tags">
                      {article.categories.map((c) => (
                        <li key={c.id}>
                          <a href={`/articles?category=${c.id}`}>{c.name}</a>
                          &nbsp;
                        </li>
                      ))}
                    </ul>
                    {article.tags.length > 0 ? ' | ' : ''}
                    <ul className="tags">
                      {article.tags.map((t) => (
                        <li key={t.id}>
                          <Link href={`/articles?tag=${t.id}`}>
                            <a>#{t.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                <div className="blog-author d-flex align-items-center">
                  {article.user_created.avatar ? (
                    <img
                      src={`/assets/${article.user_created.avatar}`}
                      className="rounded-circle float-left"
                      alt={article.user_created.first_name}
                    />
                  ) : (
                    <img
                      src={userAvatar.src}
                      alt={article.user_created.first_name}
                      className="rounded-circle float-left"
                    />
                  )}

                  <div>
                    <h4>
                      {article.user_created.first_name}{' '}
                      {article.user_created.last_name}
                    </h4>
                    {/*<div className="social-links">
                                            <a href="https://twitters.com/#"><i className="bi bi-twitter" /></a>
                                            <a href="https://facebook.com/#"><i className="bi bi-facebook" /></a>
                                            <a href="https://instagram.com/#"><i className="biu bi-instagram" /></a>
                                        </div>*/}
                    <p>{article.user_created.description}</p>
                  </div>
                </div>
                {/* TODO: Add comment section */}
                {/*<div className="blog-comments">
                                    <h4 className="comments-count">8 Comments</h4>
                                    <div id="comment-1" className="comment">
                                        <div className="d-flex">
                                            <div className="comment-img"><img src="assets/img/blog/comments-1.jpg" alt="" /></div>
                                            <div>
                                                <h5><a href="#">Georgia Reader</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                <p>
                                                    Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
                                                    Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                                                </p>
                                            </div>
                                        </div>
                                    </div> End comment #1
                                    <div id="comment-2" className="comment">
                                        <div className="d-flex">
                                            <div className="comment-img"><img src="assets/img/blog/comments-2.jpg" alt="" /></div>
                                            <div>
                                                <h5><a href>Aron Alvarado</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                <p>
                                                    Ipsam tempora sequi voluptatem quis sapiente non. Autem itaque eveniet saepe. Officiis illo ut beatae.
                                                </p>
                                            </div>
                                        </div>
                                        <div id="comment-reply-1" className="comment comment-reply">
                                            <div className="d-flex">
                                                <div className="comment-img"><img src="assets/img/blog/comments-3.jpg" alt="" /></div>
                                                <div>
                                                    <h5><a href>Lynda Small</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                    <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                    <p>
                                                        Enim ipsa eum fugiat fuga repellat. Commodi quo quo dicta. Est ullam aspernatur ut vitae quia mollitia id non. Qui ad quas nostrum rerum sed necessitatibus aut est. Eum officiis sed repellat maxime vero nisi natus. Amet nesciunt nesciunt qui illum omnis est et dolor recusandae.
                                                        Recusandae sit ad aut impedit et. Ipsa labore dolor impedit et natus in porro aut. Magnam qui cum. Illo similique occaecati nihil modi eligendi. Pariatur distinctio labore omnis incidunt et illum. Expedita et dignissimos distinctio laborum minima fugiat.
                                                        Libero corporis qui. Nam illo odio beatae enim ducimus. Harum reiciendis error dolorum non autem quisquam vero rerum neque.
                                                    </p>
                                                </div>
                                            </div>
                                            <div id="comment-reply-2" className="comment comment-reply">
                                                <div className="d-flex">
                                                    <div className="comment-img"><img src="assets/img/blog/comments-4.jpg" alt="" /></div>
                                                    <div>
                                                        <h5><a href>Sianna Ramsay</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                        <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                        <p>
                                                            Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores cupiditate et. Ut unde qui eligendi sapiente omnis ullam. Placeat porro est commodi est officiis voluptas repellat quisquam possimus. Perferendis id consectetur necessitatibus.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div> End comment reply #2
                                        </div> End comment reply #1
                                    </div> End comment #2
                                    <div id="comment-3" className="comment">
                                        <div className="d-flex">
                                            <div className="comment-img"><img src="assets/img/blog/comments-5.jpg" alt="" /></div>
                                            <div>
                                                <h5><a href>Nolan Davidson</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                <p>
                                                    Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
                                                    Non aut et et esse qui sit modi neque. Exercitationem et eos aspernatur. Ea est consequuntur officia beatae ea aut eos soluta. Non qui dolorum voluptatibus et optio veniam. Quam officia sit nostrum dolorem.
                                                </p>
                                            </div>
                                        </div>
                                    </div> End comment #3
                                    <div id="comment-4" className="comment">
                                        <div className="d-flex">
                                            <div className="comment-img"><img src="assets/img/blog/comments-6.jpg" alt="" /></div>
                                            <div>
                                                <h5><a href>Kay Duggan</a> <a href="#" className="reply"><i className="bi bi-reply-fill" /> Reply</a></h5>
                                                <time dateTime="2020-01-01">01 Jan, 2020</time>
                                                <p>
                                                    Dolorem atque aut. Omnis doloremque blanditiis quia eum porro quis ut velit tempore. Cumque sed quia ut maxime. Est ad aut cum. Ut exercitationem non in fugiat.
                                                </p>
                                            </div>
                                        </div>
                                    </div> End comment #4
                                    <div className="reply-form">
                                        <h4>Leave a Reply</h4>
                                        <p>Your email address will not be published. Required fields are marked * </p>
                                        <form action>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input name="name" type="text" className="form-control" placeholder="Your Name*" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <input name="email" type="text" className="form-control" placeholder="Your Email*" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col form-group">
                                                    <input name="website" type="text" className="form-control" placeholder="Your Website" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col form-group">
                                                    <textarea name="comment" className="form-control" placeholder="Your Comment*" defaultValue={""} />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>*/}
              </div>
              <div className="col-lg-4">
                <Sidebar
                  categories={props.categories}
                  tags={props.tags}
                  recent={props.recent}
                  action="/articles"
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

    const { services, knex, schema } = ctx.req;

    const articleService = new services.ItemsService('article', {
      knex,
      schema,
    });

    const article = await articleService.readOne(ctx.query.id, {
      fields: [
        'id',
        'title',
        'featured_image',
        'content',
        'date_created',
        'user_created.first_name',
        'user_created.last_name',
        'user_created.description',
        'user_created.avatar',
      ],
      filter: {
        status: {
          _eq: 'published',
        },
      },
    });

    article.categories = await ctx.req.knex
      .table('article_category_pivot')
      .join('article_category', 'article_category_id', 'article_category.id')
      .where('article_id', ctx.query.id)
      .select('article_category.id', 'article_category.name');

    article.tags = await ctx.req.knex
      .table('article_tag_pivot')
      .join('article_tag', 'article_tag_id', 'article_tag.id')
      .where('article_id', ctx.query.id)
      .select('article_tag.id', 'article_tag.name');

    const formatter = new Intl.DateTimeFormat('bn-BD', {
      hour12: true,
      timeStyle: 'short',
      dateStyle: 'full',
    });

    article.date_created = formatter.format(new Date(article.date_created));

    const { recent, categories, tags } = await loadSidebarContent(ctx);

    return { article, recent, categories, tags };
  },
);

export default Article;
