import {useSection} from 'm/use-section';
import {FunctionComponent} from 'react';
import {Copyright} from './copyright';
import {Contact} from './contact';
import {About} from './about';
import {Menu} from './menu';

export const Footer: FunctionComponent = () => {
    const rightMenu = useSection('general', 'footer-right-menu')?.value;
    const leftMenu = useSection('general', 'footer-left-menu')?.value;

    return (
        <footer id="footer" className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row gy-4">
                        <About/>

                        <Menu title={leftMenu?.title} links={leftMenu?.links ?? []}/>

                        <Menu title={rightMenu?.title} links={rightMenu?.links ?? []}/>

                        <Contact/>
                    </div>
                </div>
            </div>

            <Copyright/>
        </footer>
    );
};
