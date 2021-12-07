import { SectionProps } from 't/section-props';
import { FunctionComponent } from 'react';
import Link from 'next/link';

export const SectionAbout: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">
          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className="content">
              <h3>{data?.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: data?.subtitle }} />
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              <div className="text-center text-lg-start">
                <Link href={data?.link ?? '#'}>
                  <a className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>{data?.link_text}</span>
                    <i className="mi">arrow_right_alt</i>
                  </a>
                </Link>
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
            />
          </div>
        </div>
      </div>
    </section>
  );
};