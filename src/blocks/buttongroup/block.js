import './style.scss';
import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
    HelperFunction: {
        IsInteraction
    }
} = wp.wprigComponents;


registerBlockType('wprig/buttongroup', {
    title: __('Button Group'),
    description: 'Bunch together a group of useful buttons with wprig Button Group.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    supports: {
        align: ['center', 'wide', 'full'],
        html: false,
    },
    keywords: [
        __('button'),
        __('buttons'),
        __('link'),
        __('button group')
    ],
    example: {
        attributes: {
            buttons: 1,
            alignment: {
                md: "center"
            },
            spacing: {
                md: "15",
                unit: "px"
            }
        },

    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,
            save(props) {
                const {
                    uniqueId,
                    interaction,
                } = props.attributes;
                
                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
                return (
                    <div className={`wprig-block-${uniqueId}`}>
                        <div className={`wprig-block-button-group ${interactionClass}`}>
                            <InnerBlocks.Content />
                        </div>
                    </div>
                )
            }
        }
    ]
});