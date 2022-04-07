import './style.scss';
import Edit from './Edit';
import attributes from './attributes';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;


registerBlockType('wprig/yani-ajax-search', {
    title: __('Ajax Search'),
    description: __('Create ajax search'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    supports: {
        align: [
            'full',
            'wide',
            'center'
        ],
    },
    keywords: [
        __('search'),
        __('find')
    ],
    example: {
        attributes: {},
    },
    getEditWrapperProps(attributes) {
        if (attributes.customClassName != '') {
            return { className: `wp-block block-editor-block-list__block ${attributes.customClassName}` }
        }
    },
    edit: Edit,
    save : function (props) {
        return null;
    },
});