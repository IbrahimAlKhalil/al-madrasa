import {Swiper, SwiperSlide} from 'swiper/react';
import {SectionProps} from 'st/section-props';
import {Pagination, Autoplay} from 'swiper';
import {FunctionComponent} from 'react';

interface SlideInterface {
    name: string;
    image: string;
    description: string;
}

export const SectionSlider: FunctionComponent<SectionProps> = (props) => {
    const data = props.data?.value;

    if (!data) {
        return <div></div>;
    }

    return (
        <section id="intro-slider" className="intro-slider">
            <Swiper
                autoplay={{ disableOnInteraction: true }}
                modules={[Pagination, Autoplay]}
                className="slider-swiper"
                centeredSlides={true}
                slidesPerView={1}
                loop={true}
            >
                {data.slides.map((slide: SlideInterface) => (
                    <SwiperSlide key={slide.name}>
                        <div>
                            <div className="text">
                                <h2 className="name">{slide.name}</h2>
                                <br/>
                                <p className="description">{slide.description}</p>
                            </div>

                            <img
                                src={`/assets/${slide.image}`}
                                alt={slide.name}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
