import { PageContext } from 'm/page-context';
import { getSection } from 'm/get-section';
import { useContext } from 'react';

export function useSection(pageId: string, sectionId: string) {
  const ctx = useContext(PageContext);

  return getSection(ctx, pageId, sectionId);
}
