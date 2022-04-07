const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components
const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor
const { Media,RadioAdvanced,Range,Toggle,Separator,Styles,Alignment,globalSettings: { globalSettingsPanel, animationSettings, interactionSettings }, Inline: { InlineToolbar }, ContextMenu: { ContextMenu, handleContextMenu }, withCSSGenerator, InspectorTabs, InspectorTab, InspectorSections } = wp.wprigComponents
import icons from '../../helpers/icons'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
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
            layout,
            className,
            message,
            name,
            alignment,
            designation,
            showAvatar,
            avatar,
            avatar2x,
            avatarAlt,
            avatarLayout,
            showRatings,
            quoteIcon,
            ratings,

            //animation
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
        } = this.props.attributes

        const { clientId, attributes, setAttributes, isSelected } = this.props;
        const { openPanelSetting, device } = this.state;

        const testimonialTitle = <RichText
            key="editable"
            tagName="span"
            keepPlaceholderOnFocus
            placeholder={__('Add Name...')}
            allowedFormats={['bold', 'italic', 'link', 'strikethrough']}
            onChange={value => setAttributes({ name: value })}
            value={name}
        />

        const testimonialDesignation = <RichText
            key="editable"
            tagName="span"
            placeholder={__('Add designation...')}
            allowedFormats={['bold', 'italic', 'link', 'strikethrough']}
            keepPlaceholderOnFocus
            onChange={value => setAttributes({ designation: value })}
            value={designation}
        />

        const testimonialContent = <RichText
            key="editable"
            tagName="div"
            placeholder={__('Add Message...')}
            allowedFormats={['bold', 'italic', 'link', 'strikethrough']}
            keepPlaceholderOnFocus
            onChange={value => setAttributes({ message: value })}
            value={message}
        />

        const authorInfo = <Fragment>
            <div className={`wprig-testimonial-author`}>
                <div className={showAvatar ? `wprig-testimonial-avatar-layout-${avatarLayout}` : ``}>
                    {showAvatar && (avatarLayout == 'left' || avatarLayout == 'top') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="wprig-testimonial-avatar" src={avatar.url} srcset={avatar2x.url != undefined ? avatar.url + ' 1x, ' + avatar2x.url + ' 2x' : ''} alt={avatarAlt} onClick={() => this.handlePanelOpenings('Avatar')} />
                                :
                                <div className="wprig-image-placeholder wprig-testimonial-avatar" onClick={() => this.handlePanelOpenings('Avatar')}><i className="far fa-user" /></div>
                            }
                        </Fragment>
                    }

                    <div className="wprig-testimonial-author-info">
                        <div className="wprig-testimonial-author-name" onClick={() => this.handlePanelOpenings('Name')}>{testimonialTitle}</div>
                        <div className="wprig-testimonial-author-designation" onClick={() => this.handlePanelOpenings('Designation')}>{testimonialDesignation}</div>
                    </div>

                    {showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="wprig-testimonial-avatar" src={avatar.url} srcset={avatar2x.url != undefined ? avatar.url + ' 1x, ' + avatar2x.url + ' 2x' : ''} alt={avatarAlt} onClick={() => this.handlePanelOpenings('Avatar')} />
                                :
                                <div className="wprig-image-placeholder wprig-testimonial-avatar" onClick={() => this.handlePanelOpenings('Avatar')}><i className="far fa-user" /></div>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key={'style'}>
                            <PanelBody title="" initialOpen={true}>
                                <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 1, svg: icons.testimonial_1, label: __('Layout 1') },
                                        { value: 2, svg: icons.testimonial_2, label: __('Layout 2') }
                                    ]}
                                />
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} alignmentType="content" disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>
                            



                            <PanelBody title={__('Avatar')} opened={'Avatar' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Avatar' ? 'Avatar' : '')}>
                                <Toggle label={__('Show Avatar')} value={showAvatar} onChange={val => setAttributes({ showAvatar: val })} />
                                {
                                    showAvatar && <Fragment>
                                        <Media
                                            label={__('Upload Avatar')} multiple={true} type={['image']}
                                            value={avatar} panel={true} onChange={value => setAttributes({ avatar: value })} />

                                        <Media
                                            label={__('Upload Avatar @2x')} multiple={false} type={['image']}
                                            value={avatar2x} panel={true} onChange={value => setAttributes({ avatar2x: value })} />
                                        {avatar.url &&
                                            <TextControl
                                                label={__('Alt Text (Alternative Text)')}
                                                value={avatarAlt} onChange={value => setAttributes({ avatarAlt: value })} />
                                        }
                                        <Styles label={__('Avatar Layout')} value={avatarLayout} onChange={val => setAttributes({ avatarLayout: val })}
                                            options={[
                                                { value: 'left', svg: icons.avatar_left, label: __('Left') },
                                                { value: 'right', svg: icons.avatar_right, label: __('Right') },
                                                { value: 'top', svg: icons.avatar_top, label: __('Top') },
                                                { value: 'bottom', svg: icons.avatar_bottom, label: __('Bottom') },
                                            ]}
                                        />
                                        <Separator />
                                            
                                    </Fragment>
                                }
                            </PanelBody>

                            <PanelBody title={__('Quote Icon')} opened={'Quote Icon' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Quote Icon' ? 'Quote Icon' : '')}>
                                <RadioAdvanced
                                    label={__('Icon')}
                                    options={[
                                        { icon: 'fas fa-ban', value: '' },
                                        { icon: 'fas fa-quote-left', value: 'fas fa-quote-left' }
                                    ]}
                                    value={quoteIcon}
                                    onChange={val => setAttributes({ quoteIcon: val })} />                                
                            </PanelBody>

                            <PanelBody title={__('Ratings')} opened={'Ratings' === openPanelSetting} onToggle={() => this.handlePanelOpenings(openPanelSetting !== 'Ratings' ? 'Ratings' : '')}>

                                <Toggle label={__('Show Ratings')} value={showRatings} onChange={val => setAttributes({ showRatings: val })} />
                                {
                                    showRatings &&

                                        <Range
                                            label={__('Ratings')}
                                            value={ratings} onChange={(value) => setAttributes({ ratings: value })}
                                            min={0}
                                            max={5} step={.1} />
                                }                                     
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
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                    <AlignmentToolbar
                        controls={['left', 'center', 'right']}
                        value={alignment}
                        onChange={(value) => { setAttributes({ alignment: value }) }}
                    />
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className={`wprig-block-testimonial`}
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >

                        {layout == 2 && authorInfo}

                        {(showRatings && ratings > 0 && layout == 2) &&
                            <div className="wprig-testimonial-ratings" style={{ '--wprig-testimonial-rating': `${ratings * 20}%` }} onClick={() => this.handlePanelOpenings('Ratings')}></div>
                        }

                        {(quoteIcon && (layout == 1)) &&
                            <div className="wprig-testimonial-quote" onClick={() => this.handlePanelOpenings('Quote Icon')}><span className={`wprig-quote-icon ${quoteIcon}`} /></div>
                        }

                        <div className="wprig-testimonial-content" onClick={() => this.handlePanelOpenings('Message')} >
                            {testimonialContent}
                        </div>

                        {(showRatings && ratings > 0 && layout == 1) &&
                            <div className="wprig-testimonial-ratings" style={{ '--wprig-testimonial-rating': `${ratings * 20}%` }} onClick={() => this.handlePanelOpenings('Ratings')}></div>
                        }

                        {layout == 1 && authorInfo}

                        {(quoteIcon && (layout == 2)) &&
                            <div className="wprig-testimonial-quote wprig-position-bottom" onClick={() => this.handlePanelOpenings('Quote Icon')}><span className={`wprig-quote-icon ${quoteIcon}`} /></div>
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