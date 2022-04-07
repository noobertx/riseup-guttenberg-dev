
import Edit from './Edit';
import Save from './Save';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/yanitab', {
    title: __('Tab'),
    category: 'wprig-blocks',
    parent: ['wprig/yanitabs'],
    supports: {
        html: false,
        inserter: false,
        reusable: false,
    },
    icon: 'universal-access-alt',
    attributes: {
        uniqueId: {
            type: 'string',
            default: ''
        },
        id: {
            type: 'number',
            default: 1,
        },
        customClassName: {
            type: 'string',
            default: ''
        }
    },
    getEditWrapperProps(attributes) {
        return {
            'data-tab': attributes.id,
            className: `wp-block editor-block-list__block block-editor-block-list__block wprig-tab-content`
        }
    },
    edit: Edit,
    save: Save
}) 