import {FunctionComponent} from 'react';

interface NavMenuInterface {
    title: string;
}

export const NavMenu: FunctionComponent<NavMenuInterface> = (props) => {
    return (
        <div className="col-lg-2 col-6 footer-links">
            <h4>{props.title}</h4>
            <ul>
                {props.children}
            </ul>
        </div>
    );
};
