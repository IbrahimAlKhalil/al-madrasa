import { useSetting } from 'sm/use-setting';
import { FunctionComponent } from 'react';
import { useField } from 'sm/use-field';
import { Navbar } from './navbar';
import Link from 'next/link';

export const Header: FunctionComponent = () => {
  const logo = useSetting('logo');
  const title = useSetting('title', 'Al-Madrasah');
  const showTitle = useField('general', 'header', 'show_title', true);

  return (
    <header id="header" className="header sticky-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link href="/">
          <a className="logo d-flex align-items-center">
            {logo ? <img src={`/assets/${logo}`} alt={title} /> : null}
            {showTitle ? <span>{title}</span> : null}
          </a>
        </Link>

        <Navbar />
      </div>
    </header>
  );
};
