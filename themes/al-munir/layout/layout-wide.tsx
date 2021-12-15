import { Header } from './partials/header/header';
import { Footer } from './partials/footer/footer';
import { useSetting } from 'sm/use-setting';
import { FunctionComponent } from 'react';
import Head from 'next/head';

export const LayoutWide: FunctionComponent = (props) => {
  const title = useSetting('title');
  const description = useSetting('description');
  const keywords = useSetting('keywords');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <main>{props.children}</main>

      <Footer />
    </>
  );
};
