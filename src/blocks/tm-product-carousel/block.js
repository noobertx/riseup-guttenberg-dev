
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

    registerBlockType('wprig/tm-productcarousel', {
        title: __('TM Product Carousel'),
        description: 'Fetch products and display them beautifully with wprig product-carousel Block.',
        icon: 'universal-access-alt',
        category: 'wprig-blocks',
        supports: {
            align: ['center', 'wide', 'full'],
        },
        keywords: [
            __('TM'),
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