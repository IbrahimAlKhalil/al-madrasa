import { Component, Fragment } from 'react';
import { AppProps } from 'next/app';
import aos from 'aos';
import 's/index.scss';

export default class App extends Component<AppProps, {}> {
  async componentDidMount() {
    await import('bootstrap');
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
      </Fragment>
    );
  }
}
