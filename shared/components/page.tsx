import { useCustomizer } from '../modules/use-customizer';
import { PageContext } from '../modules/page-context';
import { PageProps } from '../types/page-props';
import { FunctionComponent } from 'react';

interface PageInterface {
  pageProps: PageProps;
}

export const Page: FunctionComponent<PageInterface> = (props) => {
  const pageProps = useCustomizer(props.pageProps);

  return (
    <PageContext.Provider value={pageProps}>
      {props.children}
    </PageContext.Provider>
  );
};
