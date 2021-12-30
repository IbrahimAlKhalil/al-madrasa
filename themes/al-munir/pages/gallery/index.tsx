import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { loadSidebarContent } from 'm/gallery/load-sidebar-content';
import { PageProps } from 'shared/dist/types/page-props';
import { Image, ImageInterface } from 'c/gallery/image';
import { LayoutWide } from '../../layout/layout-wide';
import { PaginationLinks } from 'c/pagination-links';
import { Page } from 'shared/dist/components/page';
import { loadRelations } from 'm/load-relations';
import { CategoryInterface } from 'c/category';
import { Sidebar } from 'c/videos/sidebar';
import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

interface Props extends PageProps {
  images: ImageInterface[];
  categories: CategoryInterface[];
  pageCount: number;
  activePage: number;
  keyword?: string;
}

const Gallery: NextPage<Props> = (props) => {
  useEffect(() => {
    let lightbox: any;

    import('glightbox' + '/src/js/glightbox').then((Glightbox) => {
      lightbox = Glightbox.default({
        selector: '.portfokio-lightbox',
        zoomable: true,
        draggable: true,
        touchNavigation: true,
      });
    });

    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, []);

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Head>
          <title>গ্যলারী</title>
        </Head>

        <br />
        <br />
        <br />

        <section className="portfolio blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 entries">
                <div className="row gy-4 portfolio-container">
                  {props.images.map((image) => (
                    <Image key={image.id} {...image} />
                  ))}
                </div>

                {props.pageCount > 1 ? (
                  <>
                    <br />
                    <br />

                    <div className="blog-pagination">
                      <ul className="justify-content-center">
                        <PaginationLinks
                          pageCount={props.pageCount}
                          activePage={props.activePage}
                        />
                      </ul>
                    </div>
                  </>
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

    const imageService = new services.ItemsService('image', {
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

    const images: Record<string, any>[] = await imageService.readByQuery({
      fields: ['id', 'title', 'description', 'image'],
      search: query.q,
      filter,
      page,
      limit,
    });

    const count = await imageService.readByQuery({
      filter,
      aggregate: {
        countDistinct: ['id'],
      },
    });

    const { categories } = await loadSidebarContent(ctx);
    const total = Number(count[0].countDistinct.id);
    const pageCount = Math.ceil(total / limit);

    return {
      images,
      pageCount,
      activePage: page,
      categories,
      keyword: query.q ?? '',
    };
  },
);

export default Gallery;
