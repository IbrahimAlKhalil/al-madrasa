import { FunctionComponent } from 'react';
import { useField } from 'sm/use-field';
import { NavMenu } from './nav-menu';
import { useNav } from 'm/use-nav';
import { Menu } from 'st/menu';

export const Navbar: FunctionComponent = () => {
  const { navClass, btnIcon, update } = useNav();
  const menu = useField<Menu>('general', 'header', 'main_menu', {
    id: 0,
    items: [
      {
        id: 'm1',
        link: {
          type: 'custom',
          label: 'Home',
          url: '/',
        },
        children: [],
      },
      {
        id: 'm2',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact',
        },
        children: [],
      },
      {
        id: 'm3',
        link: {
          type: 'custom',
          url: 'https://saharait.com',
          label: 'Exam Result',
        },
        children: [],
      },
    ],
  });

  return (
    <nav className={navClass}>
      <NavMenu items={menu.items} />

      <i className="mi mobile-nav-toggle" onClick={update}>
        {btnIcon}
      </i>
    </nav>
  );
};
