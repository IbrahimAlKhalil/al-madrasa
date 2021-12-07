import { Section } from 't/section';

export interface Page {
  id: string;
  sections: {
    [id: string]: Section;
  };
}
