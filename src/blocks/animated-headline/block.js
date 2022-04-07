import './style.scss'
import Edit from './Edit'
import Save from './Save'
import { attributes } from './attributes';

const { registerBlockType } = wp.blocks
const { __ } = wp.i18n

registerBlockType('wprig/animatedheadline', {
    title: __('Animated Headline'),
    description: 'Grab the attention of your users with animating texts in headlines',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('headline'), __('animated'), __('heading'), __('title')],
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save
})
