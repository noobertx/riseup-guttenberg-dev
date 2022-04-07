import './style.scss';
import Edit from './Edit'
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/infobox', {
    title: __('Info Box', 'wprig'),
    description: 'Be creatively informative with wprig Info Box.',
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ],
    },
    keywords: [
        __('service', 'wprig'),
        __('feature', 'wprig'),
        __('info', 'wprig')
    ],
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save
});
