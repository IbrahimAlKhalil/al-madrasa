import {getServerSidePageProps as base} from 'sm/get-server-side-page-props';
import {ServerSidePropsHook} from 'st/server-side-props-hook';
import {PageDeps} from 'st/page-deps';

export function getServerSidePageProps(
    deps: string | string[] | PageDeps | PageDeps[],
    hook?: ServerSidePropsHook,
): ReturnType<typeof base> {
    return base('al-munir', deps, hook);
}
