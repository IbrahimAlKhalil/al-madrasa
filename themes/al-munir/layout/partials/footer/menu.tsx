import { FunctionComponent } from 'react';
import { NavItem } from './nav-item';
import { NavMenu } from './nav-menu';

interface MenuInterface {
  title: string;
  links: { link: string; link_text: string }[];
}

export const Menu: FunctionComponent<MenuInterface> = (props) => {
  return (
    <NavMenu title={props.title}>
      {props.links.map((item) => (
        <NavItem title={item.link_text} href={item.link} key={item.link_text} />
      ))}
    </NavMenu>
  );
};
