const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, SelectControl, TextControl, Toolbar  ,RangeControl} = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const {WPRigButtonEdit,     ButtonGroup,     Url,     Media,     ContextMenu: { ContextMenu,     handleContextMenu }, RadioAdvanced, Toggle, Alignment, Headings, globalSettings: { globalSettingsPanel,     animationSettings,     interactionSettings }, Inline: { InlineToolbar }, wprigButton: { buttonSettings }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import svg from '../advance-heading/separators';
class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            selector: true,
            spacer: true,
            openPanelSetting: ''
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
    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
    }

    render() {
        const {
            uniqueId,
            className,
            layout,
            recreateStyles,
            mediaType,
            alignment,
            titleLevel,
            enableTitle,
            title,

            subTitle,
            subTitleLevel,
            subTitleContent,

            separatorStyle,
            separatorPosition,

            //content
            enableContent,
            content,
            
            iconName,
            useMediaBg,
            image,
            image2x,
            imgAlt,
            imageType,
            externalImageUrl,

            enableButton,

            // Button
            buttonSize,
            buttonFillType,
            buttonText,
            buttonIconName,
            buttonIconPosition,
            buttonUrl,

            effect,


            animation,
            enablePosition,
            selectPosition,
            positionXaxis,
            positionYaxis,
            globalZindex,
            hideTablet,
            hideMobile,
            globalCss,
            interaction
        } = this.props.attributes

        const { name, clientId, attributes, isSelected, setAttributes } = this.props
        const { openPanelSetting, device } = this.state
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

        const titleTagName = 'h' + titleLevel;
        const subTitleTagName = 'h' + subTitleLevel;

        const renderSeparators = <Fragment>
            {separatorStyle &&
                <Fragment>
                    {separators[separatorStyle].type == 'css' &&
                        <span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`}></span>
                    }
                    {separators[separatorStyle].type == 'svg' &&
                        <span className={`wprig-separator-type-svg wprig-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                    }
                </Fragment>
            }
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Layout')} initialOpen={true}>             
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} alignmentType="content" disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />                               
                                <SelectControl
                                    label={__('Info Banner Effect')}
                                    value={effect}
                                    options={[
                                        { label: '--Select--', value: '' },
                                        { label: 'Effect 1', value: 'interactive-banner--effect-1' },
                                        { label: 'Effect 2', value: 'interactive-banner--effect-2' },
                                        { label: 'Effect 3', value: 'interactive-banner--effect-3' },
                                        { label: 'Effect 4', value: 'interactive-banner--effect-4' },
                                        { label: 'Effect 5', value: 'interactive-banner--effect-5' },
                                        { label: 'Effect 6', value: 'interactive-banner--effect-6' },
                                        { label: 'Effect 7', value: 'interactive-banner--effect-7' },
                                        { label: 'Effect 8', value: 'interactive-banner--effect-8' },
                                        { label: 'Effect 9', value: 'interactive-banner--effect-9' },
                                        { label: 'Effect 10', value: 'interactive-banner--effect-10' },
                                        { label: 'Effect 11', value: 'interactive-banner--effect-11' },
                                        { label: 'Effect 12', value: 'interactive-banner--effect-12' },
                                    ]}
                                    onChange={val => setAttributes({ effect: val })}
                                />

                            
                            </PanelBody>

                            {layout != 4 &&
                                <PanelBody title={__('Media')} opened={'Media' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Media' ? 'Media' : '')}>
                                    <RadioAdvanced
                                        label={__('Type')}
                                        value={mediaType}
                                        options={[
                                            { label: __('Image'), value: 'image', title: __('Image') },
                                        ]}
                                        onChange={val => setAttributes({ mediaType: val, recreateStyles: !recreateStyles })}
                                    />
                                    {mediaType &&
                                        <Fragment>                                         
                                            {mediaType == 'image' &&
                                                <Fragment>
                                                    <ButtonGroup
                                                        label={__('Image Type')}
                                                        options={
                                                            [
                                                                [__('Local'), 'local'],
                                                                [__('External'), 'external']
                                                            ]
                                                        }
                                                        value={imageType}
                                                        onChange={value => setAttributes({ imageType: value })}
                                                    />
                                                    {
                                                        imageType === 'local' ?
                                                            <Fragment>
                                                                <Media label={__('Image')} multiple={false} type={['image']} panel={true} value={image} onChange={val => setAttributes({ image: val })} />
                                                                <Media label={__('Retina Image')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                                                            </Fragment>
                                                            :
                                                            <Url label={__('Image Source')} disableAdvanced value={externalImageUrl} onChange={newUrl => setAttributes({ externalImageUrl: newUrl })} />
                                                    }
                                                    <TextControl label={__('Alt Text')} value={imgAlt} onChange={val => setAttributes({ imgAlt: val })} />
                                                </Fragment>
                                            }                                        
                                        
                                        </Fragment>
                                    }
                                </PanelBody>
                            
                            }

                            <PanelBody title={__('Title')} opened={'Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Title' ? 'Title' : '')}>
                                <Toggle label={__('Enable')} value={enableTitle} onChange={val => setAttributes({ enableTitle: val })} />
                                {enableTitle == 1 && 
                                <Fragment>
                                <Headings label={__('Title Tag')} selectedLevel={titleLevel} onChange={(value) => setAttributes({ titleLevel: value })} />                              
                                <SelectControl
                                    label={__('Separator')}
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

                                </Fragment>
                                }
                            </PanelBody>

                            <PanelBody title={__('Sub Title')} opened={'Sub Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Sub Title' ? 'Sub Title' : '')}>
                                <Toggle label={__('Enable')} value={subTitle} onChange={val => setAttributes({ subTitle: val })} />
                                {subTitle == 1 &&
                                    <Fragment>
                                        <Headings label={__('Sub Title Tag')} selectedLevel={subTitleLevel} onChange={(value) => setAttributes({ subTitleLevel: value })} />
                                    </Fragment>
                                }
                            </PanelBody>


                            <PanelBody title={__('Content')} opened={'Content' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Content' ? 'Content' : '')}>
                                <Toggle label={__('Show Content')} value={enableContent} onChange={val => setAttributes({ enableContent: val })} />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs> 
                </InspectorControls>

                <BlockControls>
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
                    <div className={`wprig-banner-overlay`}></div>
                    <div
                        className={`wprig-block-info-box wprig-info-box-layout-${layout} wprig-interactive-banner ${effect}`}
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >
                        {(layout != 4 && mediaType) &&
                            <div className={`wprig-info-box-media${(useMediaBg && mediaType !== 'image') ? ' wprig-media-has-bg' : ''}`} onClick={() => this.handlePanelOpenings('Media')}>
                                {(mediaType == 'icon' && iconName) &&
                                    <i className={"wprig-info-box-icon " + iconName} />
                                }
                                {(mediaType == 'image') &&
                                    <Fragment>
                                        {
                                            (imageType === 'local' && image.url != undefined) ?
                                                <img className="wprig-info-box-image" src={image.url} srcset={image2x.url != undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''} alt={imgAlt && imgAlt} />
                                                :
                                                (imageType === 'external' && externalImageUrl.url != undefined) ?
                                                    <img className="wprig-info-box-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
                                                    :
                                                    <div className="wprig-info-box-image wprig-image-placeholder"><i className="far fa-image" /></div>
                                        }
                                    </Fragment>
                                }
                                
                                <div className = "wprig-info-box-media-overlay"></div>
                            </div>
                        }
                        
                        
                        <div className="wprig-info-box-body">
                            <div className={`wprig-info-box-title-container ${separatorStyle ? 'wprig-has-separator' : ''} ${separatorPosition ? 'wprig-separator-position-' + separatorPosition : ''}`} >
                            {enableTitle == 1 &&
                                <div className="wprig-info-box-title-inner">
                                    {separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-before">{renderSeparators}</div> : ''}
                                    
                                    
                                    <div onClick={() => this.handlePanelOpenings('Title')}>
                                        <RichText
                                            key="editable"
                                            tagName={titleTagName}
                                            className="wprig-info-box-title"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Text...')}
                                            onChange={value => setAttributes({ title: value })}
                                            value={title} />
                                    </div>
                                    {separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-after">{renderSeparators}</div> : ''}
                                </div>

                                }

                                {subTitle == 1 &&
                                    <div className="wprig-info-box-sub-title-container" onClick={() => this.handlePanelOpenings('Sub Title')}>
                                        <RichText
                                            key="editable"
                                            tagName={subTitleTagName}
                                            className="wprig-info-box-sub-title"
                                            keepPlaceholderOnFocus
                                            placeholder={__('Add Text...')}
                                            onChange={value => setAttributes({ subTitleContent: value })}
                                            value={subTitleContent} />
                                    </div>
                                }
                            </div>

                            {
                                enableContent &&
                                <div className="wprig-info-box-content" onClick={() => this.handlePanelOpenings('Content')}>
                                    <RichText
                                        key="editable"
                                        tagName='div'
                                        className="wprig-info-box-text"
                                        keepPlaceholderOnFocus
                                        placeholder={__('Add Text...')}
                                        onChange={value => setAttributes({ content: value })}
                                        value={content}
                                    />
                                </div>
                            }
                            {enableButton &&
                                <WPRigButtonEdit
                                    enableButton={enableButton}
                                    buttonFillType={buttonFillType}
                                    buttonSize={buttonSize}
                                    buttonText={buttonText}
                                    buttonIconName={buttonIconName}
                                    buttonIconPosition={buttonIconPosition}
                                    buttonUrl={buttonUrl}
                                    onTextChange={value => setAttributes({ buttonText: value })}
                                />
                            }
                        </div>
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