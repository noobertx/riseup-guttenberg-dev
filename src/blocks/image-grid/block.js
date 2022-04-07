import Edit from './Edit';

import './style.scss';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor



registerBlockType('wprig/image-grid', {
    title: __('Image Grid'),
    category: 'wprig-blocks',
    description: 'Image Grid',
    icon: 'universal-access-alt',
    supports: {
        align: ['wide', 'center', 'full'],
        html: false
    },
    keywords: [__('image','image grid')],
    // attributes,
    edit: Edit,
    save: function (props) {
        return null;
    }
});

