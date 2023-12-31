import { SectionProps } from 'st/section-props';
import SectionTitle from 'c/ui/section-title';
import { FunctionComponent } from 'react';
import SubTitle from 'c/ui/sub-title';

interface FeatureInterface {
  title: string;
}

const Feature: FunctionComponent<FeatureInterface> = (props) => {
  return (
    <div className="col-md-6" data-aos="zoom-out" data-aos-delay={200}>
      <div className="feature-box d-flex align-items-center">
        <i className="mi">check</i>
        <h3>{props.title}</h3>
      </div>
    </div>
  );
};

export const SectionFeatures: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data) {
    return null;
  }

  return (
    <section id="features" className="features">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <SubTitle title={data.title} />
          <SectionTitle title={data.subtitle} />
        </header>
        <div className="row align-content-stretch">
          <div className="col-lg-6">
            <img
              src={`/assets/${data.image}`}
              className="img-fluid h-100 img-fluid"
              alt={data.subtitle}
            />
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
            <div className="row align-self-center gy-4">
              {data.features.map((feature: FeatureInterface) => (
                <Feature {...feature} key={feature.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
