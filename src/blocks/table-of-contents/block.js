import './style.scss';
import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/table-of-contents', {
    title: __('Table of Contents'),
    description: 'Organize page/post contents with wprig Table of Contents',
    icon:  'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
    },
    keywords: [
        __('Table of Contents'),
        __('Table'),
        __('Contents'),
        __('wprig')
    ],
    example: {

    },
    attributes,
    edit: Edit,
    save: Save,
    // save: function (props) {
    //     return null
    // },
});
