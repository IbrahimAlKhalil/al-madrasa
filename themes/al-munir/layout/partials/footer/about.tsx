import { useSection } from 'm/use-section';
import { useSetting } from 'm/use-setting';
import { FunctionComponent } from 'react';
import Link from 'next/link';

export const About: FunctionComponent = () => {
  const logo = useSetting('logo');
  const title = useSetting('title');
  const section = useSection('general', 'footer-about')?.value;

  return (
    <div className="col-lg-5 col-md-12 footer-info">
      <Link href="/">
        <a className="logo d-flex align-items-center">
          <img src={`/assets/${logo}`} alt={title} />
          <span>{title}</span>
        </a>
      </Link>

      <div dangerouslySetInnerHTML={{ __html: section?.about }} />

      <div className="social-links mt-3">
        {section?.twitter ? (
          <Link href={section?.twitter}>
            <a className="twitter">
              <i className="mi">language</i>
            </a>
          </Link>
        ) : null}

        {section?.facebook ? (
          <Link href={section?.facebook}>
            <a className="facebook">
              <i className="mi">facebook</i>
            </a>
          </Link>
        ) : null}

        {section?.instagram ? (
          <Link href={section?.instagram}>
            <a className="instagram">
              <i className="mi">instagram</i>
            </a>
          </Link>
        ) : null}

        {section?.linked_in ? (
          <Link href={section?.linked_in}>
            <a className="linkedin">
              <i className="mi">linkedin</i>
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
