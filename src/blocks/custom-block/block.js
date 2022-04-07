
import Edit from './Edit'
import './style.scss'
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


    registerBlockType('wprig/custom-block', {
        title: __('Custom Block'),
        description: 'Fetch blog posts and display them beautifully in grid or list views with wprig Postgrid Block.',
        icon: 'universal-access-alt',
        category: 'wprig-blocks',
        supports: {
            align: ['center', 'wide', 'full'],
        },
        keywords: [
            __('Post'),
            __('Post Grid'),
            __('Grid'),
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