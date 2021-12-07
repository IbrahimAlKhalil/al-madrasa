import { SectionProps } from 't/section-props';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const SectionIntro: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  return (
    <section id="intro" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">{data?.title ?? 'AL-Madrasah'}</h1>
            <div
              data-aos="fade-up"
              data-aos-delay={400}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
            <div data-aos="fade-up" data-aos-delay={600}>
              <div className="text-center text-lg-start">
                <Link href={data?.link ?? '#'}>
                  <a className="btn-get-started d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>{data?.link_text}</span>
                    <i className="mi">arrow_right_alt</i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 hero-img"
            data-aos="zoom-out"
            data-aos-delay={200}
          >
            <img
              src={`/assets/${data?.image}`}
              className="img-fluid"
              alt="Introduction"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
