import './style.scss'
const { __ } = wp.i18n
import Edit from './Edit'
import Save from './Save';
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/wrapper', {
    title: __('Block Wrapper'),
    description: 'Make Blocks more attractive with Block Wraper.',
    icon:  'universal-access-alt',
	category: 'wprig-blocks',
    supports: {
        align: ['center', 'wide', 'full'],
        html: false
    },
    keywords: [__('Block'), __('Block Wrapper'), __('Wrapper')],
    example: {
        attributes: {},
        innerBlocks: [
            {
                name: 'wprig/icon',
                attributes: {
                    iconStyle: "fill",
                    name: "fas fa-rocket"
                },
            },
        ],

    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        spacer: { type: 'object', default: { spaceTop: { md: '0', unit: "px" }, spaceBottom: { md: '0', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },

        bgColor: { type: 'object', default: { openColor: 1, type: "color", color: "#f5f5f5" }, style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block' }] },
        bgColorHover: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block:hover' }] },

        padding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: { md: '30' },
                custom: { md: '30 30 30 30' },
                unit: 'px'
            },
            style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block ' }]
        },
        borderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: { md: 4 },
                unit: 'px'
            },
            style: [
                { selector: '{{WPRIG}} .wprig-block-wrapper-block' }
            ]
        },
        border: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block' }] },
        bgBorderColorHover: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block:hover {border-color: {{bgBorderColorHover}};}' }] },

        bgShadow: { type: 'object', default: { openShadow: 1, horizontal: 1, vertical: 1, blur: 2, color: 'rgba(0, 0, 0, .2)', spread: 0 }, style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block' }] },
        bgShadowHover: { type: 'object', default: { color: '' }, style: [{ selector: '{{WPRIG}} .wprig-block-wrapper-block:hover' }] },
    },
    edit: Edit,
    save: Save,
});

