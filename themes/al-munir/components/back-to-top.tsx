import { FunctionComponent, useEffect, useState } from 'react';

export const BackToTop: FunctionComponent = () => {
  const [className, setClassName] = useState(
    `back-to-top d-flex align-items-center justify-content-center`,
  );

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setClassName(className + ' active');
      } else {
        setClassName(className);
      }
    });
  });

  return (
    <a href="#" className={className}>
      <i className="mi">arrow_upward</i>
    </a>
  );
};
