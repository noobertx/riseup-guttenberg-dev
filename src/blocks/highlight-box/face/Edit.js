import classnames from 'classnames';

const { Fragment,Component ,createRef} = wp.element
const { __ } = wp.i18n;
const {
	InnerBlocks,
	InspectorControls
} = wp.blockEditor;

const { compose } = wp.compose;


const {
	PanelBody,
	SelectControl,
	RangeControl,
	Tooltip,
} = wp.components;

const {
	Background,
	Border,
	BorderRadius,
	BoxShadow,	
	InspectorTab,
	InspectorTabs,
	Range,
	Separator,
    
	Select,
	Toggle,
	withCSSGenerator,
	globalSettings: {
		globalSettingsPanel,
		animationSettings,
		interactionSettings
	}
} = wp.wprigComponents

class Edit extends Component {
    constructor(props) {
		super(props)
		this.state = {
			device: 'md'
		}
		this.wprigContextMenu = createRef();
	}

    componentDidMount() {
		const {
			block,
			clientId,
			setAttributes,
			updateBlockAttributes,
			attributes: {
				uniqueId
			}
		} = this.props;

		const _client = clientId.substr(0, 6);

		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}



	}

    render() {

        const {
			setAttributes,
			attributes: {
                uniqueId,
				className,

				faceBackground,
				enableOverlay,
				overlay,
				opacity,
				blend,
				border,
				borderRadius,
				faceShadow,
				rowHeight,
				heightOptions,
                //global
                animation,
				globalCss,
				hideTablet,
				hideMobile,
				interaction,
				globalZindex,
				positionXaxis,
				positionYaxis,
				enablePosition,
				selectPosition
			}
		} = this.props;
		
        
        const blockWrapperClasses = classnames(
			{ [`wprig-block-${uniqueId}`]: typeof uniqueId !== 'undefined' },
			{ [className]: typeof className !== 'undefined' }
		)

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>                            
							{/* <PanelBody initialOpen={false} title={__('Background')}>
                                <Background
                                    parallax
                                    value={faceBackground}
                                    label={__('Background')}
                                    externalImage
                                    sources={['image', 'gradient', 'video']}
                                    onChange={val => setAttributes({ faceBackground: val })}
                                />
                                <Separator />
                                <Border
                                    label={__('Border')}
                                    value={border} unit={['px', 'em']}
                                    responsive
                                    onChange={val => setAttributes({ border: val })}
                                    min={0}
                                    max={10}
                                    device={this.state.device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                                <Separator />
                                <BoxShadow label={__('Box-Shadow')} value={faceShadow} onChange={val => setAttributes({ faceShadow: val })} />
                                <Separator />
                                <BorderRadius
                                    label={__('Radius')}
                                    value={borderRadius}
                                    onChange={val => setAttributes({ borderRadius: val })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={this.state.device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />

                                <Separator />
                                <Toggle label={__('Enable Overlay')} value={enableOverlay} onChange={val => setAttributes({ enableOverlay: val })} />
                                {enableOverlay == 1 &&
                                    <Fragment>
                                        <Background label={__('Overlay')} sources={['image', 'gradient']} value={overlay} onChange={val => setAttributes({ overlay: val })} />
                                        {overlay.openBg == 1 &&
                                            <Fragment>
                                                <RangeControl beforeIcon={"lightbulb"} label={__('Overlay Opacity')} min={.01} max={1} step={.01} value={opacity} onChange={val => setAttributes({ opacity: val })} />
                                                <Select label={__('Overlay Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={blend} onChange={val => setAttributes({ blend: val })} />
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </PanelBody> */}

                        
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
                    </InspectorTabs>
                </InspectorControls>
            {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

            <div className={`${blockWrapperClasses} wp-block-wprig-highlight-box-face`}>
				{/* {(Object.entries(faceBackground).length > 0 && faceBackground.openBg == 1 && faceBackground.bgType == 'video') &&
                    videoBackground(faceBackground, 'row')
                } */}
				<div className="wprig-row-overlay"></div>
                {/* <InnerBlocks
                    templateLock={false}
                    templateInsertUpdatesSelection={false}
                    renderAppender={() => (
                        <InnerBlocks.ButtonBlockAppender />
                    )}
                /> */}
            </div>
            </Fragment>
        )
    }
}
// export default Edit

export default compose([
	withCSSGenerator()
])(Edit);
