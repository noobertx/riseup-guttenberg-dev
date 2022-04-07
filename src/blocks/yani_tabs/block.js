import './style.scss';
import Edit from './Edit';
import Save from './Save';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 

registerBlockType('wprig/yanitabs', {
    title: __('Yani Tabs'),
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
    edit: Edit,
    save: Save
})