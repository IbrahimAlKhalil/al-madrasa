import { useSetting } from 'm/use-setting';
import { FunctionComponent } from 'react';
import { Navbar } from './navbar';
import Link from 'next/link';
import { useField } from 'm/use-field';

export const Header: FunctionComponent = () => {
  const logo = useSetting('logo');
  const title = useSetting('title', 'Al-Madrasah');
  const showTitle = useField('general', 'header', 'show_title', true);

  return (
    <header id="header" className="header fixed-top">
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
