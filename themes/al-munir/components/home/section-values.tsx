import { SectionProps } from 'st/section-props';
import SectionTitle from 'c/ui/section-title';
import { FunctionComponent } from 'react';
import SubTitle from 'c/ui/sub-title';

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
          alt={props.title}
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
          <SubTitle title={data?.title} />
          <SectionTitle title={data?.subtitle} />
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
