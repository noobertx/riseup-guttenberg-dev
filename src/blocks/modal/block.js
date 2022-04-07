import './style.scss'
import Edit from './Edit'
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


registerBlockType ( 'wprig/modal', {
    title: __( 'Modal' ),
    description: 'Embed Modal.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [ __( 'modal' ), __( 'lightbox' ) ],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: function (props) {
        return null;
    }
});
