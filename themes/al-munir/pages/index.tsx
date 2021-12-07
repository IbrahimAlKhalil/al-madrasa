import { SectionTestimonial } from 'c/home/section-testimonial';
import { SectionFeatures } from 'c/home/section-features';
import { SectionServices } from 'c/home/section-services';
import { SectionPricing } from 'c/home/section-pricing';
import { SectionValues } from 'c/home/section-values';
import { SectionCounts } from 'c/home/section-counts';
import { SectionAbout } from 'c/home/section-about';
import { SectionIntro } from 'c/home/section-intro';
import { LayoutWide } from '../layout/layout-wide';
import { SectionTeam } from 'c/home/section-team';
import { loadRelations } from 'm/load-relations';
import { loadPageData } from 'm/load-page-data';
import { BackToTop } from 'c/back-to-top';
import { PageProps } from 't/page-props';
import { Sections } from 'c/sections';
import { NextPage } from 'next';
import { Page } from 'c/page';

const Home: NextPage<PageProps> = (props) => {
  const sections = {
    intro: SectionIntro,
    about: SectionAbout,
    values: SectionValues,
    counts: SectionCounts,
    features: SectionFeatures,
    services: SectionServices,
    pricing: SectionPricing,
    testimonial: SectionTestimonial,
    team: SectionTeam,
  };

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Sections pageId="frontpage" sections={sections} />

        <BackToTop />
      </LayoutWide>
    </Page>
  );
};

export const getServerSideProps = loadPageData(
  ['general', 'frontpage'],
  loadRelations,
);

export default Home;