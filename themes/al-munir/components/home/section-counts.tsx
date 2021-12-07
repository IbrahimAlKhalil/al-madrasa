import { SectionProps } from 't/section-props';
import { FunctionComponent } from 'react';

interface CountInterface {
  title: string;
  icon: string;
  count: number;
  color?: number;
}

const Count: FunctionComponent<CountInterface> = (props) => {
  const style = props.color
    ? {
        color: props.color,
      }
    : {};

  return (
    <div className="col-lg-3 col-md-6">
      <div className="count-box">
        <i className="mi" style={style as any}>
          {props.icon}
        </i>
        <div>
          <span
            data-purecounter-start={0}
            data-purecounter-end={props.count}
            data-purecounter-duration={1}
            className="purecounter"
          />
          <p>{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export const SectionCounts: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data?.counts) {
    return null;
  }

  return (
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">
        <div className="row gy-4">
          {data.counts.map((count: CountInterface) => (
            <Count {...count} key={count.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
