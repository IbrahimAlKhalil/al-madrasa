import {getServerSidePageProps} from 'm/get-server-side-page-props';
import {loadSidebarContent} from 'm/articles/load-sidebar-content';
import {Question, QuestionInterface} from 'c/questions/question';
import {PageProps} from 'shared/dist/types/page-props';
import {LayoutWide} from '../../layout/layout-wide';
import {PaginationLinks} from 'c/pagination-links';
import {Page} from 'shared/dist/components/page';
import {loadRelations} from 'm/load-relations';
import {CategoryInterface} from 'c/category';
import {Sidebar} from 'c/articles/sidebar';
import {NextPage} from 'next';
import Head from 'next/head';
import {find} from 'lodash';
import {ArticleInterface} from "c/articles/article";

interface Props extends PageProps {
    questions: QuestionInterface[];
    categories: CategoryInterface[];
    pageCount: number;
    activePage: number;
    keyword?: string;
}

const Blog: NextPage<Props> = (props) => {
    return (
        <Page pageProps={props}>
            <LayoutWide>
                <Head>
                    <title>আপনি যা জানতে চেয়েছেন</title>
                </Head>

                <br/>
                <br/>
                <br/>

                <section id="blog" className="blog recent-blog-posts">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-8 entries">

                                {

                                }

                                <div className="blog-pagination">
                                    <ul className="justify-content-center">
                                        <li><a href="#">1</a></li>
                                        <li className="active"><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                {/*<Sidebar
                                    categories={props.categories}
                                    keyword={props.keyword}
                                />*/}
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

        const questionService = new services.ItemsService('question', {
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

        const articles: ArticleInterface[] = await questionService.readByQuery({
            fields: [
                'id',
                'name',
                'question',
                'date_created'
            ],
            search: query.q,
            filter,
            page,
            limit,
        });

        const commentCount = await knex
            .table('comment_entity')
            .join('comment', 'comment_id', 'comment.id')
            .where('collection', 'question')
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

        const count = await questionService.readByQuery({
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

        const {categories} = await loadSidebarContent(ctx);
        const total = Number(count[0].countDistinct.id);
        const pageCount = Math.ceil(total / limit);

        return {
            articles,
            pageCount,
            activePage: page,
            categories,
            keyword: query.q ?? '',
        };
    },
);

export default Blog;
