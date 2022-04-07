const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
import Edit from './Edit';
import Save from './Save';
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/car-item', {
	title: __('Carousel Item'),
	description: 'Add flexibly resizable and customizable columns in your site.',
	category: 'wprig-blocks',
	icon: 'universal-access-alt',
	parent: ['wprig/row'],
	supports: { inserter: false, reusable: false, html: false },
	attributes: {
		uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
		// Dimension
		colWidth: { type: 'object', default: { md: 50, sm: 50, xs: 100, unit: '%', device: 'md' }, style: [{ selector: '{{WPRIG}}.wprig-column-front {flex:{{colWidth}};} {{WPRIG}}.wprig-column-front {max-width:{{colWidth}};}' }] },
		padding: {
			type: 'object',
			default: {
				md: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				unit: 'px',
			},
			style: [{ selector: '{{WPRIG}} > .wprig-column-inner {padding: {{padding}};}' }]
		},

		margin: {
			type: 'object',
			default: {
				md: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				unit: 'px',
			},
			style: [{ selector: '{{WPRIG}} > .wprig-column-inner {margin: {{margin}};}' }]
		},

		// Style
		colBg: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} > .wprig-column-inner' }] },
		colBorder: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} > .wprig-column-inner' }] },
		colShadow: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} > .wprig-column-inner' }] },

		borderRadius: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} > .wprig-column-inner' }] },

		// Responsive
		hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{WPRIG}}{display:none;}' }] },
		hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{WPRIG}}{display:none;}' }] },

		// Advanced Settings
		colZindex: { type: 'number', default: '', style: [{ selector: '{{WPRIG}} > .wprig-column-inner{z-index:{{colZindex}};}' }] },
		colCss: { type: 'string', default: '', style: [{ selector: '' }] },
	},
	edit: Edit,
	save: Save
})