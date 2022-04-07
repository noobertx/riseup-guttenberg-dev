import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/ct-carousel', {
    title: __('CT Carousel'),
    description: 'Display creative Accordion.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('ct'), __('collapsible'), __('collapse')],
    supports: {
        html: false,
        className: false,
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        defaultItems: { type: 'number', default: 2 },
        itemToggle: { type: 'boolean', default: true },
        tabTitles: {
        type: 'array',
        default: [
            { title: '1' },
            { title: '2' }
        ]
    },
        ...globalAttributes
    },

    edit: Edit,
    save: Save
});
