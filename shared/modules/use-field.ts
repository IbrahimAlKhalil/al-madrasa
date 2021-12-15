import { PageContext } from './page-context';
import { getField } from './get-field';
import { useContext } from 'react';

export function useField<T = any>(
  pageId: string,
  sectionId: string,
  field: string,
  _default: T,
): T {
  const ctx = useContext(PageContext);

  return getField(ctx, pageId, sectionId, field) ?? _default;
}
