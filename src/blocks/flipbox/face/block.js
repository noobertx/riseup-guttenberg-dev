
import Save from './Save';
import Edit from './Edit';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import attributes from './attributes';

registerBlockType('wprig/face', {
    title: __('Face'),
    category: 'wprig-blocks',
    parent: ['wprig/flipbox'],
    supports: {
        html: false,
        inserter: false,
        reusable: false,
    },
    icon: 'universal-access-alt',
    
    getEditWrapperProps(attributes) {
        return {
            'data-tab': attributes.id,
            className: `wp-block editor-block-list__block block-editor-block-list__block wprig-tab-content ` +attributes.customClassName
        }
    },
    attributes,
    edit: Edit,
    save: Save
}) 