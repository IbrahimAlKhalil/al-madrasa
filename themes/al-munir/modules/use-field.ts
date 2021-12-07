import {PageContext} from 'm/page-context';
import {getField} from 'm/get-field';
import {useContext} from 'react';

export function useField<T = any>(pageId: string, sectionId: string, field: string, _default: any = null): T {
    const ctx = useContext(PageContext);

    return getField(ctx, pageId, sectionId, field) ?? _default;
}
