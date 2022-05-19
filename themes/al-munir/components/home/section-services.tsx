import { Link as LintInterface } from 'shared/types/link';
import { SectionProps } from 'st/section-props';
import { link } from 'shared/dist/modules/link';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import SectionTitle from 'c/ui/section-title';
import SubTitle from 'c/ui/sub-title';

interface ServiceInterface {
  title: string;
  description: string;
  link: LintInterface;
  color: string;
  icon?: string;
}

const Service: FunctionComponent<ServiceInterface> = (props) => {
  const style = {
    '--color': props.color,
  };

  return (
    <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
      <div className="service-box" style={style as any}>
        <i className="mi icon">{props.icon ?? 'miscellaneous_services'}</i>
        <h3>{props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.description }} />
        {link(props.link, (href) => (
          <Link href={href}>
            <a className="read-more">
              <span>আরও পরুন</span>
              <i className="mi">arrow_right_alt</i>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SectionServices: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data) {
    return null;
  }

  return (
    <section id="services" className="services">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <SubTitle title={data?.title} />
          <SectionTitle title={data.subtitle} />
        </header>
        <div className="row gy-4">
          {data.services.map((service: ServiceInterface) => (
            <Service {...service} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
