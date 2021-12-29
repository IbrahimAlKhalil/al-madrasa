import { SectionProps } from 'st/section-props';
import {link} from 'shared/dist/modules/link';
import { FunctionComponent } from 'react';
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
                {
                  link(data?.link, (href) => (
                      <Link href={href}>
                        <a className="btn-get-started d-inline-flex align-items-center justify-content-center align-self-center">
                          <span>{data?.link?.label}</span>
                          <i className="mi">arrow_right_alt</i>
                        </a>
                      </Link>
                  ))
                }
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
              alt={data?.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
