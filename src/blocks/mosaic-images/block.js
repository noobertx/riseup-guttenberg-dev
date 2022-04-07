import Edit from './Edit';

import './style.scss';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor



registerBlockType('wprig/mosaic-images', {
    title: __('Mosaic Images'),
    category: 'wprig-blocks',
    description: 'Mosaic Images',
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

