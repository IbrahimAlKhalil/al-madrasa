import { ServerSidePropsHook } from 't/server-side-props-hook';
import { GetServerSidePropsContext } from 't/next';
import { loadPageDeps } from 'm/load-page-deps';
import { GetServerSideProps } from 'next';
import { PageProps } from 't/page-props';
import { PageDeps } from 't/page-deps';
import { merge } from 'lodash';

export const loadPageData = (
  deps: string | string[] | PageDeps | PageDeps[],
  hook?: ServerSidePropsHook,
): GetServerSideProps<PageProps> => {
  return async (ctx) => {
    let props: PageProps = {
      pages: await loadPageDeps(deps, ctx),
      siteSettings: (ctx as GetServerSidePropsContext).req.siteSettings,
    };

    if (typeof hook === 'function') {
      const hooked = await hook(props, ctx as GetServerSidePropsContext);

      if (hooked) {
        props = merge(props, hooked);
      }
    }

    return { props };
  };
};
