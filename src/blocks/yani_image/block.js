import './style.scss';
import Edit from './Edit';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/elimage', {
    title: __('Simple Image'),
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
        __('image'),
        __('blurbs'),
        __('photo')
    ],
    example:{},
    edit: Edit,
    save: function (props) {
        return null;
    }
})