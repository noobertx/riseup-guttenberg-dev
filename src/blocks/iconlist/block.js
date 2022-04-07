/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { RichText } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes }, HelperFunction: { IsInteraction } } = wp.wprigComponents


registerBlockType('wprig/eliconlist', {
    title: __('Icon List'),
    description: __('Include attractive icon lists with wprig Icon List.'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('icon', 'list', 'icon list')],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    edit: Edit,
    save: function (props) {
        return null;
    },
});
