/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { RichText } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes }, HelperFunction: { IsInteraction } } = wp.wprigComponents


registerBlockType('wprig/eliconlist-connector', {
    title: __('Icon List Connector'),
    description: __('Include attractive icon lists with Connector.'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('icon', 'list', 'icon list')],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    // attributes,
    edit: Edit,
    save: function (props) {
        return null;
    },
});
