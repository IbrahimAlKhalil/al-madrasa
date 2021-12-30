import { Link as LinkInterface } from 'shared/types/link';
import { SectionProps } from 'st/section-props';
import { link } from 'shared/dist/modules/link';
import { FunctionComponent } from 'react';
import Link from 'next/link';

interface PriceInterface {
  title: string;
  price: number;
  basis: string;
  color: string;
  link: LinkInterface;
  features: { name: string; strikethrough: boolean }[];
  image: string;
  featured: string;
}

const Price: FunctionComponent<PriceInterface> = (props) => {
  return (
    <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={400}>
      <div className="box">
        {props.featured ? (
          <span className="featured">{props.featured}</span>
        ) : null}
        <h3 style={{ color: props.color }}>{props.title}</h3>
        <div className="price">
          <sup>৳</sup>
          {props.price}
          <span> / {props.basis}</span>
        </div>
        <img
          src={`/assets/${props.image}`}
          className="img-fluid"
          alt={props.title}
        />
        <ul>
          {props.features.map((feature) => (
            <li
              className={`${feature.strikethrough ? 'na' : ''}`}
              key={feature.name}
            >
              {feature.name}
            </li>
          ))}
        </ul>
        {link(props.link, (href) => (
          <Link href={href}>
            <a className="btn-buy">{props.link.label}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SectionPricing: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data) {
    return null;
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
        </header>
        <div className="row gy-4" data-aos="fade-left">
          {data.items.map((item: PriceInterface) => (
            <Price {...item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
