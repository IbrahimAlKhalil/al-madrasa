import {SectionProps} from 't/section-props';
import {FunctionComponent} from 'react';
import Link from 'next/link';

interface ServiceInterface {
    title: string;
    description: string;
    link: string;
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
                <div dangerouslySetInnerHTML={{__html: props.description}}/>
                <Link href={props.link}>
                    <a className="read-more">
                        <span>Read More</span>
                        <i className="mi">arrow_right_alt</i>
                    </a>
                </Link>
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
                    <h2>{data.title}</h2>
                    <p>{data.subtitle}</p>
                </header>
                <div className="row gy-4">
                    {
                        data.services.map((service: ServiceInterface) => <Service {...service} key={service.title}/>)
                    }
                </div>
            </div>
        </section>
    );
};
