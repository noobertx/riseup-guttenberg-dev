/* eslint-disable react/react-in-jsx-scope */
const { __ } = wp.i18n
const { compose } = wp.compose;
const { select, withDispatch,withSelect } = wp.data
const { PanelBody, TextControl, SelectControl, Tooltip, Button, RangeControl } = wp.components
const { Component, Fragment, createRef } = wp.element
const { InspectorControls, InnerBlocks, InspectorAdvancedControls } = wp.blockEditor
const { Background, Select, Range, Toggle, Shape, BoxShadow, Tab, Tabs, Separator, Border, BorderRadius, RadioAdvanced, Dimension, globalSettings: { globalSettingsPanel, animationSettings }, HelperFunction: { videoBackground }, CssGenerator: { CssGenerator }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import { ModalManager } from '../../helpers/modalManager';
import PageListModal from '../../helpers/pageListModal';
import icons from '../../helpers/icons';

const colOption = [
    { label: '100', columns: 1, layout: { md: [100], sm: [100], xs: [100] } },
    { label: '50/50', columns: 2, layout: { md: [50, 50], sm: [100, 100], xs: [100, 100] } },
    { label: '33/33/33', columns: 3, layout: { md: [33.33, 33.33, 33.34], sm: [100, 100, 100], xs: [100, 100, 100] } },
    { label: '25/25/25/25', columns: 4, layout: { md: [25, 25, 25, 25], sm: [50, 50, 50, 50], xs: [100, 100, 100, 100] } },
    { label: '34/66', columns: 2, layout: { md: [34, 66], sm: [50, 50], xs: [100, 100] } },
    { label: '66/34', columns: 2, layout: { md: [66, 34], sm: [100, 100], xs: [100, 100] } },
    { label: '25/25/50', columns: 3, layout: { md: [25, 25, 50], sm: [50, 50, 100], xs: [100, 100, 100] } },
    { label: '50/25/25', columns: 3, layout: { md: [50, 25, 25], sm: [100, 50, 50], xs: [100, 100, 100] } },
    { label: '25/50/25', columns: 3, layout: { md: [25, 50, 25], sm: [100, 100, 100], xs: [100, 100, 100] } },
    { label: '20/20/20/20/20', columns: 5, layout: { md: [20, 20, 20, 20, 20], sm: [20, 20, 20, 20, 20], xs: [20, 20, 20, 20, 20] } },
    { label: '16/16/16/16/16/16', columns: 6, layout: { md: [16.66, 16.67, 16.66, 16.67, 16.67, 16.67], sm: [33.33, 33.33, 33.34, 33.33, 33.33, 33.34], xs: [50, 50, 50, 50, 50, 50] } },
    { label: '16/66/16', columns: 3, layout: { md: [16.66, 66.68, 16.66], sm: [100, 100, 100], xs: [100, 100, 100] } },
];

let defaultLayout = { md: [100], sm: [100], xs: [100] }

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            hideRowSettings: false
        };
        this.wprigContextMenu = createRef();
    }
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const { getBlockRootClientId } = select('core/block-editor');

        let parentClientId = getBlockRootClientId(clientId)

        if (parentClientId) {
            this.setState({ hideRowSettings: true })
        }

        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client, childRow: parentClientId ? true : false });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client, childRow: parentClientId ? true : false });
		}
		
		if(!($(".wprig-block-"+uniqueId+" .wprig-custom-carousel .block-editor-block-list__layout:first").hasClass("cd-carousel"))){
			$(".wprig-block-"+uniqueId+" .wprig-custom-carousel .block-editor-block-list__layout:first").addClass("cd-carousel");
			console.log("Carousel Class should be added now...")
		}
	}
	
	shouldComponentUpdate(){
		if($(".cd-carousel").hasClass("slick-initialized")){
			 $('.cd-carousel').slick('unslick') 	
			
		}
		return true;
	}

	componentDidUpdate(prevProps){
		const { attributes: {uniqueId, items, slidesToScroll, showDots, showArrows, isInfinite, enableAutoplay,autoplaySpeed,enableFading,enableAdaptiveHeight,speed,column } } = this.props
		
		
				if(!$(".cd-carousel").hasClass("slick-initialized")){
					const slideOptions = {
                        slidesToShow: items,
						slidesToScroll: slidesToScroll,
						dots: showDots,
						arrows: showArrows,
						infinite: isInfinite,
						autoplay: enableAutoplay,
						autoplaySpeed: autoplaySpeed,
						fade: enableFading,
						adaptiveHeight: enableAdaptiveHeight,
						speed:speed
					};
					$('.cd-carousel').slick(slideOptions) 
				}
	}

    getTemplate(items) {
        return [...Array(parseInt(items.length))].map((data, index) => {
            const columnWidth = { md: 100, sm: 100, xs: 100, unit: '%', device: 'md' }
            return ['wprig/car-item', { colWidth: columnWidth }]
        })
    }

    removeRowBlock() {
        const { clientId, removeBlock } = this.props;
        removeBlock(clientId); //remove row block
    }

    importLayout() {
        ModalManager.open(<PageListModal rowClientId={this.props.clientId} />);
    }

    getClassName = () => {
        const {
            attributes: {
                align,
                childRow,
                rowContainerWidth
            }
        } = this.props;
        let wrapperClassName = '';

        if (typeof align !== 'undefined') {
            if (align === 'full' && rowContainerWidth === 'boxed') {
                wrapperClassName = 'wprig-container';
            } else {
                wrapperClassName = 'wprig-container-fluid';
            }
        } else {
            if (childRow) {
                wrapperClassName = 'wprig-container-fluid';
            } else {
                wrapperClassName = 'wprig-container';
            }
        }
        return wrapperClassName;
    }

    render() {
        const {
			carousel_items,
            attributes: {
                uniqueId,
                className,
                rowId,
                columns,
                evenColumnHeight,
                align,
                rowGutter,
                rowBlend,
                rowOverlay,
                rowOpacity,
                rowContainer,
                rowContainerWidth,
                position,
                padding,
                marginTop,
                marginBottom,
                rowBg,
                shapeTop,
                shapeBottom,
                rowReverse,
                rowShadow,
                heightOptions,
                rowHeight,
                border,
                borderRadius,
                enableRowOverlay,
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
                globalCss
            },
            setAttributes } = this.props;

        const { device, hideRowSettings } = this.state;
        // if (!columns) {
        //     return (
        //         <Fragment>
        //             <div className="wprig-row-preset" >
        //                 <Button onClick={() => this.removeRowBlock()} className="wprig-component-remove-button" >
        //                     <i className="fa fa-times" />
        //                 </Button>
        //                 <div className="wprig-row-preset-title">{__('Select Column Layout')}</div>
        //                 <div className="wprig-row-preset-group">
        //                     {colOption.map((data) => (
        //                         <Tooltip text={data.label}>
        //                             <button onClick={() => {
        //                                 setAttributes({ columns: data.columns });
        //                                 defaultLayout = data.layout
        //                             }}>
        //                                 {data.layout.md.map(d => <i style={{ width: d + '%' }} />)}
        //                             </button>
        //                         </Tooltip>
        //                     ))}
        //                 </div>
        //                 <div className={`import-layout-btn-container`}>
        //                     <button type="button"
        //                         className={`components-button is-button is-default is-primary is-large`}
        //                         onClick={() => this.importLayout()}>
        //                         {__('Import Layout')}
        //                     </button>
        //                 </div>
        //             </div>
        //         </Fragment>
        //     )
        // }
        return (
            <Fragment>
                <InspectorControls>
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody initialOpen={true} title={__('Dimension')}>
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

                                {(align == 'full' && !hideRowSettings) &&
                                    <Fragment>
                                        <RadioAdvanced label={__('Container')} value={rowContainerWidth} onChange={val => setAttributes({ rowContainerWidth: val })}
                                            options={[
                                                { label: __('Full Width'), value: 'fluid', title: __('Full Width') },
                                                { label: __('Boxed'), value: 'boxed', title: __('Boxed') }
                                            ]}
                                        />
                                        {rowContainerWidth == 'boxed' &&
                                            <Range
                                                label={__('Container Width')}
                                                min={0} max={1920}
                                                value={rowContainer}
                                                onChange={val => setAttributes({ rowContainer: parseInt(val) })}
                                            />
                                        }
                                    </Fragment>
                                }
                                <Toggle label={__('Even Column Height')} value={evenColumnHeight} onChange={val => setAttributes({ evenColumnHeight: val })} />
                                {
                                    columns > 1 &&

                                    <Range
                                        label={__('Gutter Size')}
                                        min={0} max={100}
                                        value={rowGutter}
                                        onChange={val => setAttributes({ rowGutter: val })}
                                        unit={['px', 'em', '%']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                }
                                <Separator />

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

                            <PanelBody initialOpen={false} title={__('Background')}>
                                <Background
                                    parallax
                                    value={rowBg}
                                    label={__('Background')}
                                    externalImage
                                    sources={['image', 'gradient', 'video']}
                                    onChange={val => setAttributes({ rowBg: val })}
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
                                <BoxShadow label={__('Box-Shadow')} value={rowShadow} onChange={val => setAttributes({ rowShadow: val })} />
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
                                <Toggle label={__('Enable Overlay')} value={enableRowOverlay} onChange={val => setAttributes({ enableRowOverlay: val })} />
                                {enableRowOverlay == 1 &&
                                    <Fragment>
                                        <Background label={__('Overlay')} sources={['image', 'gradient']} value={rowOverlay} onChange={val => setAttributes({ rowOverlay: val })} />
                                        {rowOverlay.openBg == 1 &&
                                            <Fragment>
                                                <RangeControl beforeIcon={"lightbulb"} label={__('Overlay Opacity')} min={.01} max={1} step={.01} value={rowOpacity} onChange={val => setAttributes({ rowOpacity: val })} />
                                                <Select label={__('Overlay Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={rowBlend} onChange={val => setAttributes({ rowBlend: val })} />
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                            </PanelBody>

                            <PanelBody initialOpen={false} title={__('Shape Divider')}>
                                <Tabs>
                                    <Tab tabTitle={__('Top Shape')}>
                                        <Shape shapeType="top" value={shapeTop} responsive onChange={val => setAttributes({ shapeTop: val })} />
                                    </Tab>
                                    <Tab tabTitle={__('Bottom Shape')}>
                                        <Shape shapeType="bottom" value={shapeBottom} onChange={val => setAttributes({ shapeBottom: val })} />
                                    </Tab>
                                </Tabs>
                            </PanelBody>
                        
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                             <PanelBody title={__('Spacing')} initialOpen={true}>
                                <Dimension
                                    label={__('Padding')}
                                    value={padding}
                                    onChange={val => setAttributes({ padding: val })}
                                    min={0}
                                    max={600}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={this.state.device}
                                    onDeviceChange={value => this.setState({ device: value })}
                                    clientId={this.props.clientId}
                                />
                                <Separator />
                                <Range label={__('Margin Top')} value={marginTop} onChange={(value) => setAttributes({ marginTop: value })} unit={['px', 'em', '%']} min={-400} max={500} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Range label={__('Margin Bottom')} value={marginBottom} onChange={(value) => setAttributes({ marginBottom: value })} unit={['px', 'em', '%']} min={-400} max={500} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody>
                            {animationSettings(uniqueId, animation, setAttributes)} 
                        </InspectorTab>
                    </InspectorTabs>

                </InspectorControls>

                <InspectorAdvancedControls>
                    <Toggle label={__('Column Reverse')} responsive value={rowReverse.values} onChange={val => setAttributes({ rowReverse: { values: val, openRowReverse: true } })} />
                    <TextControl label={__('CSS ID')} value={rowId} onChange={val => setAttributes({ rowId: val })} />
                    {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes, true)} 
                </InspectorAdvancedControls>

                <div className={`wprig-section wprig-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'wprig-section-parallax' : ''}${className ? ` ${className}` : ''}`} {...rowId ? { id: rowId } : ''}>
                    {/* <div className="wprig-padding-indicator">
                        <span className="wprig-indicator-top" style={{ height: padding.md.top ? padding.md.top + padding.unit : 0 }} >
                            {(padding.md.top && padding.md.top > 20) ? padding.md.top + ' ' + padding.unit : ''}
                        </span>
                        <span className="wprig-indicator-right" style={{ width: padding.md.right ? padding.md.right + padding.unit : 0 }} >
                            {(padding.md.right && padding.md.right > 40) ? padding.md.right + ' ' + padding.unit : ''}
                        </span>
                        <span className="wprig-indicator-bottom" style={{ height: padding.md.bottom ? padding.md.bottom + padding.unit : 0 }} >
                            {(padding.md.bottom && padding.md.bottom > 20) ? padding.md.bottom + ' ' + padding.unit : ''}
                        </span>
                        <span className="wprig-indicator-left" style={{ width: padding.md.left ? padding.md.left + padding.unit : 0 }} >
                            {(padding.md.left && padding.md.left > 40) ? padding.md.left + ' ' + padding.unit : ''}
                        </span>
                    </div>
                    <div className="wprig-margin-indicator">
                        <span className="wprig-indicator-top" style={{ height: marginTop.md ? marginTop.md + marginTop.unit : 0 }} >
                            {marginTop.md && marginTop.md > 20 ? marginTop.md + ' ' + marginTop.unit : ''}
                        </span>
                        <span className="wprig-indicator-bottom" style={{ height: marginBottom.md ? marginBottom.md + marginBottom.unit : 0 }} >
                            {marginBottom.md && marginBottom.md > 20 ? marginBottom.md + ' ' + marginBottom.unit : ''}
                        </span>

                    </div>
                    {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
                        <div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
                    }
                    {(Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video') &&
                        videoBackground(rowBg, 'row')
                    }
                    {(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
                        <div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
                    }
                    <div className="wprig-row-overlay"></div> */}
                  
					{/* <div className={this.getClassName()}>
                        <div className={`wprig-row wprig-backend-row ${(heightOptions == 'window') ? 'wprig-row-height-window' : ''}`}>
                            <InnerBlocks template={this.getTemplate(columns)} templateLock="all" allowedBlocks={['wprig/column']} />
                        </div>
                    </div> */}

{
                        (carousel_items && carousel_items.length) ? 
                            <Fragment>
                                <div className = {`wprig-custom-carousel`}> 
                                <InnerBlocks
								tagName="div"
								templateLock='all'
								allowedBlocks={['wprig/car-item']}
								template={this.getTemplate(carousel_items)
								}
							/>
                                    
                                </div> 
                            </Fragment>
                        :
                        <div class = "items"> Items not found </div>	
					}
                

                </div>
           
            </Fragment>
        )
    }
}

export default compose([
	withSelect((select, props) => {

        
		return {
            carousel_items: ["A","B"],
		};
	}),
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