import { SiteSettings } from './site-settings';
import { Page } from './page';

export interface Pages {
  [id: string]: Page;
}

export interface PageProps {
  pages: Pages;
  siteSettings: SiteSettings;
  data?: Record<string, any>;
}
