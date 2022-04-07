import './style.scss';
import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/advancedlist', {
    title: __('Advanced List'),
    description: __('Include stylish lists to display in your site with WPRIG Advanced List.'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [
        __('Advanced', 'wprig'),
        __('list', 'wprig'),
        __('advanced list', 'wprig'),
        __('Advanced List', 'wprig')
    ],
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ],
    },
    example: {
        attributes: {
            background: '#fff'
        },
    },
    attributes,
    edit: Edit,
    save: Save,
});
