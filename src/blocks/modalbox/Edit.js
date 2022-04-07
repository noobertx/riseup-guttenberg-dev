const { __ } = wp.i18n;
const { Component, Fragment, createRef } = wp.element;
const {
	InspectorControls,
    ToggleControl,
    SelectControl,
    RangeControl,
    PanelBody,
    InnerBlocks
} = wp.blockEditor;
const {
	globalSettings: {
		globalSettingsPanel,
		animationSettings,
		interactionSettings
	},
	Inline: {
		InlineToolbar
    },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
	ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
} = wp.wprigComponents

class Edit extends Component {
    constructor() {
		super(...arguments);
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
    
    render(){
        const {
			name,
			clientId,
			attributes,
			setAttributes,
			isSelected,
			attributes: {
				uniqueId,
                className,
                close,
                delay,
                remeber,
                size,
                id,
                classesList,
                style,
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
			}
		} = this.props
        const { device } = this.state
        
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Modal Settings')} initialOpen={true}>
                                <SelectControl
									label={__('Size')}
									value={size}
									options={[
										{ label: __('Full Width'), value: 'full' },
										{ label: __('Medium Size'), value: 'medium' },
										{ label: __('Small Size'), value: 'small' },
									]}
									onChange={value => setAttributes({ size: value })}
								/>

                                <ToggleControl 
                                    label= {__('Show Close Button')}
                                    checked= {!!close}
                                    onChange={value => setAttributes({ close: value })}
                                    />

                                <RangeControl 
                                    label = {__('Delay (seconds)')}
                                    value = {delay}
                                    min = '1'
                                    max = '60'
                                    onChange={value => setAttributes({ delay: value })}
                                    />

                                <RangeControl 
                                    label = {__('Days')}
                                    value = {remeber}
                                    min = '1'
                                    max = '30'
                                    onChange={value => setAttributes({ remeber: value })}
                                    />
                            </PanelBody>
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>
                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-modal-elements  gutten-modal-123  wprig-block-${uniqueId} ${className ? ` ${className}` : ''}`}>
                    <div className={`wprig-block-wrapper-block`}>
                    <InnerBlocks templateLock={false} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withCSSGenerator()(Edit);