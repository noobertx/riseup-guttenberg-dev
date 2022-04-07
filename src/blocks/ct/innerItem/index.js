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
    customClassName: {
        type: 'string',
        default: ''
    },

    // Panel
    panelColor: {
        type:'string',
        default: '#000',
        style: [
            {
                selector: '{{WPRIG}} .wprig-accordion-panel { color: {{panelColor}}; }'
            }
        ]
    },
    panelColorActive: {
        type:'string',
        default: '#FFF',
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel { color:{{panelColorActive}}; }'
            }
        ]
    },
    panelColorActive2: {
        type:'string',
        default: '#222',
        style: [
            {
                condition: [
                    { key: 'fillType', relation: '==', value: 'nofill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel { color:{{panelColorActive2}}; }'
            }
        ]
    },
    panelBg: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: '#EEEEEE',
            gradient: {
                color1: '#EEEEEE',
                color2: '#e5e5e5',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear',
            }
        },
        style: [
            {
                condition:[
                    {key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-panel'
            }
        ]
    },
    panelBgActive: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: 'var(--grey-dark-one)',
            gradient: {
                color1: '#2476CA',
                color2: '#1A5FA4',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear',
            }
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel'
            }
        ]
    },
    panelBorder:{
        type: 'object',
        default: {
            borderType: 'global'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-panel'
            }
        ]
    },
    panelBorderColorActive:{
        type: 'object',
        default: {
            borderType: 'global'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel {border-color: {{panelBorderColorActive}};}'
            }
        ]
    },
    panelBoxShadow:{
        type: 'object',
        default: {},
        style: [
            {
                condition:[{ key: 'fillType', relation: '==', value: 'fill' }
            ],
            selector: '{{WPRIG}} .wprig-accordion-panel' }
        ]
    },
    panelBoxShadowActive:{
        type: 'object',
        default: {},
        style: [
            {
                condition:[{ key: 'fillType', relation: '==', value: 'fill' }
            ],
            selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel' }
        ]
    },
    
    typography: {
        type: 'object',
        default: {},
        style: [
            { selector: '{{WPRIG}} .wprig-accordion-panel' }
        ]
    },
    panelPadding:{
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: {
                md: 15
            },
            unit: 'px'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-panel'
            }
        ]
    },
    panelBorderRadius:{
        type: 'object',
        default: {
            radiusType: 'global',
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-panel'
            }
        ]
    },
    panelBorderRadiusActive:{
        type: 'object',
        default: {
            radiusType: 'global',
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel'
            }
        ]
    },

    // Body
    bodyBg: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: '#fff',
            gradient: {
                color1: '#f2f2f2',
                color2: '#e5e5e5',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear',
            }
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },
    bodyPadding: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: {
                md: 15
            },
            unit: 'px'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },
    bodyPaddingAlt: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'custom',
            custom: {
                md: '15 0 0 0'
            },
            unit: 'px'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'nofill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },
    bodyBoxShadow:{ 
        type: 'object',
        default: {},
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },
    
    bodyBorder:{
        type: 'object',
        default: {
            borderType: 'global'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },
    borderRadius:{
        type: 'object',
        default: {
            radiusType: 'global'
        },
        style: [
            {
                condition:[
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-accordion-body'
            }
        ]
    },

    // Panel Icon
    panelIcon: { type: 'string', default: 'fa fa-plus' },
    iconSize: {type: 'string', default: '14px', style: [{ condition:[{ key: 'iconSize', relation: '!=', value: 'custom' }], selector: '{{WPRIG}} .wprig-accordion-panel .wprig-accordion-icon { font-size:{{iconSize}}; }' }] },
    customIconSize: {type: 'string', default: {md: 16, unit: 'px'}, style: [{ condition:[{ key: 'iconSize', relation: '==', value: 'custom' }], selector: '{{WPRIG}} .wprig-accordion-panel .wprig-accordion-icon { font-size:{{customIconSize}}; }' }] },
    iconColor: { type:'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-accordion-panel .wprig-accordion-icon { color:{{iconColor}}; }' }] },
    iconColorActive: { type:'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-accordion-active .wprig-accordion-panel .wprig-accordion-icon { color:{{iconColorActive}}; }' }] },
    iconPosition: {type: 'string', default: 'right'},
    iconSpacing: {type: 'object', default: {md: 10, unit: 'px'}, style: [{ selector: '{{WPRIG}} .wprig-accordion-panel.wprig-icon-position-left .wprig-accordion-icon { margin-right:{{iconSpacing}}; } {{WPRIG}} .wprig-accordion-panel.wprig-icon-position-right .wprig-accordion-icon { margin-left:{{iconSpacing}}; }' }] },

    //Spacing
    spacing: {type: 'object', default: {md: 10, unit: 'px'}, style: [{ selector: '{{WPRIG}} { margin-bottom: calc( {{spacing}} / 2); padding-bottom: calc( {{spacing}} / 2); }' }] },
    spacingBorder: {type: 'string', default: '', style: [{ selector: '{{WPRIG}} { border-bottom: {{spacingBorder}}px solid; }' }] },
    spacingBorderColor: {type: 'string', default: '', style: [{ selector: '{{WPRIG}} { border-bottom-color: {{spacingBorderColor}}; }' }] },
            
}

export const accordionItemSettings = {
    title: __( 'CT Item' ),
    description: 'Display creative collapsible texts with wprig Accordion.',
    parent: [ 'wprig/ct-item' ],
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

registerBlockType('wprig/ct-item', accordionItemSettings);
