/* eslint-disable react/react-in-jsx-scope */
import '../style.scss';
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.blockEditor;
const { HelperFunction: { animationAttr } } = wp.wprigComponents

const attributes={
    uniqueId:{ type: 'string', default: ''},
    itemNumber:{ type: 'number' },
    heading: { type: 'string', default: 'Accordion Item' },
    active: { type: 'boolean', default: false },
    defaultText: { type: 'string', default: '' },
    fillType: { type: 'string', default: 'fill' },
    openFirstItem: { type: 'boolean', default: true },
    richSnippet: { type: 'boolean', default: false },


    // Panel Icon
    panelIcon: { type: 'string', default: 'fa fa-plus' },
    iconPosition: {type: 'string', default: 'right'},

    //Spacing
            
}

export const accordionItemSettings = {
    title: __( 'Accordion' ),
    description: 'Display creative collapsible texts with wprig Accordion.',
    parent: [ 'wprig/accordion' ],
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
        html: false,
        inserter: false,
        reusable: false,
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
                    itemNumber, 
                    heading, 
                    panelIcon, 
                    iconPosition, 
                    fillType, 
                    animation, 
                    openFirstItem 
                } = props.attributes;
                const className = `wprig-accordion-item wprig-type-${fillType} ${openFirstItem && itemNumber == 0 && 'wprig-accordion-active'}`;
                return (
                    <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                        <div className={className}>
                           Accordion item generated
                        </div>
                    </div>
                );
            }
        }
    ]
};

registerBlockType('wprig/accordion-item', accordionItemSettings);
