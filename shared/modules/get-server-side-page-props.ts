import { ServerSidePropsHook } from '../types/server-side-props-hook';
import { GetServerSidePropsContext } from '../types/next';
import { loadPageDeps } from './load-page-deps';
import { PageProps } from '../types/page-props';
import { PageDeps } from '../types/page-deps';
import { GetServerSideProps } from 'next';
import { merge } from 'lodash';

export const getServerSidePageProps = (
  theme: string,
  deps: string | string[] | PageDeps | PageDeps[],
  hook?: ServerSidePropsHook,
): GetServerSideProps<PageProps> => {
  return async (ctx) => {
    let props: PageProps = {
      pages: await loadPageDeps(theme, deps, ctx),
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
