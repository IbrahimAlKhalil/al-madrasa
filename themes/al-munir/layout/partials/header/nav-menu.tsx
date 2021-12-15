import { FunctionComponent } from 'react';
import { NavItem } from './nav-item';
import { MenuItem } from 'st/menu';

interface NavMenuInterface {
  items: MenuItem[];
  text?: string;
}

export const NavMenu: FunctionComponent<NavMenuInterface> = (props) => {
  const menuItems = props.items.map((item) => {
    if (item.children?.length) {
      return <NavMenu text={item.label} items={item.children} key={item.id} />;
    }

    return <NavItem text={item.label} href={item.link} key={item.id} />;
  });

  if (props.text) {
    return (
      <li className="dropdown">
        <a href="#">
          <span>{props.text}</span>
          <i className="bi bi-chevron-down" />
        </a>

        <ul>{menuItems}</ul>
      </li>
    );
  }

  return <ul>{menuItems}</ul>;
};
