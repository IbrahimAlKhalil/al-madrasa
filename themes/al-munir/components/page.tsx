import { useCustomizer } from 'm/use-customizer';
import { PageContext } from 'm/page-context';
import { FunctionComponent } from 'react';
import { PageProps } from 't/page-props';

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
