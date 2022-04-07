/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
import Edit from './Edit'
import Save from './Save'
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType( 'wprig/progressbar', {
	title: __('Progress Bar'),
	description: 'Showcase stats using progress bars with wprig Progress Bar.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
	supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [__('progress'), __('bar'), __('bar progress')],
    example: {
        attributes: {},
    },
	attributes: {
		uniqueId: { type: 'string', default: '' },
		...globalAttributes,  // Global Settings
		spacer: { type: 'object', default:{spaceTop: { md: '10', unit: 'px'}, spaceBottom: { md: '10', unit: 'px'}}, style: [{ selector: '{{WPRIG}}' }] },
		progress: {type: 'string', default: 50, style: [{ selector: '{{WPRIG}} .wprig-progress-bar {width: {{progress}}%;}' }] },

		// Labels
		title: {type: 'string', default: 'Progress'},
		showTitle: {type: 'boolean', default: true},
		labelTypography: { type:'object', default:{openTypography: 1, size: {md: 16, unit: 'px'}}, style: [{ selector: '{{WPRIG}} .wprig-block-progress-labels' }] },
		labelColor: { type:'string', default:'', style: [{ selector: '{{WPRIG}} .wprig-block-progress-labels {color: {{labelColor}};}' }] },
		labelPosition: {type: 'string', default: 'outside'},
		labelSpacing: { type:'object', default:{md: 10, unit: 'px'}, style: [{ selector: '{{WPRIG}} .wprig-block-progress-labels.wprig-position-outside {margin-bottom: {{labelSpacing}};} {{WPRIG}} .wprig-block-progress-labels.wprig-position-inside {padding-left: {{labelSpacing}}; padding-right: {{labelSpacing}};}' }] },

		// Bar
		barHeight: {type: 'object', default: {md: 30, unit: 'px'}, style: [{ selector: '{{WPRIG}} .wprig-progress {height: {{barHeight}}; line-height: {{barHeight}};}' }] },
		barBackground: {type: 'string', default: '#e9ecef', style: [{ selector: '{{WPRIG}} .wprig-progress {background-color: {{barBackground}};}' }] },
		progressBackground: { type: 'object', default: {openColor: 1, type: 'color', color: 'var(--wprig-color-1)',gradient: {}}, style: [{ selector: '{{WPRIG}} .wprig-progress-bar' }] },
		striped: {type: 'boolean', default: false},
		borderRadius: {
			type: 'object',
			default: {
				openBorderRadius: 1,
				radiusType: 'global',
				global: {md: 10},
				unit: 'px',

			},
			style: [{selector: '{{WPRIG}} .wprig-progress, {{WPRIG}} .wprig-progress-bar' }]
		},
		showProgress: {type: 'boolean', default: true},
		sourceOfCopiedStyle: { type: 'boolean', default: false }
	},
	edit: Edit,
	save: Save
} );
