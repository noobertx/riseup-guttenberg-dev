const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, TextControl, Toolbar,SelectControl  } = wp.components;
const {
	Counter,
	Alignment,
	globalSettings: {
		globalSettingsPanel,
		animationSettings,
		interactionSettings
	},
	Inline: { InlineToolbar },
	ContextMenu: {
		ContextMenu,
		handleContextMenu
	},
	withCSSGenerator,
	InspectorTabs,
	InspectorTab
} = wp.wprigComponents

class Edit extends Component {
	constructor(props) {
		super(props)
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
				alignment,
				counterLimit,
				counterDuration,
				postfix,
				prefix,
				color_scheme,
				interaction,
				animation,
				globalZindex,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				hideTablet,
				hideMobile,
				globalCss
			} } = this.props
		const { device } = this.state

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={['style', 'advance']}>
						<InspectorTab key={'style'}>
							<PanelBody title={__('Counter Settings')}>
								<TextControl label={__('Counter Limit')} type="number" value={counterLimit} onChange={value => { setAttributes({ counterLimit: value }) }} />
								{counterLimit > 0 &&
									<Fragment>
										<TextControl label={__('Counter Duration')} type="number" value={counterDuration} onChange={value => { setAttributes({ counterDuration: value }) }} />
										<Alignment
											label={__('Alignment')}
											alignmentType="content"
											value={alignment}
											onChange={val => setAttributes({ alignment: val })}
											disableJustify
											responsive
											device={device}
											onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
								<SelectControl 
									label={"Color Scheme"} 
									value = {color_scheme} 
									onChange={ (val)=>
									setAttributes({color_scheme:val})
									} options = {[
									{value:'primary',label:'Primary'},
									{value:'info',label:'Info'},
									{value:'success',label:'Success'},
									{value:'warning',label:'Warning'},
									{value:'danger',label:'Danger'},
									{value:'secondary',label:'Secondary'},
									{value:'accent',label:'Accent'},
									{value:'dark',label:'Dark'},
									{value:'light',label:'Light'},
									{value:'white',label:'White'},
								]} ></SelectControl>
							</PanelBody>

							

							{counterLimit > 0 &&
								<PanelBody title={__('Prefix & Postfix')} initialOpen={false}>
									<TextControl label={__('Prefix')} value={prefix} placeholder={__('Example: $')} onChange={(value) => setAttributes({ prefix: value })} />
									<TextControl label={__('Postfix')} value={postfix} placeholder={__('Example: +')} onChange={(value) => setAttributes({ postfix: value })} />
									
								</PanelBody>
							}
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
						className="wprig-block-counter"
						onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
					>
						{counterLimit <= 0 && <div>Please enter counter number</div>}
						{counterDuration <= 0 && <div>Please enter counter Duration</div>}
						<div className={`wprig-block-counter-content  ${color_scheme}`}>
							{counterLimit > 0 && counterDuration > 0 &&
								<Fragment>
									{prefix && <span className="wprig-block-counter-prefix">{prefix}</span>}
									<span className="wprig-block-counter-number">
										<Counter number={counterLimit} counterDuration={counterDuration} />
									</span>
									{postfix && <span className="wprig-block-counter-postfix">{postfix}</span>}
								</Fragment>
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
		);
	}
}

export default withCSSGenerator()(Edit);