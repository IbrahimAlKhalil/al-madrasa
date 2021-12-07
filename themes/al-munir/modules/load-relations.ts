import {ServerSidePropsHook} from 't/server-side-props-hook';
import {loadRelation} from 'm/load-relation';

export const loadRelations: ServerSidePropsHook = async (props, ctx) => {
    await loadRelation(
        props,
        ctx,
        'menu',
        'general',
        'header',
        'main_menu',
        ['id', 'items']
    );
};
