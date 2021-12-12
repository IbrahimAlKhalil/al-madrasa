import { Component } from 'react';

interface State {
  active: boolean;
}

export class BackToTop extends Component<null, State> {
  state = {
    active: typeof window !== 'undefined' && window.scrollY > 100,
  };

  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.setState({
        active: window.scrollY > 100,
      });
    });
  }

  render() {
    const className = `back-to-top d-flex align-items-center justify-content-center`;

    return (
      <a
        href="#"
        className={`${className}${this.state.active ? ' active' : ''}`}
      >
        <i className="mi">arrow_upward</i>
      </a>
    );
  }
}
