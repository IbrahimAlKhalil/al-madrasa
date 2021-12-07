import { SectionProps } from 't/section-props';
import { FunctionComponent } from 'react';

interface ValueInterface {
  title: string;
  description: string;
  image: string;
}

const Value: FunctionComponent<ValueInterface> = (props) => {
  return (
    <div className="col-lg-4 mt-4 mt-lg-0 pt-4">
      <div className="box" data-aos="fade-up" data-aos-delay={200}>
        <img
          src={`/assets/${props.image}`}
          className="img-fluid"
        />
        <h3>{props.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
    </div>
  );
};

export const SectionValues: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;
  const items: ValueInterface[] =
    data && Array.isArray(data.items) ? data.items : [];

  return (
    <section id="values" className="values">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data?.title}</h2>
          <p>{data?.subtitle}</p>
        </header>
        <div className="row">
          {items.map((item) => (
            <Value {...item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
