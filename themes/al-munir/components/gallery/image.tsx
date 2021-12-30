import { FunctionComponent } from 'react';

export interface ImageInterface {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const Image: FunctionComponent<ImageInterface> = (props) => {
  return (
    <div
      className="col-md-6 portfolio-item"
      data-aos="fade-up"
      data-aos-delay={200}
    >
      <div className="portfolio-wrap">
        <img
          src={`/assets/${props.image}`}
          className="img-fluid"
          alt={props.title}
        />
        <div className="portfolio-info">
          <h4>{props.title}</h4>
          <div className="portfolio-links">
            <a
              href={`/assets/${props.image}`}
              className="portfokio-lightbox"
              data-description={props.description}
              data-title={props.title}
              data-type="image"
            >
              <i className="mi">add</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
