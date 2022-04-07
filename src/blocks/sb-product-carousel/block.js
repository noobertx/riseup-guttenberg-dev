
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

    registerBlockType('wprig/sb-productcarousel', {
        title: __('SB Product Carousel'),
        description: 'Product Carousel with a banner on the side.',
        icon: 'universal-access-alt',
        category: 'wprig-blocks',
        supports: {
            align: ['center', 'wide', 'full'],
        },
        keywords: [
            __('SB'),
            __('Product Crousel'),
            __('Crousel'),
        ],
        example: {
            attributes: {
                layout: 2,
                column: {
                    md: 1
                },
                showExcerpt: false,
                postsToShow: 1
            },
        },
        edit: Edit,
        save: function (props) {
            return null;
        }
    });