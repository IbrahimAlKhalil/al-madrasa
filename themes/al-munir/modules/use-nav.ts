import { useState } from 'react';

export function useNav() {
  const [visible, toggle] = useState(false);

  const navDefaultClass = 'navbar';
  const btnDefaultClass = 'bi mobile-nav-toggle';

  return {
    navClass: visible ? `${navDefaultClass} navbar-mobile` : navDefaultClass,
    btnClass: visible
      ? `${btnDefaultClass} bi-x`
      : `${btnDefaultClass} bi-list`,
    update() {
      toggle(!visible);
    },
  };
}
