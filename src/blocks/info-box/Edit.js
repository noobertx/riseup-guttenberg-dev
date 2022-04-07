const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, SelectControl, TextControl, Toolbar } = wp.components
const { RichText, InspectorControls, BlockControls } = wp.blockEditor
const { WPRigButtonEdit, Background, ButtonGroup, Url, Media, Tabs, Tab, Range, BoxShadow, ContextMenu: { ContextMenu, handleContextMenu }, RadioAdvanced, Typography, Toggle, Styles, Alignment, IconList, ColorAdvanced, Color, Headings, Border, BorderRadius, Padding, globalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, wprigButton: { buttonSettings }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import icons from '../../helpers/icons';
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
            enableContent,
            content,

            iconName,
            useMediaBg,
            mediaBackgroundSize,

            image,
            image2x,
            imgAlt,
            imageType,
            externalImageUrl,

            number,
            numberTypography,
            enableButton,

            // Button
            buttonSize,
            buttonFillType,
            buttonText,
            buttonIconName,
            buttonIconPosition,
            buttonUrl,

            style,

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
                                <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 1, svg: icons.infobox_1, label: __('Layout 1') },
                                        { value: 2, svg: icons.infobox_2, label: __('Layout 2') },
                                        { value: 3, svg: icons.infobox_3, label: __('Layout 3') },
                                        { value: 4, svg: icons.infobox_4, label: __('Layout 4') },
                                    ]}
                                />
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="text" onChange={val => setAttributes({ alignment: val })}   device={device} onDeviceChange={value => this.setState({ device: value })} />

                            </PanelBody>

                            {layout != 4 &&
                                <PanelBody title={__('Media')} opened={'Media' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Media' ? 'Media' : '')}>
                                    <RadioAdvanced
                                        label={__('Type')}
                                        value={mediaType}
                                        options={[
                                            { label: __('Icon'), value: 'icon', title: __('Icon') },
                                            { label: __('Image'), value: 'image', title: __('Image') },
                                            { label: __('Number'), value: 'number', title: __('Number') }
                                        ]}
                                        onChange={val => setAttributes({ mediaType: val, recreateStyles: !recreateStyles })}
                                    />
                                    {mediaType &&
                                        <Fragment>
                                            {mediaType == 'icon' &&
                                                <Fragment>
                                                    <IconList label={__('Icon')} value={iconName} onChange={val => setAttributes({ iconName: val })} disableToggle />
                                                    {/* <RadioAdvanced label={__('Icon Size')} value={iconSize} onChange={(value) => setAttributes({ iconSize: value })}
                                                        options={[
                                                            { label: 'S', value: '36px', title: 'Small' },
                                                            { label: 'M', value: '64px', title: 'Medium' },
                                                            { label: 'L', value: '128px', title: 'Large' },
                                                            { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                                        ]}
                                                    /> */}
                                                    {/* {iconSize == 'custom' &&
                                                        <Range label={__('Custom Size')} value={iconSizeCustom} onChange={val => setAttributes({ iconSizeCustom: val })} min={12} max={300} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                    } */}
                                                </Fragment>
                                            }

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
                                                    {/* <Range label={__('Image Width')} value={imageWidth} onChange={val => setAttributes({ imageWidth: val })} min={0} max={2000} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                                </Fragment>
                                            }

                                            {mediaType == 'number' &&
                                                <Fragment>
                                                    <TextControl label={__('Number')} type="number" value={number} onChange={val => setAttributes({ number: parseInt(val) })} />
                                                    <Typography value={numberTypography} onChange={(value) => setAttributes({ numberTypography: value })} disableLineHeight device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                </Fragment>
                                            }

                                            {mediaType != 'image' &&
                                                <Fragment>
                                                    <Toggle label={__('Use Background')} value={useMediaBg} onChange={val => setAttributes({ useMediaBg: val })} />
                                                    {useMediaBg == 1 &&
                                                        <Range label={__('Background Size')} value={mediaBackgroundSize} onChange={val => setAttributes({ mediaBackgroundSize: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                                    }
                                                </Fragment>
                                            }

                                            {/* <BorderRadius label={__('Radius')} value={mediaBorderRadius} onChange={val => setAttributes({ mediaBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                            {/* <Range label={__('Spacing')} value={mediaSpacing} onChange={val => setAttributes({ mediaSpacing: val })} min={0} max={200} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                        </Fragment>
                                    }

                                     <SelectControl
                                    label={__('Style')}
                                    value={style}
                                    options={[
                                        { label: 'None', value: '' },
                                        { label: 'Style 1', value: 'style-1' },
                                        { label: 'Style 2', value: 'style-2' },
                                        { label: 'Style 3', value: 'style-3' },
                                        { label: 'Style 4', value: 'style-4' },
                                        { label: 'Style 5', value: 'style-5' },
                                    ]}
                                    onChange={val => setAttributes({ style: val })}
                                />
                                </PanelBody>
                            
                            }

                            <PanelBody title={__('Title')} opened={'Title' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Title' ? 'Title' : '')}>
                                <Toggle label={__('Enable')} value={enableTitle} onChange={val => setAttributes({ enableTitle: val })} />
                                {subTitle == 1 && 
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

                            
                            {/* {buttonSettings(this.props.attributes, device, (key, value) => { setAttributes({ [key]: value }) }, (key, value) => { this.setState({ [key]: value }) })} */}
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
                    <div
                        className={`wprig-block-info-box wprig-info-box-layout-${layout}`}
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
                                {(mediaType == 'number' && number) &&
                                    <span className="wprig-info-box-number">{number}</span>
                                }
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
                                            className={`wprig-info-box-title text-${alignment}`}
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
                                            className={`wprig-info-box-sub-title text-${alignment}`}
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
                                        className={`wprig-info-box-text text-${alignment}`}
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