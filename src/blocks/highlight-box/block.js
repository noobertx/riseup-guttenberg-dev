import './style.scss';

import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/highlight-box', {
    title: __('Hightlight Box'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    description: __('Highligh box'),
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
                { title: "Main" },
                { title: "Secondary" },
            ],
        },
        innerBlocks: [
            {
                name: 'wprig/face',
                innerBlocks: [
                    {
                        name: 'wprig/image',
                        attributes: {
                            image: { url: 'https://wprig.io/wp-content/uploads/wprig-assets/demo/image8.jpg' },
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