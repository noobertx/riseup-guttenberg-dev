import './style.scss'
import Edit from './Edit'
import Save from './Save';
import svg from '../advance-heading/separators';
const { __ } = wp.i18n
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes }, HelperFunction: { animationAttr } } = wp.wprigComponents

registerBlockType('wprig/text', {
    title: __('Advanced Text'),
    description: 'Apply texts and tweak designs with wprig Advanced Text.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [
        __('text'),
        __('paragraph'),
        __('heading'),
        __('Advanced'),
    ],
    example: {
        attributes: {
            enableTitle: true,
            title: __('Advanced Text Block', 'wprig'),
            dropCap: true,
            content: __('wprig blocks is added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block. Add ready blocks using the plus sign where you’ll find a new section of blocks under the wprig icon.', 'wprig'),
        },
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },
        content: {
            type: 'string',
            source: 'html',
            selector: '.wprig-block-text> *:last-child',
            default: 'wprig blocks is added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block. Add ready blocks using the plus sign where you’ll find a new section of blocks under the wprig icon.'
        },
        alignment: { type: 'object', default: { md: 'left' }, style: [{ selector: '{{WPRIG}} .wprig-block-text {text-align: {{alignment}}; }' }] },
        selector: { type: 'string', default: 'p' },
        dropCap: { type: 'boolean', default: false },
        dropCapSize: {
            type: 'object', default: { md: 48, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text p::first-letter, {{WPRIG}} .wprig-block-text .editor-rich-text p::first-letter {font-size: {{dropCapSize}};}'
                }
            ]
        },
        dropCapColor: {
            type: 'string', default: '#2962FF',
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text p::first-letter, {{WPRIG}} .wprig-block-text .editor-rich-text p::first-letter {color: {{dropCapColor}};}'
                }
            ]
        },
        dropCapSpacing: {
            type: 'object', default: { md: 15, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'dropCap', relation: '==', value: true }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text p::first-letter, {{WPRIG}} .wprig-block-text .editor-rich-text p::first-letter {margin-right: {{dropCapSpacing}};}'
                }
            ]
        },


        typography: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} .wprig-block-text, {{WPRIG}} .wprig-block-text p.rich-text' }] },
        textColor: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-block-text > * { color:{{textColor}}; }' }] },


        // Title
        enableTitle: { type: 'boolean', default: 1 },
        title: {
            type: 'string',
            source: 'html',
            selector: '.wprig-block-text-title',
            default: 'Advanced Text Block'
        },
        titleLevel: { type: 'number', default: 2 },
        titleTypography: { type: 'object', default: { openTypography: 1, size: { md: 24, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-block-text-title' }] },
        titleColor: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-block-text-title {color: {{titleColor}};}' }] },
        titleSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{WPRIG}} .wprig-block-text-title-inner {margin-bottom: {{titleSpacing}};}' }] },

        subTitle: { type: 'boolean', default: 0 },
        subTitleLevel: { type: 'number', default: 3 },
        subTitleContent: {
            type: 'string',
            source: 'html',
            selector: '.wprig-block-text-sub-title',
            default: 'Sub Title'
        },
        subTitleTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-block-text .wprig-block-text-sub-title' }] },
        subTitleColor: {
            type: 'string', default: '#333',
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-block-text-sub-title {color: {{subTitleColor}};}'
                },
            ]
        },
        subTitleSpacing: {
            type: 'object', default: { md: 15, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'subTitle', relation: '==', value: 1 }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-block-text-sub-title {margin-bottom: {{subTitleSpacing}};}'
                },
            ]
        },

        // Title separator
        separatorStyle: {
            type: 'string', default: '',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-separator-type-css {border-top-style: {{separatorStyle}};}'
                },
            ]
        },
        separatorPosition: { type: 'string', default: 'top' },
        separatorColor: {
            type: 'string', default: '#5D7FEB',
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-separator-type-svg svg .wprig-separator-stroke {stroke: {{separatorColor}};} {{WPRIG}} .wprig-block-text svg .wprig-separator-fill {fill: {{separatorColor}};} {{WPRIG}} .wprig-block-text .wprig-separator-type-css {border-top-color: {{separatorColor}};}'
                },
            ]
        },
        separatorStroke: {
            type: 'number', default: 3,
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-separator-type-svg svg .wprig-separator-stroke {stroke-width: {{separatorStroke}}px;} {{WPRIG}} .wprig-block-text .wprig-separator-type-css {border-top-width: {{separatorStroke}}px;}'
                },
            ]
        },
        separatorWidth: {
            type: 'object', default: { md: 60 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-text .wprig-separator-type-css {width: {{separatorWidth}}px;} {{WPRIG}} .wprig-block-text .wprig-separator-type-svg svg {width: {{separatorWidth}}px;}'
                },
            ]
        },
        separatorSpacing: {
            type: 'object', default: { md: 10 },
            style: [
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'left' },
                    ],
                    selector: '{{WPRIG}} .wprig-separator {margin-right: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'right' },
                    ],
                    selector: '{{WPRIG}} .wprig-separator {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'leftright' },
                    ],
                    selector: '{{WPRIG}} .wprig-separator-before {margin-right: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-after {margin-left: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'top' },
                    ],
                    selector: '{{WPRIG}} .wprig-separator {margin-bottom: {{separatorSpacing}}px;}'
                },
                {
                    condition: [
                        { key: 'separatorStyle', relation: '!=', value: '' },
                        { key: 'separatorPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{WPRIG}} .wprig-separator {margin-top: {{separatorSpacing}}px;}'
                },
            ]
        },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    deprecated: [
        {
            save(props) {
                const separators = {
                    solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
                    double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
                    dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
                    dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
                    pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
                    pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
                    zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
                    zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
                }

                const { uniqueId, content, selector, dropCap, enableTitle, titleLevel, subTitleLevel, separatorStyle, separatorPosition, title, subTitle, subTitleContent, animation } = props.attributes
                const titleTagName = 'h' + titleLevel;
                const subTitleTagName = 'h' + subTitleLevel;

                const renderSeparators = <Fragment>
                    {separatorStyle &&
                        <Fragment>
                            {separators[separatorStyle].type == 'css' &&
                                <span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`} />
                            }
                            {separators[separatorStyle].type == 'svg' &&
                                <span className={`wprig-separator-type-svg wprig-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                            }
                        </Fragment>
                    }
                </Fragment>

                return (
                    <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                        <div className={`wprig-block-text ${(dropCap == 1) ? 'wprig-has-drop-cap' : ''}`}>
                            {enableTitle == 1 &&
                                <div className={`wprig-block-text-title-container ${separatorStyle ? 'wprig-has-separator' : ''} ${separatorPosition ? 'wprig-separator-position-' + separatorPosition : ''}`} >
                                    <div className="wprig-block-text-title-inner">
                                        {separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-before">{renderSeparators}</div> : ''}
                                        <RichText.Content tagName={titleTagName} className="wprig-block-text-title" value={title} />
                                        {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-after">{renderSeparators}</div> : ''}
                                    </div>

                                    {subTitle == 1 &&
                                        <div className="wprig-block-text-sub-title-container" onClick={() => this.handlePanelOpenings('Sub Title')}>
                                            <RichText.Content tagName={subTitleTagName} className="wprig-block-text-sub-title" value={subTitleContent} />
                                        </div>
                                    }
                                </div>
                            }
                            <RichText.Content tagName={selector} value={content} className="wprig-block-text-content" />
                        </div>
                    </div>
                )
            }
        },
    ],
    edit: Edit,
    save: Save,
});