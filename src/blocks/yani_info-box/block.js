import './style.scss';
import Edit from './Edit'
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('wprig/yaniinfobox', {
    title: __('Info Box 1', 'wprig'),
    description: 'Be creatively informative with wprig Info Box.',
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ],
    },
    keywords: [
        __('service', 'wprig'),
        __('feature', 'wprig'),
        __('info', 'wprig')
    ],
    example: {
        attributes: {},
    },
    edit: Edit,
    save: function (props) {
        return null;
    }
});
