const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, Toolbar, SelectControl } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const {
    Alignment,
    Toggle,
    Headings,
    RadioAdvanced,
    globalSettings: {
        globalSettingsPanel,
        animationSettings
    },
    HeadingToolbar,
    Inline: {
        InlineToolbar,
        InlineSelector
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab,
    InspectorSections
} = wp.wprigComponents;

import svg from './separators'

class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            device: 'md',
            selector: true,
            spacer: true
        };
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }

  

    render() {
        const {
            name,
            clientId,
            isSelected,
            attributes,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                recreateStyles,
                content,
                alignment,
                selector,
                level,
                // textColor,

                separatorStyle,
                separatorPosition,
                separatorNumber,

                subHeading,
                subHeadingLevel,
                subHeadingContent,
                subHeadingPosition,

                animation,
                globalZindex,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                hideTablet,
                hideMobile,
                globalCss,
                interaction
            }
        } = this.props

        const { device } = this.state

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

        const subHeadingTagName = 'h' + subHeadingLevel;
            /**bACKGROUND */
        const renderSeparators = <Fragment>
            {separatorStyle &&
                <Fragment>
                    {console.log(separatorNumber)}
                    {separators[separatorStyle].type == 'css' &&
                        <span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`} />
                    }
                    {separators[separatorStyle].type == 'svg' &&
                        <span className={`wprig-separator-type-svg wprig-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                    }
                </Fragment>
            }
        </Fragment>

        const renderMultipleSeparators = <Fragment>
            {separatorStyle &&
                console.log(Array(separatorNumber).fill(0).map((_,index)=>{
                return    <div className="wprig-separator wprig-separator-before">{renderSeparators}</div> 
                }))

            }
            {<span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`} />}
            
            </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        
                        <InspectorTab key={'style'}>
                            <PanelBody title="" initialOpen={true}>
                                <Alignment label={__('Alignment')} value={alignment} onChange={val => setAttributes({ alignment: val })} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>
                            {/* <PanelBody title={__('Heading')} initialOpen={false}>
                                <Color label={__('Color')} value={textColor} onChange={val => setAttributes({ textColor: val })} />
                                <Typography label={__('Typography')} value={typography} onChange={val => setAttributes({ typography: val, ...((val.openTypography !== typography.openTypography) && { recreateStyles: !recreateStyles }) })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody> */}
                            <PanelBody title={__('Sub Heading')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={subHeading} onChange={val => setAttributes({ subHeading: val })} />
                                {subHeading == 1 &&
                                    <Fragment>
                                        <Headings selectedLevel={subHeadingLevel} onChange={(value) => setAttributes({ subHeadingLevel: value })} />
                                        {/* <Typography label={__('Typography')} value={subHeadingTypography} onChange={val => setAttributes({ subHeadingTypography: val, ...((val.openTypography !== subHeadingTypography.openTypography) && { recreateStyles: !recreateStyles }) })} device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                        {/* <Color label={__('Color')} value={subHeadingColor} onChange={val => setAttributes({ subHeadingColor: val })} /> */}
                                        {/* <Range label={__('Spacing')} value={subHeadingSpacing} onChange={(value) => setAttributes({ subHeadingSpacing: value })} unit={['px', 'em', '%']} min={0} max={60} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                        <RadioAdvanced label={__('Position')} value={subHeadingPosition} onChange={val => setAttributes({ subHeadingPosition: val })}
                                            options={[
                                                { label: __('After Title'), value: 'after_title', title: __('After Title') },
                                                { label: __('Before Title'), value: 'before_title', title: __('Before Title') }
                                            ]}
                                        />
                                    </Fragment>
                                }
                            </PanelBody>
                            <PanelBody title={__('Separator')} initialOpen={false}>
                                <SelectControl
                                    label="Style"
                                    value={separatorStyle}
                                    options={[
                                        { label: '--Select--', value: '' },
                                        { label: 'Line', value: 'solid' },
                                        { label: 'Line Doubled', value: 'double' },
                                        { label: 'Dashed', value: 'dashed' },
                                        { label: 'Dotted', value: 'dotted' },
                                        { label: 'Pin', value: 'pin' },
                                        { label: 'Pin Filled', value: 'pin_filled' },
                                        { label: 'Zigzag', value: 'zigzag' },
                                        { label: 'Zigzag Large', value: 'zigzag_large' }
                                    ]}
                                    onChange={val => setAttributes({ separatorStyle: val })}
                                />
                                {separatorStyle &&
                                    <Fragment>
                                        {/* <Color
                                            label={__('Separator Color')}
                                            value={separatorColor}
                                            onChange={val => setAttributes({ separatorColor: val })}
                                        /> */}
                                        {/* {(separatorStyle != 'pin' && separatorStyle != 'pin_filled') &&
                                            <Range label={__('Stroke')} value={separatorStroke} onChange={val => setAttributes({ separatorStroke: parseInt(val) })} min={1} max={separators[separatorStyle].stroke} />
                                        } */}
                                        {/* <Range label={__('Width')} value={separatorWidth} onChange={val => setAttributes({ separatorWidth: val })} min={20} max={separators[separatorStyle].width} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                        {/* <Range label={__('Spacing')} value={separatorSpacing} onChange={val => setAttributes({ separatorSpacing: val })} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                        <SelectControl
                                            label="Position"
                                            value={separatorPosition}
                                            options={[
                                                { label: 'Top', value: 'top' },
                                                { label: 'Bottom', value: 'bottom' },
                                                { label: 'Left', value: 'left' },
                                                { label: 'Right', value: 'right' },
                                                { label: 'Left & Right', value: 'leftright' }
                                            ]}
                                            onChange={val => setAttributes({ separatorPosition: val })}
                                        />
                                    </Fragment>
                                }
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <HeadingToolbar minLevel={1} maxLevel={6} selectedLevel={level} onChange={newLevel => setAttributes({ level: newLevel, selector: `h${newLevel}` })} />
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
               
                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                
                    <div
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                        className={`wprig-block-heading ${separatorStyle ? 'wprig-has-separator wprig-separator-position-' + separatorPosition : ''}`}>
                        {(subHeading == 1 && subHeadingPosition == 'before_title') &&
                            <RichText
                                key="editable"
                                tagName={subHeadingTagName}
                                className="wprig-sub-heading-selector"
                                keepPlaceholderOnFocus
                                placeholder={__('Add Text...')}
                                onChange={value => setAttributes({ subHeadingContent: value })}
                                value={subHeadingContent} />
                        }

                        
                        <div className="wprig-heading-container">
                            {separatorStyle !== '' && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? {renderMultipleSeparators} : ''}
                            <RichText
                                key="editable"
                                tagName={selector}
                                className="wprig-heading-selector"
                                keepPlaceholderOnFocus
                                placeholder={__('Add Text...')}
                                onChange={value => setAttributes({ content: value })}
                                value={content}
                            />
                            {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? {renderMultipleSeparators} : ''}
                        </div>
                        {(subHeading == 1 && subHeadingPosition == 'after_title') &&
                            <RichText
                                key="editable"
                                tagName={subHeadingTagName}
                                className="wprig-sub-heading-selector"
                                keepPlaceholderOnFocus
                                placeholder={__('Add Text...')}
                                onChange={value => setAttributes({ subHeadingContent: value })}
                                value={subHeadingContent} />
                        }
                        <div
                            ref={this.wprigContextMenu}
                            className={`wprig-context-menu-wraper`}
                        >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                wprigContextMenu={this.wprigContextMenu.current}
                            />
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
export default withCSSGenerator()(Edit);