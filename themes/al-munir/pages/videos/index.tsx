import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { loadSidebarContent } from 'm/videos/load-sidebar-content';
import { PageProps } from 'shared/dist/types/page-props';
import { Video, VideoInterface } from 'c/videos/video';
import { LayoutWide } from '../../layout/layout-wide';
import { PaginationLinks } from 'c/pagination-links';
import { Page } from 'shared/dist/components/page';
import { loadRelations } from 'm/load-relations';
import { CategoryInterface } from 'c/category';
import { Sidebar } from 'c/videos/sidebar';
import { NextPage } from 'next';
import Head from 'next/head';

interface Props extends PageProps {
  videos: VideoInterface[];
  categories: CategoryInterface[];
  pageCount: number;
  activePage: number;
  keyword?: string;
}

const Videos: NextPage<Props> = (props) => {
  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Head>
          <title>ভিডিও সমুহ</title>
        </Head>

        <br />
        <br />
        <br />

        <section id="blog" className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 entries">
                {props.videos.map((video) => (
                  <Video key={video.id} {...video} />
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

    const videoService = new services.ItemsService('video', {
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

    const videos: Record<string, any>[] = await videoService.readByQuery({
      fields: [
        'id',
        'description',
        'link',
        'date_created',
        'user_created.first_name',
        'user_created.last_name',
        'user_updated.first_name',
        'user_updated.last_name',
      ],
      search: query.q,
      filter,
      page,
      limit,
    });

    const count = await videoService.readByQuery({
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

    for (let i = 0; i < videos.length; i++) {
      videos[i].date_created = formatter.format(
        new Date(videos[i].date_created),
      );

      if (videos[i].user_updated) {
          videos[i].user_created = videos[i].user_updated;
      }
    }

    const { categories } = await loadSidebarContent(ctx);
    const total = Number(count[0].countDistinct.id);
    const pageCount = Math.ceil(total / limit);

    return {
      videos,
      pageCount,
      activePage: page,
      categories,
      keyword: query.q ?? '',
    };
  },
);

export default Videos;
