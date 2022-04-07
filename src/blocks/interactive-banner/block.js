import './style.scss';
import Edit from './Edit'
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/interactive-banner', {
    title: __('Interative Banner', 'wprig'),
    description: 'Block Description Currently is blank',
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ],
    },
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save
});
