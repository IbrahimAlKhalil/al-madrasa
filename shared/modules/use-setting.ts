import { SiteSettings } from '../types/site-settings';
import { useSettings } from './use-settings';

export function useSetting(field: keyof SiteSettings, _default: any = null) {
  const settings = useSettings();

  return settings ? settings[field] ?? _default : _default;
}
