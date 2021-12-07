import { FunctionComponent, useEffect } from 'react';
import { SectionProps } from 't/section-props';
import { Swiper } from 'swiper';

interface TestimonyInterface {
  name: string;
  designation: string;
  photo: string;
  comment: string;
}

export const Testimony: FunctionComponent<TestimonyInterface> = (props) => {
  return (
    <div className="swiper-slide">
      <div className="testimonial-item">
        <div className="stars">
          <i className="mi">star</i>
          <i className="mi">star</i>
          <i className="mi">star</i>
          <i className="mi">star</i>
          <i className="mi">star</i>
        </div>
        <p>{props.comment}</p>
        <div className="profile mt-auto">
          <img
            src={`/assets/${props.photo}`}
            className="testimonial-img"
            alt={props.name}
          />
          <h3>{props.name}</h3>
          <h4>{props.designation}</h4>
        </div>
      </div>
    </div>
  );
};

export const SectionTestimonial: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  useEffect(() => {
    const swipper = new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 3,
        },
      },
    });

    return () => {
      swipper.destroy(true, true);
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </header>
        <div
          className="testimonials-slider swiper-container"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="swiper-wrapper">
            {data.items.map((item: TestimonyInterface) => (
              <Testimony {...item} key={item.name} />
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
};
