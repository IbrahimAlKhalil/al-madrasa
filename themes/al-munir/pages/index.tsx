import { getServerSidePageProps } from 'm/get-server-side-page-props';
import { SectionTestimonial } from 'c/home/section-testimonial';
import { SectionFeatures } from 'c/home/section-features';
import { SectionServices } from 'c/home/section-services';
import { SectionPricing } from 'c/home/section-pricing';
import { SectionValues } from 'c/home/section-values';
import {SectionContact} from 'c/home/section-contact';
import { SectionCounts } from 'c/home/section-counts';
import { SectionAbout } from 'c/home/section-about';
import { SectionIntro } from 'c/home/section-intro';
import { LayoutWide } from '../layout/layout-wide';
import { SectionTeam } from 'c/home/section-team';
import { loadRelations } from 'm/load-relations';
import { PageProps } from 'st/page-props';
import { Sections } from 'sc/sections';
import { NextPage } from 'next';
import { Page } from 'sc/page';

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
    contact: SectionContact
  };

  return (
    <Page pageProps={props}>
      <LayoutWide>
        <Sections pageId="frontpage" sections={sections} />
      </LayoutWide>
    </Page>
  );
};

export const getServerSideProps = getServerSidePageProps(
  ['general', 'frontpage'],
  loadRelations,
);

export default Home;
