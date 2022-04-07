const { registerBlockType } = wp.blocks;
import Edit from './Edit';
import Save from './Save';

registerBlockType('yani/firstblock', {
	title: 'My first block',
	category: 'wprig-blocks',
	icon: 'smiley',
	supports: {
		align: ['wide', 'full']
	},
	description: 'Learning in progress',
	keywords: ['example', 'test'],
	attributes: {
		align: {
			type: 'string',
			default: 'center'
		},
		myRichHeading: {
			type: 'string',
		},
		myRichText: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		toggle: {
			type: 'boolean',
			default: true
		},
		favoriteAnimal: {
			type: 'string',
			default: 'dogs'
		},
		favoriteColor: {
			type: 'string',
			default: '#DDDDDD'
		},
		activateLasers: {
			type: 'boolean',
			default: false
		},
		textAlignment: {
			type: 'string',
		}
	},
	edit: Edit,
	save: Save
});