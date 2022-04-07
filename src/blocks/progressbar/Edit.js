const { __ } = wp.i18n
const { Fragment, Component, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar } = wp.components
const { InspectorControls, BlockControls } = wp.blockEditor
const {
    RadioAdvanced,
    Range,
    Typography,
    ColorAdvanced,
    Toggle,
    Color,
    BorderRadius,
    Inline: { InlineToolbar },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    globalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
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
            attributes,
            isSelected,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                progress,
                title,
                labelTypography,
                labelPosition,
                labelColor,
                labelSpacing,
                showProgress,
                barHeight,
                barBackground,
                progressBackground,
                striped,
                borderRadius,

                //animation
                animation,
                //global
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss,
                interaction }
        } = this.props
        const { device } = this.state
        const labelsContent = <Fragment>
            {title != '' &&
                <div className={`wprig-block-progress-labels wprig-position-${labelPosition}`}>
                    <div className="wprig-block-progress-bar-title">{title}</div>
                    {showProgress && <div className="wprig-progress-percentage"><span>{progress}%</span></div>}
                </div>
            }
        </Fragment>

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title="">
                                <Range label={__('Progress')} value={progress} onChange={(value) => setAttributes({ progress: value })} min={1} max={100} />
                                <Range label={__('Height')} value={barHeight} onChange={(value) => setAttributes({ barHeight: value })} min={1} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>

                            <PanelBody title={__('Text')} initialOpen={false}>
                                <TextControl label={__('Title')} value={title} onChange={val => setAttributes({ title: val })} />
                                {title != '' &&
                                    <Fragment>
                                        <Toggle label={__('Show Percentage')} value={showProgress} onChange={val => setAttributes({ showProgress: val })} />
                                        <RadioAdvanced
                                            label={__('Position')}
                                            options={[
                                                { label: __('Inside'), value: 'inside' },
                                                { label: __('Outside'), value: 'outside' }
                                            ]}
                                            value={labelPosition}
                                            onChange={val => setAttributes({ labelPosition: val })}
                                        />
                                        <Range label={__('Spacing')} value={labelSpacing} onChange={(value) => setAttributes({ labelSpacing: value })} unit={['px', 'em', '%']} min={0} max={40} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Typography label={__('Typography')} value={labelTypography} onChange={val => setAttributes({ labelTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Color label={__('Color')} value={labelColor} onChange={val => setAttributes({ labelColor: val })} />
                                    </Fragment>
                                }
                            </PanelBody>

                            <PanelBody title={__('Bar')} initialOpen={false}>
                                <ColorAdvanced label={__('Background')} value={progressBackground} onChange={val => setAttributes({ progressBackground: val })} />
                                <Toggle label={__('Striped')} value={striped} onChange={val => setAttributes({ striped: val })} />
                                <BorderRadius label={__('Radius')} value={borderRadius} onChange={val => setAttributes({ borderRadius: val })} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>

                            <PanelBody title={__('Background')} initialOpen={false}>
                                <Color
                                    label={__('Background')}
                                    value={barBackground}
                                    onChange={val => setAttributes({ barBackground: val })} />
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
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className="wprig-block-progress-bar"
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >
                        {labelPosition == 'outside' && labelsContent}
                        <div className="wprig-progress">
                            <div className="wprig-progress-bar" role="progressbar">
                                {striped && <div className="wprig-progress-striped"></div>}
                                {labelPosition == 'inside' && labelsContent}
                            </div>
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