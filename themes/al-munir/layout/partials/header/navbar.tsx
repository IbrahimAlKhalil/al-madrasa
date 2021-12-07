import {FunctionComponent} from 'react';
import {useField} from 'm/use-field';
import {NavMenu} from './nav-menu';
import {useNav} from 'm/use-nav';
import {Menu} from 't/menu';


export const Navbar: FunctionComponent = () => {
    const {navClass, btnClass, update} = useNav();
    const menu = useField<Menu>('general', 'header', 'main_menu');

    return (
        <nav className={navClass}>
            <NavMenu items={menu.items}/>

            <i className={btnClass} onClick={update}/>
        </nav>
    );
};
