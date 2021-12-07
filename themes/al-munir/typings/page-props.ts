import { SiteSettings } from 't/site-settings';
import { Page } from 't/page';

export interface Pages {
  [id: string]: Page;
}

export interface PageProps {
  pages: Pages;
  siteSettings: SiteSettings;
  data?: Record<string, any>;
}
