import classnames from 'classnames';
import icons from '../../helpers/icons';

const { __ } = wp.i18n;
const {
	Toolbar,
	Tooltip,
	PanelBody
} = wp.components;

const { compose } = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const {
	Fragment,
	Component,
} = wp.element;

const {
	RichText,
	InnerBlocks,
	BlockControls,
	InspectorControls
} = wp.blockEditor;

const {
	Tab,
	Tabs,
	Color,
	Range,
	Select,
	Border,
	Styles,
	Padding,
	IconList,
	Separator,
	BoxShadow,
	Alignment,
	Typography,
	BorderRadius,
	InspectorTab,
	InspectorTabs,
    RadioAdvanced,
    Toggle,
	withCSSGenerator,
	Inline: {
		InlineToolbar
	},
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
			spacer: true,
			device: 'md',
			activeTab: 1,
			initialRender: true,
			showIconPicker: false,
		}
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

	updateTitles = (value, index) => {
		const { attributes: { tabTitles }, setAttributes } = this.props;
		const modifiedTitles = tabTitles.map((title, thisIndex) => {
			if (index === thisIndex) {
				title = { ...title, ...value }
			}
			return title
		})
		setAttributes({ tabTitles: modifiedTitles })
	}

	renderTabTitles = () => {
		const {
			activeTab,
			showIconPicker
		} = this.state;

		const {
			attributes: {
				tabTitles,
				iconPosition
			}
		} = this.props;

		const changeActiveTab = (index) => {
			this.setState({
				initialRender: false,
				activeTab: index + 1,
				showIconPicker: !showIconPicker
			});
		}

		return (
			tabTitles.map((title, index) => {
				let isActiveTab = false;
				if (activeTab === index + 1) {
					isActiveTab = true;
				}
				const wrapperClasses = classnames(
					'wprig-tab-item',
					{ ['wprig-active']: isActiveTab }
				)
				const titleClasses = classnames(
					'wprig-tab-title',
					{ [`wprig-has-icon-${iconPosition}`]: typeof title.iconName !== 'undefined' }
				)
				return (
					<div className={wrapperClasses}>
						<div
							role="button"
							className={titleClasses}
							onClick={() => changeActiveTab(index)}
						>
							{title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`wprig-tab-icon ${title.iconName}`} />)}
							{/* {
								isActiveTab ?

									<RichText
										value={title.title}
										keepPlaceholderOnFocus
										placeholder={__('Add Tab Title')}
										onChange={value => this.updateTitles({ title: value }, index)}
									/>
									:
									
							} */}
                            <div>{title.title}</div>
							{title.iconName && (iconPosition == 'right') && (<i className={`wprig-tab-icon ${title.iconName}`} />)}
						</div>
						<Tooltip text={__('Delete this tab')}>
							<span className="wprig-action-tab-remove" role="button" onClick={() => this.deleteTab(index)}>
								<i className="fas fa-times" />
							</span>
						</Tooltip>
					</div>
				)
			}
			));
	}

	deleteTab = (tabIndex) => {
		const { activeTab } = this.state;
		const {
			block,
			clientId,
			setAttributes,
			replaceInnerBlocks,
			updateBlockAttributes,
			attributes: {
				tabs,
				tabTitles
			}
		} = this.props;

		const newItems = tabTitles.filter((item, index) => index != tabIndex);
		let i = tabIndex + 1;

		setAttributes({
			tabTitles: newItems,
			tabs: tabs - 1
		});

		while (i < tabs) {
			updateBlockAttributes(block.innerBlocks[i].clientId,
				Object.assign(block.innerBlocks[i].attributes, {
					id: block.innerBlocks[i].attributes.id - 1
				}));
			i++;
		}

		let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));
		innerBlocks.splice(tabIndex, 1);

		replaceInnerBlocks(clientId, innerBlocks, false);

		this.setState(state => {
			let newActiveTab = state.activeTab - 1;
			if (tabIndex + 1 === activeTab) {
				newActiveTab = tabIndex == 0 ? 1 : tabIndex + 1 < tabs ? tabIndex + 1 : tabIndex
			}
			return {
				activeTab: newActiveTab,
				initialRender: false
			}
		});

	}

	getTemplate =(tabs)=>{
		
		const result = []
		for (let k = 0; k < tabs; k++) {
			result.push(['wprig/carousel-item',{id: tabIndex + 1}])
		}
		return 
		// return Array(tabs).fill(0).map((_, tabIndex) => (

		 	
		// )
	}
	render() {
		const {
			setAttributes,
			attributes: {
				uniqueId,
				className,

				tabs,
				navBg,
				navSize,
				navColor,
				tabStyle,
				tabTitles,
				navSpacing,
				typography,
				navPaddingY,
				navPaddingX,
				navBgActive,
				navAlignment,
				navColorActive,


				navBorder,
				navBorderActive,
				navBorderRadiusTabs,
				navBorderRadiusPills,
				navUnderlineBorderWidth,
				navUnderlineBorderColor,
				navUnderlineBorderColorActive,

				iconGap,
				iconSize,
				iconPosition,

				bodyBg,
				bodyBorder,
				bodyShadow,
				bodyPadding,
				bodyTopSpacing,
				bodyBorderRadius,
				bodySeparatorColor,
				bodySeparatorHeight,


                items,
				slidesToScroll,
				showDots,
				showArrows,
				isInfinite,
				enableFading,
				enableAutoplay,
				autoplaySpeed,
				enableAdaptiveHeight,
                speed,
                
				//animation
				animation,
				//global
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

		const {
			device,
			activeTab
		} = this.state;


		const newTitles = () => {
			let newTitles = JSON.parse(JSON.stringify(tabTitles));
			newTitles[tabs] = {
				title: __(`${tabs + 1}`)
			}


			return newTitles;
		}

		const addNewTab = () => {		

			const { activeTab } = this.state;
		const {
			block,
			clientId,
			setAttributes,
			replaceInnerBlocks,
			updateBlockAttributes,
			attributes: {
				tabs,
				tabTitles
			}
		} = this.props;


		// const newItems = tabTitles.filter((item, index) => index != tabs);
		let i = tabs + 1;

		setAttributes({
			tabTitles: newTitles(),
			tabs: tabs + 1
		});

		while (i < tabs) {
			updateBlockAttributes(block.innerBlocks[i].clientId,
				Object.assign(block.innerBlocks[i].attributes, {
					id: block.innerBlocks[i].attributes.id - 1
				}));
			i++;
		}

		let innerBlocks = JSON.parse(JSON.stringify(block.innerBlocks));

		replaceInnerBlocks(clientId, innerBlocks, false);

		this.setState(state => {
			let newActiveTab = state.activeTab - 1;
			if (tabs + 1 === activeTab) {
				newActiveTab = tabs == 0 ? 1 : tabs + 1 < tabs ? tabs + 1 : tabs
			}
			return {
				activeTab: newActiveTab,
				initialRender: false
			}
		});
			
			// this.setState({
			// 	activeTab: tabs + 1,
			// 	initialRender: false
			// });
			// setAttributes({
			// 	tabs: tabs + 1,
			// 	tabTitles: newTitles()
			// });
			
		}

		const blockWrapperClasses = classnames(
			{ [`wprig-block-${uniqueId}`]: typeof uniqueId !== 'undefined' },
			{ [className]: typeof className !== 'undefined' }
		)

		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={['style', 'advance']}>
						<InspectorTab key={'style'}>
                            <PanelBody title='Slide Options' initialOpen={false}>
								<Range label={__('Speed')} value={speed} onChange={value => setAttributes({ speed: parseInt(value) })} min={500} max={5000} />
								<Range label={__('Slide Items')} value={items} onChange={value => setAttributes({ items: parseInt(value) })} min={0} max={15} />
								<Range label={__('Slide to scroll')} value={slidesToScroll} onChange={value => setAttributes({ slidesToScroll: parseInt(value) })} min={0} max={15} />
								<Toggle label={__('Enable Dots')} value={showDots} onChange={value => setAttributes({ showDots: value })} />
								<Toggle label={__('Enable Arrows')} value={showArrows} onChange={value => setAttributes({ showArrows: value })} />
								<Toggle label={__('Infinite Loop')} value={isInfinite} onChange={value => setAttributes({ isInfinite: value })} />
								<Toggle label={__('Enable Fading')} value={enableFading} onChange={value => setAttributes({ enableFading: value })} />
								<Toggle label={__('Autoplay')} value={enableAutoplay} onChange={value => setAttributes({ enableAutoplay: value })} />

								{(enableAutoplay === true) &&
									<Range label={__('Autoplay Speed')} value={autoplaySpeed} onChange={value => setAttributes({ autoplaySpeed: parseInt(value) })} min={2000} max={60000} />
								}
								<Toggle label={__('Adaptive Height')} value={enableAdaptiveHeight} onChange={value => setAttributes({ enableAdaptiveHeight: value })} />

							</PanelBody>
							<PanelBody title={__('Styles')} initialOpen={false}>
								<Styles value={tabStyle} onChange={val => setAttributes({ tabStyle: val })}
									options={[
										{ value: 'tabs', svg: icons.tab_tabs, label: __('Tabs') },
										{ value: 'pills', svg: icons.tab_pills, label: __('Pills') },
										{ value: 'underline', svg: icons.tab_underline, label: __('Underline') },
									]}
								/>
								<Separator />
								<Alignment label={__('Alignment')} value={navAlignment} alignmentType="content" onChange={val => setAttributes({ navAlignment: val })} disableJustify />
							</PanelBody>

							<PanelBody title={__('Nav')} initialOpen={false}>
								<RadioAdvanced label={__('Nav Size')}
									options={[
										{ label: 'S', value: '4px 12px', title: 'Small' },
										{ label: 'M', value: '6px 15px', title: 'Medium' },
										{ label: 'L', value: '10px 20px', title: 'Large' },
										{ icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
									]}
									value={navSize} onChange={(value) => setAttributes({ navSize: value })} />

								{navSize == 'custom' &&
									<Fragment>
										<Range label={<span className="dashicons dashicons-sort" title="X Spacing" />} value={navPaddingY} onChange={(value) => setAttributes({ navPaddingY: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<Range label={<span className="dashicons dashicons-leftright" title="Y Spacing" />} value={navPaddingX} onChange={(value) => setAttributes({ navPaddingX: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}

								<Range label={__('Gap')} value={navSpacing} onChange={(value) => setAttributes({ navSpacing: value })} max={50} min={0} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />

								{tabStyle == 'tabs' &&
									<Fragment>
										<BorderRadius label={__('Radius')} value={navBorderRadiusTabs} onChange={(value) => setAttributes({ navBorderRadiusTabs: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
								{tabStyle == 'pills' &&
									<Fragment>
										<BorderRadius label={__('Radius')} value={navBorderRadiusPills} onChange={(value) => setAttributes({ navBorderRadiusPills: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
								{tabStyle == 'underline' &&
									<Range label={__('Underline Height')} value={navUnderlineBorderWidth} onChange={(value) => setAttributes({ navUnderlineBorderWidth: value })} min={1} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}

								<Tabs>
									<Tab tabTitle={__('Normal')}>
										<Color label={__('Color')} value={navColor} onChange={(value) => setAttributes({ navColor: value })} />
										{tabStyle != 'underline' &&
											<Fragment>
												<Color label={__('Background')} value={navBg} onChange={(value) => setAttributes({ navBg: value })} />
												<Border label={__('Border')} value={navBorder} onChange={(value) => setAttributes({ navBorder: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
											</Fragment>
										}
										{tabStyle == 'underline' &&
											<Fragment>
												<Color label={__('Line Color')} value={navUnderlineBorderColor} onChange={(value) => setAttributes({ navUnderlineBorderColor: value })} />
											</Fragment>
										}
									</Tab>
									<Tab tabTitle={__('Active')}>
										<Color label={__('Color')} value={navColorActive} onChange={(value) => setAttributes({ navColorActive: value })} />
										{tabStyle != 'underline' &&
											<Fragment>
												<Color label={__('Background')} value={navBgActive} onChange={(value) => setAttributes({ navBgActive: value })} />
												<Border label={__('Border')} value={navBorderActive} onChange={(value) => setAttributes({ navBorderActive: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
											</Fragment>
										}

										{tabStyle == 'underline' &&
											<Fragment>
												<Color label={__('Line Color')} value={navUnderlineBorderColorActive} onChange={(value) => setAttributes({ navUnderlineBorderColorActive: value })} />
											</Fragment>
										}
									</Tab>
								</Tabs>
								<Typography label={__('Typography')} value={typography} onChange={(value) => setAttributes({ typography: value })} disableLineHeight device={device} onDeviceChange={value => this.setState({ device: value })} />
							</PanelBody>
							<PanelBody title={__('Icon')} initialOpen={false}>

								<IconList
									label={__('Icon')}
									value={tabTitles[activeTab - 1] && tabTitles[activeTab - 1].iconName}
									onChange={(value) => this.updateTitles({ iconName: value }, activeTab - 1)} />
								<Select
									label={__('Icon Position')}
									options={[['left', __('Left')], ['right', __('Right')], ['top', __('Top')]]}
									value={iconPosition}
									onChange={(value) => setAttributes({ iconPosition: value })} />
								<Range
									label={__('Icon Size')}
									value={iconSize}
									onChange={(value) => setAttributes({ iconSize: value })}
									unit={['px', 'em', '%']}
									min={5}
									max={48}
									responsive
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />
								<Range
									label={__('Icon Gap')}
									value={iconGap}
									onChange={value => setAttributes({ iconGap: value })}
									unit={['px', 'em', '%']}
									min={0}
									max={64}
									responsive
									device={device}
									onDeviceChange={value => this.setState({ device: value })} />

							</PanelBody>
							<PanelBody title={__('Body')} initialOpen={false}>
								{tabStyle == 'tabs' &&
									<Fragment>
										<Color label={__('Background Color')} value={bodyBg} onChange={(value) => setAttributes({ bodyBg: value })} />
										<Padding label={__('Padding')} value={bodyPadding} onChange={(value) => setAttributes({ bodyPadding: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								}
								{tabStyle == 'underline' &&
									<Fragment>
										<Range label={__('Separator Height')} value={bodySeparatorHeight} onChange={(value) => setAttributes({ bodySeparatorHeight: value })} min={0} max={5} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										{bodySeparatorHeight.md > 0 &&
											<Color label={__('Separator Color')} value={bodySeparatorColor} onChange={(value) => setAttributes({ bodySeparatorColor: value })} />
										}
										<Separator />
									</Fragment>
								}
								{tabStyle != 'tabs' &&
									<Range label={__('Spacing')} value={bodyTopSpacing} onChange={(value) => setAttributes({ bodyTopSpacing: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}

								{tabStyle == 'tabs' &&
									<Fragment>
										<Border label={__('Border')} separator value={bodyBorder} onChange={(value) => setAttributes({ bodyBorder: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BoxShadow label={__('Box-Shadow')} value={bodyShadow} onChange={(value) => setAttributes({ bodyShadow: value })} />
										<BorderRadius label={__('Radius')} separator value={bodyBorderRadius} onChange={(value) => setAttributes({ bodyBorderRadius: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
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
							data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
				</BlockControls>

				{globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

				<div className={blockWrapperClasses}>
					<div className={`wprig-block-tab wprig-tab-style-${tabStyle} wprig-active-tab-${activeTab}`}>

						<div className={`wprig-tab-nav wprig-alignment-${navAlignment}`}>

							{this.renderTabTitles()}

							<Tooltip text={__('Add new item')}>
								<span
									role="button"
									areaLabel={__('Add new item')}
									className="wprig-add-new-tab"
									onClick={() => {addNewTab()}}
								>
									<i className="fas fa-plus-circle" />
								</span>
							</Tooltip>
						</div>
						<div className={`wprig-tab-body`}>
							<InnerBlocks
								tagName="div"
								templateLock='all'
								allowedBlocks={['wprig/carousel-item']}
								template={
									Array(tabs).fill(0).map((_, tabIndex) => (
										
										['wprig/carousel-item',
											{
												id: tabIndex + 1,
												...(tabIndex === 0 && { customClassName: 'wprig-active' })
											}
										])
									)}
								
							/>
						</div>
					</div>
				</div>

			</Fragment>
		)
	}
}
export default compose([
	withSelect((select, ownProps) => {
		const { clientId } = ownProps;
		const { getBlock } = select('core/block-editor');
		return {
			block: getBlock(clientId)
		};
	}),
	withDispatch((dispatch) => {
		const {
			getBlocks,
			insertBlock,
			removeBlock,
			replaceInnerBlocks,
			updateBlockAttributes
		} = dispatch('core/block-editor');

		return {
			getBlocks,
			insertBlock,
			removeBlock,
			replaceInnerBlocks,
			updateBlockAttributes
		};
	}),
	withCSSGenerator()
])(Edit);
