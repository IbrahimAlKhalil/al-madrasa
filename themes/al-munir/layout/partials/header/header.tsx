import { useSetting } from 'm/use-setting';
import { FunctionComponent } from 'react';
import { Navbar } from './navbar';
import Link from 'next/link';

export const Header: FunctionComponent = () => {
  const logo = useSetting('logo');
  const title = useSetting('title', 'Al-Madrasah');

  return (
    <header id="header" className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link href="/">
          <a className="logo d-flex align-items-center">
            {
              logo ? <img src={`/assets/${logo}`} alt={title} /> : null
            }
            <span>{title}</span>
          </a>
        </Link>

        <Navbar />
      </div>
    </header>
  );
};
