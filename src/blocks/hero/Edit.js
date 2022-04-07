
const { Component , Fragment} = wp.element;
const { select, withDispatch } = wp.data
const { compose } = wp.compose;
const { ServerSideRender } = wp.editor;
const { RichText, InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl,Toolbar, IconButton,Placeholder, Disabled  } = wp.components;
const {
	Url,
	Separator,
	RadioAdvanced,
	ColorAdvanced,
	InspectorTab,
	InspectorTabs,
	InspectorSections,
	Background,
	Typography,
	withCSSGenerator,
	Styles
} = wp.wprigComponents
const { __ } = wp.i18n;


class Edit extends Component {
 	constructor(props) {
		super(props);
		this.state = {
			editMode: true,
			currentTab: 0,
		}
	}

	componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            // setAttributes({ uniqueId: _client });

        }
    }

    

 	getInspectorControls = () => {
		const { attributes:{
			uniqueId,
			myRichHeading,
			myRichText,
			bodyBg,
			headerTypography,
			subheaderTypography,
			toggle,
			favoriteAnimal,
			favoriteColor,
			textAlignment,
			buttonGroup,
			recreateStyles,
			disableFullWidth,
			buttonText,
			buttonWidthType,
			fillTypes,
			url,
			buttonSize,
			buttonTypography,
			buttonTypographyHover ,

			
			bgButtonColor,
			bgButtonHoverColor,
			buttonBorder,
			buttonHoverBorder,

			buttonBorderRadius,
			buttonShadow,
			buttonHoverShadow,

			iconName,
			iconPosition,
			iconSize,
			sourceOfCopiedStyle	
		}, setAttributes } = this.props;

		const { device,currentTab } = this.state
 
		return (
			<InspectorControls key="inspector">
				<InspectorTabs tabs={['normal','hover', 'advance']} defaultTab="normal">
				
					<InspectorTab key='normal'>
						
						<PanelBody
						title="Image"
						initialOpen={false}	>
							<PanelRow>	

									<Background
		                                    label={'Background'}
		                                    sources={['image', 'gradient']}
		                                    value={bodyBg} onChange={val => setAttributes({ bodyBg: val })} 
		                                />
								</PanelRow>	
							</PanelBody>
						<PanelBody
						title="Heading"
						initialOpen={false}>
							<PanelRow>	
									<Typography label={'Typography'}  value={headerTypography} onChange={val => setAttributes({ headerTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
							</PanelRow>
						</PanelBody>
						<PanelBody
						title="Sub Heading"
						initialOpen={false}>
								<PanelRow>	
										<Typography label={'Typography'}  value={subheaderTypography} onChange={val => setAttributes({ subheaderTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								</PanelRow>
							</PanelBody>

							<PanelBody title={'CTA Button'} initialOpen={false}>
								<Styles value={fillTypes}
	                                    onChange={(value) => setAttributes({ fillTypes: value })}
	                                    options={[
	                                        { value: 'fill', svg: "", label: 'Fill'},
	                                        { value: 'outline', svg: "", label: 'Outline' }
	                                    ]}
	                                />
	                            <Separator />
	                            <PanelRow>	
	                            <div>
	                                <Url label={__('Button URL')} value={url} onChange={(value) => setAttributes({ url: value })} />
	                                               
	                            <Separator />
	                            <ColorAdvanced label={__('Background')} value={bgButtonColor} onChange={(val) => {
	                                 	setAttributes({'bgButtonColor': val})
	                                 }} />
                              	<Separator />
	                            
										<Typography label={'Typography'}  value={buttonTypography} onChange={val => setAttributes({ buttonTypography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
										</div>
								</PanelRow>

							</PanelBody>
							<PanelBody title={'Size'} initialOpen={false}>
								 <RadioAdvanced
                                    label={__('Button Size')}
                                    options={[
                                        { label: 'S', value: 'sm', title: 'Small' },
                                        { label: 'M', value: 'md', title: 'Medium' },
                                        { label: 'L', value: 'lg', title: 'Large' },
                                        { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                    ]}
                                    value={buttonSize}
                                    onChange={(value) => setAttributes({ buttonSize: value })} />
								
							</PanelBody>
						</InspectorTab>	

						<InspectorTab key='hover'>
							<PanelBody
							title="CTA Button"
							initialOpen={false}>
								<PanelRow>	
								<div>
	                            <ColorAdvanced label={__('Background')} value={bgButtonHoverColor} onChange={(val) => {
	                                 	setAttributes({'bgButtonHoverColor': val})
	                                 }} />
                              	<Separator />
	                            
										<Typography label={'Typography'}  value={buttonTypographyHover} onChange={val => setAttributes({ buttonTypographyHover: val })} device={device} onDeviceChange={value => this.setState({ device: value })} />
										</div>
								</PanelRow>
							</PanelBody>
                        </InspectorTab>		

						<InspectorTab key='advance'>
                        </InspectorTab>			
					</InspectorTabs>
				</InspectorControls>
		);
	}
 
	getBlockControls = () => {
		const { attributes:{
			textAlignment

		}, setAttributes } = this.props;
 
		return (
			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>
				<Toolbar>
				<IconButton
					label={ this.state.editMode ? "Preview" : "Edit" }
					icon={ this.state.editMode ? "format-image" : "edit" }
					onClick={() => this.setState({ editMode: !this.state.editMode })}
				/>
			</Toolbar>
			</BlockControls>
		);
	}
 
	render() {
		const { attributes:{
			uniqueId,
			myRichHeading,
			myRichText,
			bodyBg,
			headerTypography,
			subheaderTypography ,
			toggle,
			favoriteColor,
			favoriteAnimal,
			textAlignment,

			buttonGroup,
			recreateStyles,
			disableFullWidth,
			buttonText,
			buttonWidthType,
			fillTypes,
			url,
			buttonSize,
			buttonTypography,
			buttonTypographyHover ,

			bgButtonColor,
			bgButtonHoverColor,
			buttonBorder,
			buttonHoverBorder,

			buttonBorderRadius,
			buttonShadow,
			buttonHoverShadow,

			iconName,
			iconPosition,
			iconSize,
			sourceOfCopiedStyle
			

		}, setAttributes } = this.props;
		const { device } = this.state;
		const alignmentClass = (textAlignment != null) ? 'has-text-align-' + textAlignment : '';
 
		return ([
		this.getInspectorControls(),
		this.getBlockControls(),
		<div className={alignmentClass}>
			{this.state.editMode && 
				<Fragment>
					<RichText 
						tagName="h2"
						placeholder="Write your heading here"
						value={myRichHeading}
						onChange={(newtext) => setAttributes({ myRichHeading: newtext })}
					/>
					<RichText
						tagName="p"
						placeholder="Write your paragraph here"
						value={myRichText}
						onChange={(newtext) => setAttributes({ myRichText: newtext })}
					/>
					<RichText
						tagName="a"
						placeholder="Button Text here"
						value={buttonText}
						onChange={(newtext) => setAttributes({ buttonText: newtext })}
					/>
				</Fragment>
			}
			{!this.state.editMode && 
				<ServerSideRender
					block={this.props.name}
					attributes={{ 
						uniqueId: uniqueId, 
						myRichHeading: myRichHeading, 
						myRichText: myRichText, 
						textAlignment: textAlignment, 
						bodyBg: bodyBg, 
						headerTypography: headerTypography, 
						subheaderTypography: subheaderTypography, 
						toggle: toggle, 
						favoriteAnimal: favoriteAnimal, 
						favoriteColor: favoriteColor,
						buttonGroup:buttonGroup,
						recreateStyles:recreateStyles,
						disableFullWidth:disableFullWidth,
						buttonText:buttonText,
						buttonWidthType:buttonWidthType,
						fillTypes:fillTypes,
						url:url,
						buttonSize:buttonSize,
						buttonTypography:buttonTypography,
						buttonTypographyHover :buttonTypographyHover ,

						bgButtonColor:bgButtonColor,
						bgButtonHoverColor:bgButtonHoverColor,
						buttonBorder:buttonBorder,
						buttonHoverBorder:buttonHoverBorder,

						buttonBorderRadius:buttonBorderRadius,
						buttonShadow:buttonShadow,
						buttonHoverShadow:buttonHoverShadow,

						iconName:iconName,
						iconPosition:iconPosition,
						iconSize:iconSize,
						sourceOfCopiedStyle:sourceOfCopiedStyle
					}}
				/>
			}
		</div>
	]);
	}
}


export default compose([
    withDispatch((dispatch) => {
        const {
            removeBlock,
        } = dispatch('core/block-editor');

        return {
            removeBlock,
        };
    }),
    withCSSGenerator()
])(Edit);