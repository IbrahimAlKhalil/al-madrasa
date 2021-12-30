import { FunctionComponent } from 'react';
import {Link} from 'shared/types/link';
import { NavItem } from './nav-item';
import { NavMenu } from './nav-menu';

interface MenuInterface {
  title: string;
  links: Link[];
}

export const Menu: FunctionComponent<MenuInterface> = (props) => {
  return (
    <NavMenu title={props.title}>
      {props.links.map((item) => (
        <NavItem {...item} key={item.id ?? item.label ?? item.url} />
      ))}
    </NavMenu>
  );
};
