import Edit from './Edit';

import './style.scss';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor



registerBlockType('wprig/image-carousel', {
    title: __('Image Carousel'),
    category: 'wprig-blocks',
    description: 'Image Carousel',
    icon: 'universal-access-alt',
    supports: {
        align: ['wide', 'center', 'full'],
        html: false
    },
    keywords: [__('carousel')],
    edit: Edit,
    save: function (props) {
        return null;
    }
});

