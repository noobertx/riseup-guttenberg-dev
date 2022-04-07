/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
const { __ } = wp.i18n
import Edit from './Edit'
import Save from './Save';
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/icon', {
	title: __('Icon'),
	description: 'Place icons of various preset styles with wprig icons.',
	category: 'wprig-blocks',
	icon: 'universal-access-alt',
	supports: {
		align: ['center', 'wide', 'full'],
	},
    keywords: [__('Icon'), __('Font Awesome'), __('Line Icon')],
    example: {
		attributes: {
            name: 'fas fa-rocket',
		},
	},
	attributes: {
		uniqueId: { type: 'string', default: '' },
		...globalAttributes,
		spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{WPRIG}}' }] },
		name: { type: 'string', default: 'fas fa-rocket' },
		url: { type: 'object', default: {} },
		alignment: { type: 'object', default: { md: 'center' }, style: [{ selector: '{{WPRIG}} .wprig-block-icon-wrapper {text-align: {{alignment}};}' }] },
		iconStyle: { type: 'string', default: 'nofill' },
		iconColor: { type: 'string', default: 'var(--wprig-color-1)', style: [{ selector: '{{WPRIG}} .wprig-block-icon i {color: {{iconColor}};}' }] },
		iconHoverColor: { type: 'string', default: 'var(--wprig-color-2)', style: [{ selector: '{{WPRIG}} .wprig-block-icon:hover i {color: {{iconHoverColor}};}' }] },
		bgColor: { type: 'object', default: { openColor: 1, type: 'color', color: '#D6EBFF' }, style: [{ condition: [{ key: 'iconStyle', relation: '==', value: 'fill' }], selector: '{{WPRIG}} .wprig-block-icon' }] },
		bgHoverColor: { type: 'object', default: { openColor: 1, type: 'color', color: '#B4D9FF', gradient: {} }, style: [{ condition: [{ key: 'iconStyle', relation: '!=', value: 'nofill' }], selector: '{{WPRIG}} .wprig-block-icon:hover' }] },
		border: {
			type: 'object',
			default: {
				color: 'var(--wprig-color-1)',
			},
			style: [{ condition: [{ key: 'iconStyle', relation: '!=', value: 'nofill' }], selector: '{{WPRIG}} .wprig-block-icon' }]
		},
		borderHoverColor: { type: 'string', default: 'var(--wprig-color-2)', style: [{ condition: [{ key: 'iconStyle', relation: '!=', value: 'nofill' }], selector: '{{WPRIG}} .wprig-block-icon:hover {border-color: {{borderHoverColor}};}' }] },
		iconSize: { type: 'string', default: '64px', style: [{ condition: [{ key: 'iconSize', relation: '!=', value: 'custom' }], selector: '{{WPRIG}} .wprig-block-icon {font-size: {{iconSize}};}' }] },
		iconSizeCustom: { type: 'object', default: { md: 64, unit: 'px' }, style: [{ condition: [{ key: 'iconSize', relation: '==', value: 'custom' }], selector: '{{WPRIG}} .wprig-block-icon {font-size: {{iconSizeCustom}};}' }] },
		iconBackgroundSize: { type: 'object', default: { md: '20', unit: 'px' }, style: [{ condition: [{ key: 'iconStyle', relation: '!=', value: 'nofill' }], selector: '{{WPRIG}} .wprig-block-icon { padding: {{iconBackgroundSize}};}' }] },
		iconBorderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: {
					md: 100
				},
				unit: '%'
			},
			style: [{
				condition: [{ key: 'iconStyle', relation: '!=', value: 'nofill' }],
				selector: '{{WPRIG}} .wprig-block-icon'
			}]
		},

		iconShadow: {
			type: 'object',
			default: {},
			style: [
				{
					condition:
						[
							{ key: 'iconStyle', relation: '!=', value: 'nofill' }
						],
					selector: '{{WPRIG}} .wprig-block-icon'
				}
			]
		},
		iconHoverShadow: {
			type: 'object',
			default: {},
			style: [
				{
					condition:
						[
							{ key: 'iconStyle', relation: '!=', value: 'nofill' }
						],
					selector: '{{WPRIG}} .wprig-block-icon:hover'
				}
			]
		},
		sourceOfCopiedStyle: { type: 'boolean', default: false }
	},
	edit: Edit,
	save: Save,
});

