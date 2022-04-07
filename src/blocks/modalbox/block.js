import './style.scss'
import Edit from './Edit'
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks


registerBlockType ( 'wprig/modal-box', {
    title: __( 'Modal Box' ),
    description: __('The Modal Box block is a dialog box/popup window that is displayed on top of the current page. Use a modal for dialog boxes, confirmation messages, or other content that can be called up.'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [ __( 'modal' ), __( 'lightbox' ) ],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    attributes,
    edit: Edit,
    save: Save
});
