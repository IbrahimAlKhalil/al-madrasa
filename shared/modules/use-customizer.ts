// import { OnMessageHandler } from 'broadcast-channel/types/broadcast-channel';
// import { BroadcastChannel } from 'broadcast-channel';
// import { clone, isObject, merge } from 'lodash';
import { /*useEffect,*/ useState } from 'react';
import { PageProps } from '../types/page-props';

// type BroadcastEvent = {
//   type: 'field' | 'sort' | 'visibility';
//   pageId: string;
//   sectionId: string;
//   data: any;
// };

export function useCustomizer(props: PageProps) {
  const [pageProps /*update*/] = useState(props);

  // useEffect(() => {
  //   const handle: OnMessageHandler<BroadcastEvent> = (event) => {
  //     const { pageId, sectionId } = event;
  //
  //     if (!pageProps.pages.hasOwnProperty(pageId)) {
  //       pageProps.pages[pageId] = {
  //         id: pageId,
  //         sections: {},
  //       };
  //     }
  //
  //     const page = pageProps.pages[pageId];
  //
  //     if (!page.sections.hasOwnProperty(sectionId)) {
  //       page.sections[sectionId] = {
  //         id: sectionId,
  //         sort: 0,
  //         visible: true,
  //         value: {},
  //       };
  //     }
  //
  //     const section = page.sections[sectionId];
  //
  //     switch (event.type) {
  //       case 'sort':
  //         section.sort = event.data;
  //         break;
  //       case 'visibility':
  //         section.visible = event.data;
  //         break;
  //       default:
  //         if (!section.value) {
  //           section.value = event.data;
  //           return update(clone(pageProps));
  //         }
  //
  //         const { value } = section;
  //
  //         for (const key of Object.keys(event.data)) {
  //           if (value[key] === null || event.data[key] === null) {
  //             continue;
  //           }
  //
  //           if (
  //               Array.isArray(value[key]) &&
  //               !Array.isArray(event.data[key])
  //           ) {
  //             return location.reload();
  //           }
  //
  //           if (isObject(value[key]) && !isObject(event.data[key])) {
  //             return location.reload();
  //           }
  //
  //           if (typeof value[key] !== typeof event.data[key]) {
  //             return location.reload();
  //           }
  //         }
  //
  //         merge(value, event.data);
  //         update(clone(pageProps));
  //     }
  //   };
  //
  //   const channel = new BroadcastChannel(
  //       `am-customizer-${props.siteSettings.themeId}`,
  //   );
  //   channel.addEventListener('message', handle);
  //
  //   return () => {
  //     channel.removeEventListener('message', handle);
  //   };
  // }, []);

  return pageProps;
}
