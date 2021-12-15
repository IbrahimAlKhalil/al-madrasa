import { GetServerSidePropsContext } from './next';
import { PageProps } from './page-props';

export type ServerSidePropsHook = (
  props: PageProps,
  ctx: GetServerSidePropsContext,
) => Promise<Partial<PageProps>> | Partial<PageProps> | Promise<void> | void;
