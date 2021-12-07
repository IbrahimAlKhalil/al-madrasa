import InterfaceFileImage from './file-image-repeater.vue';
import { defineInterface } from '@directus/shared/utils';

export default defineInterface({
	id: 'file-image-repeater',
	name: 'Image (Repeater)',
	description: '$t:interfaces.file-image.description',
	icon: 'insert_photo',
	component: InterfaceFileImage,
	types: ['uuid'],
	localTypes: ['file'],
	group: 'relational',
	options: [
		{
			field: 'folder',
			name: '$t:interfaces.system-folder.folder',
			type: 'uuid',
			meta: {
				width: 'full',
				interface: 'system-folder',
				note: '$t:interfaces.system-folder.field_hint',
			},
			schema: {
				default_value: undefined,
			},
		},
	],
	recommendedDisplays: ['image'],
});
