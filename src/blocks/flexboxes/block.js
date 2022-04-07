import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        videoBackground

    },
} = wp.wprigComponents;


registerBlockType('wprig/flex-blocks', {
    title: __('Flex Boxes'),
    category: 'wprig-blocks',
    description: 'Include Flexbox containers',
    icon: 'universal-access-alt',
    supports: {
        align: ['wide', 'center', 'full'],
        html: false
    },
    keywords: [__('flexbox')],
    attributes,
    edit: Edit,
    save: Save,
});

