import { FunctionComponent, useEffect } from 'react';
import { SectionProps } from 'st/section-props';
import { Swiper } from 'swiper';

interface NoticeInterface {
  notice: string;
}

export const Notice: FunctionComponent<NoticeInterface> = (props) => {
  return (
    <div className="swiper-slide">
      <div className="notice-item" dangerouslySetInnerHTML={{__html: props.notice}}/>
    </div>
  );
};

export const SectionNotice: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  useEffect(() => {
    const swipper = new Swiper('.notice-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 1,
        },
      },
    });

    return () => {
      try {
        swipper.destroy(true, true);
      } catch (e) {
        //
      }
    };
  }, []);

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section id="notice-box" className="notice-box">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
        </header>

        <div
          className="notice-slider swiper-container"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <i className="mi notice-icon">campaign</i>

          <div className="swiper-wrapper">
            {data.items.map((item: NoticeInterface) => (
              <Notice {...item} key={item.notice} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
