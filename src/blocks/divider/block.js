import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType ( 'wprig/divider', {
    title: __( 'Divider' ),
    description: 'Use beautiful pre-designed dividers with wprig Divider.',
	icon: 'universal-access-alt',
    category: 'wprig-blocks',
    keywords: [ __( 'Divider' ), __( 'Separator' ) ],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId:{ type: 'string', default: '' }, 
        ...globalAttributes,
		spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [{ selector: '{{WPRIG}}' }] },
        style: { type: 'string', default: 'slash' },
		height: { type: 'object', default: {md: '2', unit: 'px'}, style: [{ selector: '{{WPRIG}} .wprig-block-divider > div { border-top-width: {{height}};}' }] }, 
		width: { type: 'object', default: {md: '280', unit: 'px'}, style: [{ selector: '{{WPRIG}} .wprig-block-divider > div { width: {{width}};} {{WPRIG}} .wprig-block-divider svg { width: {{width}};}' }] },
		alignment: { type: 'object', default: {md: 'center'}, style: [{ selector: '{{WPRIG}} {text-align: {{alignment}};}' }]},
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save,
});
