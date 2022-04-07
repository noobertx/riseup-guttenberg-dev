
import './style.scss'
import Edit from './Edit'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

    registerBlockType('wprig/product-categories', {
        title: __('Product Categories'),
        description: 'Fetch product categoris and display them beautifully with wprig product-categories Block.',
        icon: 'universal-access-alt',
        category: 'wprig-blocks',
        supports: {
            align: ['center', 'wide', 'full'],
        },
        keywords: [
            __('Product Category'),
            __('Category'),
            __('Nav'),
        ],
        example: {
        },
        edit: Edit,
        save: function (props) {
            return null;
        }
    });