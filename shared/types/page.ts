import { Section } from './section';

export interface Page {
  id: string;
  sections: {
    [id: string]: Section;
  };
}
