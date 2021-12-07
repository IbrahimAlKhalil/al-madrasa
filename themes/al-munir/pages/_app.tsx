import {Fragment, useEffect} from 'react';
import {AppProps} from 'next/app';
import Script from 'next/script';
import aos from 'aos';
import 's/index.scss';

function App({Component, pageProps}: AppProps) {
    useEffect(() => {
        aos.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
        import('bootstrap');
        import('isotope-layout');
    }, []);

    return (
        <Fragment>
            <Component {...pageProps} />
            <Script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"/>
        </Fragment>
    );
}

export default App;
