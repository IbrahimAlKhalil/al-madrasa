import { ServerSidePropsHook } from 'st/server-side-props-hook';
import { loadRelation } from 'sm/load-relation';

export const loadRelations: ServerSidePropsHook = async (props, ctx) => {
  await loadRelation(props, ctx, 'menu', 'general', 'header', 'main_menu', [
    'id',
    'items',
  ]);
};
