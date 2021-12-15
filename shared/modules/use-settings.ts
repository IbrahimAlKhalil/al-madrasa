import { SiteSettings } from '../types/site-settings';
import { PageContext } from './page-context';
import { useContext } from 'react';

export function useSettings(_default?: Partial<SiteSettings>) {
  const settings = useContext(PageContext)?.siteSettings ?? null;

  if (!_default) {
    return settings;
  }

  return { ..._default, ...settings };
}
