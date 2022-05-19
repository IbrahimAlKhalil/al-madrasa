import { FunctionComponent } from 'react';

export const Copyright: FunctionComponent = () => {
  const year = new Date().getFullYear();
  return (
    <div className="container">
      <div className="copyright">
        {year} &copy; &nbsp;
        <strong>
          <span>SAHARA IT</span>
        </strong>
        . All Rights Reserved
      </div>
    </div>
  );
};
