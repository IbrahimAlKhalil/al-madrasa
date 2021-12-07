import {GetServerSidePropsContext} from 't/next';
import {PageProps} from 't/page-props';

export type ServerSidePropsHook = (props: PageProps, ctx: GetServerSidePropsContext) => Promise<Partial<PageProps>> | Partial<PageProps> | Promise<void> | void;
