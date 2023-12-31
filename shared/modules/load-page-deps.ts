import {GetServerSidePropsContext} from 'next';
import {PageDeps} from '../types/page-deps';
import {Pages} from '../types/page-props';
import {Knex} from 'knex';

export async function loadPageDeps(
    theme: string,
    deps: string | string[] | PageDeps | PageDeps[],
    ctx: GetServerSidePropsContext,
): Promise<Pages> {
    let _deps: PageDeps[] = [];

    if (typeof deps === 'string') {
        _deps = [{id: deps}];
    } else if (Array.isArray(deps)) {
        for (const dep of deps) {
            if (typeof dep === 'string') {
                _deps.push({id: dep});
            } else {
                _deps.push(dep);
            }
        }
    }

    const database: Knex = (ctx.req as any).knex;
    const sectionIds: string[] = [];
    const pageIds: string[] = [];

    for (const dep of _deps) {
        if (!dep.sections || dep.sections.length === 0) {
            pageIds.push(`${theme}-${dep.id}`);
            continue;
        }

        sectionIds.push(...dep.sections.map((s) => `${theme}-${s}`));
    }

    const sections = await database
        .from('section')
        .select(
            'theme_page_section.page',
            'section.page_section',
            'value',
            'section.sort',
        )
        .join('theme_page_section', 'section.page_section', 'theme_page_section.id')
        .where('section.visible', true)
        .where((qb) =>
            qb
                .whereIn('theme_page_section.page', pageIds)
                .orWhereIn('section.page_section', sectionIds),
        );

    const pages: Pages = {};

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        const pageId = section.page.replace(`${theme}-`, '');
        const sectionId = section.page_section.replace(
            `${theme}-${pageId}-`,
            '',
        );

        if (!pages.hasOwnProperty(pageId)) {
            pages[pageId] = {
                id: pageId,
                sections: {},
            };
        }

        if (!pages[pageId].hasOwnProperty('sections')) {
            pages[pageId].sections = {};
        }

        pages[pageId].sections[sectionId] = {
            id: sectionId,
            sort: Number(section.sort),
            value: section.value,
            visible: true,
        };
    }

    return pages;
}
