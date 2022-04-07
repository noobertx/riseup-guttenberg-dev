import './style.scss';
import Edit from './Edit';
import Save from './Save';
import { attributes } from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/imagecomparison', {
    title: __('Image Comparison'),
    description: __('Compare Images with wprig'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [
        __('image'),
        __('image comparison'),
        __('comparison'),
    ],
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ],
    },
    example: {
        attributes: {

        },
    },
    attributes,
    edit: Edit,
    save: Save,
});