import { PaginationLink } from 'c/pagination-link';
import { FunctionComponent } from 'react';

interface PaginationLinksInterface {
  pageCount: number;
  activePage: number;
}

export const PaginationLinks: FunctionComponent<PaginationLinksInterface> = (
  props,
) => {
  const links: ReturnType<typeof PaginationLink>[] = [];
  const intl = new Intl.NumberFormat('bn-BD');

  if (props.pageCount > 1) {
    for (let i = 0; i < props.pageCount; i++) {
      const page = i + 1;

      links.push(
        <PaginationLink
          active={page === props.activePage}
          label={intl.format(page)}
          page={page}
          key={page}
        />,
      );
    }
  }

  return <>{links}</>;
};
