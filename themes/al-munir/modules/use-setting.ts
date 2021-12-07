import {SiteSettings} from 't/site-settings';
import {useSettings} from 'm/use-settings';

export function useSetting(field: keyof SiteSettings, _default?: any) {
    const settings = useSettings();

    return settings ? settings[field] ?? _default : _default;
}
