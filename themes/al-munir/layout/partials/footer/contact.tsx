import { useSection } from 'sm/use-section';
import { FunctionComponent } from 'react';

export const Contact: FunctionComponent = () => {
  const section = useSection('general', 'footer-contact')?.value;

  return (
    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
      <h4>{section?.title}</h4>

      <div dangerouslySetInnerHTML={{ __html: section?.contact_info }} />

      {/* <p>
        <strong>Phone:</strong> {section?.phone}
        <br />
        <strong>Email:</strong> {section?.email}
        <br />
      </p> */}
    </div>
  );
};
