import { FunctionComponent } from 'react';
import { NavItem } from './nav-item';
import { MenuItem } from 'st/menu';

interface NavMenuInterface {
  items: MenuItem[];
  label?: string;
}

export const NavMenu: FunctionComponent<NavMenuInterface> = (props) => {
  const menuItems = props.items.map((item) => {
    if (item.children?.length) {
      return <NavMenu label={item.link.label} items={item.children} key={item.id} />;
    }

    return <NavItem link={item.link} key={item.id} />;
  });

  if (props.label) {
    return (
      <li className="dropdown">
        <a href="#">
          <span>{props.label}</span>
          <i className="bi bi-chevron-down" />
        </a>

        <ul>{menuItems}</ul>
      </li>
    );
  }

  return <ul>{menuItems}</ul>;
};
