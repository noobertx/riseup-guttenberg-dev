import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
import attributes from './attributes';
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/heading', {
	title: __('Heading'),
	description: 'Make headlines/titles that attract users with WPRIG Heading.',
	category: 'wprig-blocks',
	icon: "universal-access-alt",
	supports: {
		align: ['center', 'wide', 'full'],
		anchor: true
	},
	keywords: [__('heading'), __('head'), __('title')],
	example: {
		attributes: {
			content: __('Make headlines/titles that attract users with WPRIG Heading.', 'wprig')
		},
	},
	attributes,
	edit: Edit,
	save: Save,
});