import './style.scss';
import Edit from './Edit';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/eldivider', {
    title: __('Simple Divider'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    description: __('Simple Divider.'),
    supports: {
        align: [
            'full',
            'wide',
            'center'
        ],
    },
    keywords: [
        __('divider'),
        __('separator')
    ],
    example:{},
    edit: Edit,
    save: function (props) {
        return null;
    }
})