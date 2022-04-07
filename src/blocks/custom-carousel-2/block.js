import './style.scss';
import Save from './Save';
import Edit from './Edit';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/custom-carousel-2', {
    title: __('Custom Carousel 2'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    description: __('Showcase features in beautiful pre-designed tabs with wprig Tabs.'),
    supports: {
        html: false,
        className: false,
        align: [
            'full',
            'wide',
            'center'
        ],
    },
    example: {
        attributes: {
            tabTitles: [
                { title: "Tab 1" },
                { title: "Tab 2" },
                { title: "Tab 3" }
            ]
        },
        innerBlocks: [
            {
                name: 'wprig/tab',
                innerBlocks: [
                    {
                        name: 'wprig/heading',
                        attributes: {
                            content: 'wprig - A Full-fledged Gutenberg Builder',
                            alignment: { md: "center" }
                        },
                    },
                ],
            }
        ],
    },
    attributes,
    edit: Edit,
    save: Save
})