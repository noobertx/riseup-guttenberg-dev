import classnames from 'classnames';
import icons from '../../helpers/icons';
import './style-editor.scss';
const { __ } = wp.i18n;
const {
	Toolbar,
	Tooltip,
	SelectControl,
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
	Alignment,
	Color,
	Range,
	Select,
	Border,
	Padding,
	BoxShadow,
	Typography,
	BorderRadius,
	InspectorTab,
	InspectorTabs,
	withCSSGenerator,
	Shape,
	Tabs,
	Tab,
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
							<div>{title.title}</div> 
						</div>
						{/* <Tooltip text={__('Delete this tab')}>
							<span className="wprig-action-tab-remove" role="button" onClick={() => this.deleteTab(index)}>
								<i className="fas fa-times" />
							</span>
						</Tooltip> */}
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

	render() {
		const {
			setAttributes,
			attributes: {
				uniqueId,
				className,

				tabs,
				tabTitles,

				bodyBg,
				bodyBorder,
				bodyShadow,
				bodyPadding,
				bodyBorderRadius,
				alignment,
				hoverEffect,
				direction,
				heightOptions,
				rowHeight,
				position,

				shapeBottom,
				shapeTop,
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
				title: __(`Tab ${tabs + 1}`),
				icon: {},
			}
			return newTitles;
		}

		const getTemplate =(tabs)  =>{
			// Array(tabs).fill(0).map((_, tabIndex) => (
			// 	['wprig/face',
			// 		{
			// 			id: tabIndex + 1,
			// 			...(tabIndex === 0 && { customClassName: 'wprig-active' })
			// 		}
			// 	])
			// )
			
			return [
				['wprig/highlight-box-face',
					{
						id: 1,
						customClassName: 'wprig-primary' 
					}
				],
				['wprig/highlight-box-face',
					{
						id: 2,
						customClassName: 'wprig-secondary' 
					}
				]
			]
			// return [...Array(parseInt(tabs))].map((data, index) => {
			// 	// const columnWidth = { md: defaultLayout.md[index], sm: defaultLayout.sm[index], xs: defaultLayout.xs[index], unit: '%', device: 'md' }
			// 	// return ['wprig/face', { colWidth: columnWidth }]
			// })
		}

		const addNewTab = () => {
			this.setState({
				activeTab: tabs + 1,
				initialRender: false
			});
			setAttributes({
				tabs: tabs + 1,
				tabTitles: newTitles()
			});
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
							<PanelBody title={__('Dimension')} initialOpen={true}>
							<SelectControl
                                    label={__('Height')}
                                    value={heightOptions || ''}
                                    options={[
                                        { label: __('Auto'), value: '' },
                                        { label: __('Window Height (100%)'), value: 'window' },
                                        { label: __('Custom'), value: 'custom' }
                                    ]}
                                    onChange={val => setAttributes({ heightOptions: val })}
                                />

                                {heightOptions === 'custom' &&
                                    <Range
                                        label={__('Min Height')}
                                        value={rowHeight || ''}
                                        onChange={val => setAttributes({ rowHeight: val })}
                                        min={40}
                                        max={1200}
                                        unit={['px', 'em', '%']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                }
					           <Alignment label={__('Alignment')} value={alignment} onChange={val => setAttributes({ alignment: val })} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                    
								<div className="wprig-field">
                                    <label>{__('Content Position')}</label>
                                    <div className="wprig-field-button-list wprig-field-button-list-fluid">
                                        <Tooltip text={__('Top')}>
                                            <button
                                                onClick={() => setAttributes({ position: 'flex-start' })}
                                                className={"wprig-button" + (position === 'flex-start' ? ' active' : '')}
                                            >{icons.vertical_top}</button>
                                        </Tooltip>

                                        <Tooltip text={__('Middle')} >
                                            <button
                                                onClick={() => setAttributes({ position: 'center' })}
                                                className={"wprig-button" + (position === 'center' ? ' active' : '')}
                                            >{icons.vertical_middle}</button>
                                        </Tooltip>

                                        <Tooltip text={__('Bottom')} >
                                            <button
                                                onClick={() => setAttributes({ position: 'flex-end' })}
                                                className={"wprig-button" + (position === 'flex-end' ? ' active' : '')}
                                            >{icons.vertical_bottom}</button>
                                        </Tooltip>
                                    </div>
                                </div>

								
							</PanelBody>
							<PanelBody title={__('Hover')} initialOpen={true}>
							

								<Select
									label={__('Hover Effects')}
									options={[
										{value: "",label:"None"},
										{value: "wprig-box-effect-1",label:"Effect 1"},
										{value: "wprig-box-effect-2",label:"Effect 2"},
										{value: "wprig-box-effect-3",label:"Effect 3"},
										{value: "wprig-box-effect-4",label:"Effect 4"},
										{value: "wprig-box-effect-5",label:"Effect 5"},
										{value: "wprig-box-effect-6",label:"Effect 6"},
										{value: "wprig-box-effect-7",label:"Effect 7"},
										{value: "wprig-box-effect-8",label:"Effect 8"},
										{value: "wprig-box-effect-9",label:"Effect 9"},
										{value: "wprig-box-effect-10",label:"Effect 10"}
									]}
									value={hoverEffect}
									onChange={(value) => setAttributes({ hoverEffect: value })} />

									{	hoverEffect != 'wprig-box-effect-2' &&
									  	hoverEffect != 'wprig-box-effect-3' &&

										<Select
										label={__('Direction')}
										options={[
											{value: "",label:"None"},
											{value: "right-to-left",label:"Right To Left"},
											{value: "left-to-right",label:"Left to Right"},
											{value: "top-to-bottom",label:"Top to Bottom"},
											{value: "bottom-to-top",label:"Bottom to Top"}
										]}

										value={direction}
										onChange={(value) => setAttributes({ direction: value })} />
									}
								
							</PanelBody>
						
							<PanelBody title={__('Body')} initialOpen={false}>
									<Fragment>
										<Color label={__('Background Color')} value={bodyBg} onChange={(value) => setAttributes({ bodyBg: value })} />
										<Padding label={__('Padding')} value={bodyPadding} onChange={(value) => setAttributes({ bodyPadding: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<Border label={__('Border')} separator value={bodyBorder} onChange={(value) => setAttributes({ bodyBorder: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BoxShadow label={__('Box-Shadow')} value={bodyShadow} onChange={(value) => setAttributes({ bodyShadow: value })} />
										<BorderRadius label={__('Radius')} separator value={bodyBorderRadius} onChange={(value) => setAttributes({ bodyBorderRadius: value })} unit={['px', 'em', '%']} max={100} min={0} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
							</PanelBody>

							{/* <PanelBody initialOpen={false} title={__('Shape Divider')}>
                                <Tabs>
                                    <Tab tabTitle={__('Top Shape')}>
                                        <Shape shapeType="top" value={shapeTop} responsive onChange={val => setAttributes({ shapeTop: val })} />
                                    </Tab>
                                    <Tab tabTitle={__('Bottom Shape')}>
                                        <Shape shapeType="bottom" value={shapeBottom} onChange={val => setAttributes({ shapeBottom: val })} />
                                    </Tab>
                                </Tabs>
                            </PanelBody> */}
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
					<div className={`wprig-highlight-box wprig-active-tab-${activeTab}`}>

						<div className={`wprig-tab-nav wprig-alignment-left`}>

							{this.renderTabTitles()}
						</div>

						<div className={`wprig-highlight-box-body`}>
							
							<InnerBlocks
								tagName="div"
								templateLock='all'
								allowedBlocks={['wprig/highlight-box-face']}

								template = {[
									['wprig/highlight-box-face',
										{
											id: 1,
											customClassName: 'wprig-primary' 
										}
									],
									['wprig/highlight-box-face',
										{
											id: 2,
											customClassName: 'wprig-secondary' 
										}
									]
								]}
							/>
							{/* {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
								<div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
							}
							{(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
								<div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
							} */}
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
