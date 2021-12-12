import { Component, Fragment } from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import aos from 'aos';
import 's/index.scss';

export default class App extends Component<AppProps> {
  async componentDidMount() {
    await import('bootstrap');
    await import('isotope-layout');
    aos.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  render() {
    const { pageProps, Component: Comp } = this.props;

    return (
      <Fragment>
        <Comp {...pageProps} />
        <Script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js" />
      </Fragment>
    );
  }
}
