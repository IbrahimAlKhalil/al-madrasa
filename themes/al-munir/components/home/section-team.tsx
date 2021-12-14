import { SectionProps } from 't/section-props';
import { FunctionComponent } from 'react';
// import Link from 'next/link';

interface MemberInterface {
  name: string;
  designation: string;
  photo: string;
  description: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export const Member: FunctionComponent<MemberInterface> = (props) => {
  return (
    <div
      className="col-lg-3 col-md-6 d-flex align-items-stretch"
      data-aos="fade-up"
      data-aos-delay={100}
    >
      <div className="member">
        <div className="member-img">
          <img
            src={`/assets/${props.photo}`}
            className="img-fluid"
            alt={props.description}
          />
          {/*<div className="social">
                        {
                            props.facebook ?
                                <Link href={props.facebook}>
                                    <i className="mi">facebook</i>
                                </Link> : null
                        }
                        {
                            props.linkedin ?
                                <Link href={props.linkedin}>
                                    <i className="mi">linkedin</i>
                                </Link> : null
                        }
                        {
                            props.youtube ?
                                <Link href={props.youtube}>
                                    <i className="mi">youtube</i>
                                </Link> : null
                        }
                    </div>*/}
        </div>
        <div className="member-info">
          <h4>{props.name}</h4>
          <span>{props.designation}</span>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export const SectionTeam: FunctionComponent<SectionProps> = (props) => {
  const data = props.data?.value;

  if (!data) {
    return null;
  }

  return (
    <section id="team" className="team">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
        </header>
        <div className="row gy-4">
          {data.members.map((member: MemberInterface) => (
            <Member {...member} key={member.name} />
          ))}
        </div>
      </div>
    </section>
  );
};
