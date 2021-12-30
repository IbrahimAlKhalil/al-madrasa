import { useState } from 'react';

export function useNav() {
  const [visible, toggle] = useState(false);

  const navDefaultClass = 'navbar';

  return {
    navClass: visible ? `${navDefaultClass} navbar-mobile` : navDefaultClass,
    btnIcon: visible ? 'close' : 'menu',
    update() {
      toggle(!visible);
    },
  };
}
