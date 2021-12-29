import {getServerSidePageProps} from 'm/get-server-side-page-props';
import {PageProps} from 'shared/types/page-props';
import {LayoutWide} from '../layout/layout-wide';
import {Page} from 'shared/dist/components/page';
import {loadRelations} from 'm/load-relations';
import {NextPage} from 'next';
import Error from 'next/error';

interface Props extends PageProps {
    notFound: boolean;
    page: {
        id: string;
        title: string;
        content: string;
    };
}

const PageComponent: NextPage<Props> = (props) => {
    return (
        <Page pageProps={props}>
            <LayoutWide>
                <br/>
                <br/>

                {
                    props.notFound
                        ? <Error statusCode={404}/>
                        : (
                            <section className="inner-page">
                                <div className="container" dangerouslySetInnerHTML={{__html: props.page.content}}/>
                            </section>
                        )
                }

            </LayoutWide>
        </Page>
    );
};

export const getServerSideProps = getServerSidePageProps(
    ['general'],
    async (props, ctx) => {
        await loadRelations(props, ctx);

        const page = await ctx.req.knex.table('page')
            .where('id', ctx.query.id)
            .andWhere('status', 'published')
            .select('id', 'title', 'content')
            .first();

        const data: Record<string, any> = {};

        if (page) {
            data.page = page;
        } else {
            data.notFound = true;
            ctx.res.statusCode = 404;
        }

        return data;
    },
);

export default PageComponent;
