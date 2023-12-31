import { link } from 'shared/dist/modules/link';
import { SectionProps } from 'st/section-props';
import { FunctionComponent } from 'react';
import SubTitle from 'c/ui/sub-title';
import Link from 'next/link';

export const SectionAbout: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">
          <div
            className="col-lg-6 order-2 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className="content">
              <SubTitle title={data?.title} />
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              <div className="text-center text-lg-start">
                {link(data?.link, (href) => (
                  <Link href={href}>
                    <a className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>{data?.link?.label ?? href}</span>
                      <i className="mi">arrow_right_alt</i>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay={200}
          >
            <img
              src={`/assets/${data?.image}`}
              className="img-fluid"
              alt={data?.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
