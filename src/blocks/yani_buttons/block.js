import './style.scss';
import Edit from './Edit';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/elbutton', {
    title: __('Simple Button'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    description: __('Simple Buttons.'),
    supports: {
        align: [
            'full',
            'wide',
            'center'
        ],
    },
    keywords: [
        __('link'),
        __('button')
    ],
    example:{},
    edit: Edit,
    save: function (props) {
        return null;
    }
})