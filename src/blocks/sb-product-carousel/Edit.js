/* eslint-disable react/react-in-jsx-scope */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { addQueryArgs } = wp.url;
const { Fragment, Component, createRef } = wp.element;
const {
	dateI18n,
	__experimentalGetSettings
} = wp.date;
const {
	InspectorControls,
	BlockControls
} = wp.blockEditor;
const {
	RangeControl,
	PanelBody,
	Toolbar,
	Spinner,
	TextControl,
	SelectControl
} = wp.components;
const {
	Media,
	Range,
	ButtonGroup,
	Inline: {
		InlineToolbar
	},
	Toggle,
	Dropdown,
	Select,
	Separator,
	ColorAdvanced,
	Typography,
	Color,
	Border,
	BorderRadius,
	Padding,
	BoxShadow,
	Styles,
	Tabs,
	Tab,
	RadioAdvanced,
	Url,
	Margin,
	globalSettings: {
		globalSettingsPanel,
		animationSettings
	},
	CssGenerator: { CssGenerator },
	ContextMenu: {
		ContextMenu,
		handleContextMenu
	},
	withCSSGenerator,
	InspectorTabs,
	InspectorTab
} = wp.wprigComponents;

import icons from '../../helpers/icons'


const CATEGORIES_LIST_QUERY = { per_page: -1};

class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			device: 'md',
			spacer: true,
			categoriesList: []
		};
		this.wprigContextMenu = createRef();
	}

	componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId } } = this.props
		this.isStillMounted = true;
		this.fetchRequest = wp.apiFetch({
			path: addQueryArgs('/wp/v2/categories', CATEGORIES_LIST_QUERY),
		}).then(
			(categoriesList) => {
				if (this.isStillMounted) {
					this.setState({ categoriesList });
				}
			}
		).catch(
			() => {
				if (this.isStillMounted) {
					this.setState({ categoriesList: [] });
				}
			}
		);
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}

		this.loadCarousel();   
	}
	componentDidUpdate(prevProps){
		// console.log(prevProps.posts , this.props.posts )
		if( prevProps.posts!= this.props.posts  ){
			this.loadCarousel();        
		}
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}
	truncate(value, limit) {
		if (value.split(' ').length > limit) {
			return value.split(' ').splice(0, limit).join(' ');
		}
		return value;
	}

	renderFeaturedImage = (post) => {
		const { attributes: { layout, style, imgSize, imageAnimation, showCategory, categoryPosition } } = this.props
		return (
			<div className={`${layout === 1 ? 'wprig-post-list-img' : 'wprig-post-grid-img'} wprig-post-img wprig-post-img-${imageAnimation}`}>
				<img className="wprig-post-image" src={post.wprig_featured_image_url && post.wprig_featured_image_url[imgSize][0]} />
				{
					(showCategory == 'badge' && style !== 4) &&
					<div className={`wprig-sb-product-carousel-cat-position wprig-sb-product-carousel-cat-position-${categoryPosition}`}>
						<span className="wprig-sb-product-carousel-category wprig-backend" dangerouslySetInnerHTML={{ __html: post.wprig_category }} />
					</div>
				}
			</div>
		)
	}

	renderCardContent = (post) => {
		const { attributes: { layout,
			style,
			cartButtonStyle,
			showCategory,
			categoryPosition,
			showTitle,
			titlePosition,
			showComment,
			showcartButton,
			cartButtonText,
			cartButtonSize,
			enablePrice,
			enableRegularPrice } } = this.props
		let title = <h3 className="wprig-sb-product-carousel-title"><a>{post.title.rendered}</a></h3>
		return (
			<div className={`${layout === 1 ? 'wprig-post-list-content' : 'wprig-post-grid-content'}`}>
				{(showCategory === 'default') && <span className="wprig-sb-product-carousel-category wprig-backend" dangerouslySetInnerHTML={{ __html: post.wprig_category }} />}

				{
					(showCategory == 'badge' && style === 4) &&
					<div className={`wprig-sb-product-carousel-cat-position wprig-sb-product-carousel-cat-position-${categoryPosition}`}>
						<span className="wprig-sb-product-carousel-category wprig-backend" dangerouslySetInnerHTML={{ __html: post.wprig_category }} />
					</div>
				}
			
				{showTitle && (titlePosition == true) && title}		

				<div className="wprig-sb-product-carousel-meta">
					
					{enableRegularPrice &&
						<span className="item-regular-price"> <strike>${parseInt(post.product_info.get_regular_price).toFixed(2)}</strike></span>
					}
					{enablePrice &&
						<span className="item-price"> ${parseInt(post.product_info.get_price).toFixed(2)}</span>
					}
						{showComment && <span><i className="fas fa-comment" /> {(post.wprig_comment ? post.wprig_comment : '0')}</span>}
				
				</div>
						
				{showTitle && (titlePosition == false) && title}
				{showcartButton && <div className="wprig-sb-product-carousel-btn-wrapper"><a className={`wprig-sb-product-carousel-btn wprig-button-${cartButtonStyle} is-${cartButtonSize}`}>{cartButtonText}</a></div>}
			</div>
		)
	}


	loadCarousel(){
        const {
			posts,
			attributes:{
				uniqueId
				
			}
        }  = this.props;
		if(posts && posts.length > 0){
			
			if(jQuery(".wprig-block-"+uniqueId).find(".wprig-sb-product-carousel-wrapper").hasClass("slick-initialized")){
					jQuery(".wprig-block-"+uniqueId).find(".wprig-sb-product-carousel-wrapper").slick('unslick').slick("reinit");
			}else{				
				var carouselParams = this.props.carouselParams;
				setTimeout(function(){				
					jQuery(".wprig-block-"+uniqueId).find(".wprig-sb-product-carousel-wrapper").slick(carouselParams);
				},500,this)
			}
		
		}
	}

	getCarouselParams(){
        const {
            attributes: {
                carouselItems,
                enableDots,
                enableArrows,
            }
        }  = this.props;

        return {
            dots: enableDots,
            slidesToShow: parseInt(carouselItems.md),
            arrows: enableArrows,
			prevArrow:'<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
			nextArrow:'<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""></button>',
            responsive:[
                {
                    breakpoint:900,
                    settings:{
                        slidesToShow: parseInt(carouselItems.md),
                    }
                },
                {
                    breakpoint:600,
                    settings:{
                        slidesToShow: carouselItems.sm,
                    }
                },
                {
                    breakpoint:320,
                    settings:{
                        slidesToShow: carouselItems.xs,
                    }
                }
            ]
        }
    }

	renderCarouselContent(posts){
		const {
			attributes :{
				layout,
				contentPosition,
				enableOnSale ,
				girdContentPosition,
				style,
				showImages
			}
		} = this.props
		return posts.map(post => {
			if (post) {
				return (
					<div className={`wprig-sb-product-carousel ${layout === 1 ? 'wprig-post-list-view' : 'wprig-post-grid-view'} wprig-sb-product-carousel-style-${style}`}>
						{post.product_info.onSale && enableOnSale &&
							<span className="onsale">Sale!</span>
						}
						<div className={`${layout === 1 ? `wprig-post-list-wrapper wprig-post-list-${((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}` : `wprig-post-grid-wrapper wprig-post-grid-${((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}`}`}>
							{showImages && post.wprig_featured_image_url && this.renderFeaturedImage(post)}
							{this.renderCardContent(post)}
						</div>
					</div>
				)
			} else return null

		})
	}
	render() {
		const {
			setAttributes,
			posts,
			name,
			clientId,
			attributes,
			taxonomyList,
			attributes: {
				uniqueId,
				className,

				carouselItems,
				enableDots,
                dotsColor,
                dotsColorActive,
                enableArrows,
                arrowColor,
				gutter,
				carouselItemMargin,
				enableHeading,
				headingContent,
				headingColor,

				//image
				image,
				imageType,
				externalImageUrl,
				image2x,
				imgAlt,
				imageUrl,
				imageSize,
				imageSizeCustom,
				imageBorderRadius,
				imageOpacity,
				imageBoxShadow,
				imageBoxShadowHover,
	
				enableCaption,
				imageCaption,
				captionTypography,
				captionColor,
				captionSpacing,
	

				//general
				taxonomy,
				categories,
				tags,
				order,
				orderBy,
				postsToShow,

				//image
				showImages,
				imgSize,
				enableFixedHeight,
				fixedHeight,
				imageRadius,
				imageAnimation,

				//card
				cardBackground,
				cardBorder,
				cardBorderRadius,
				cardPadding,
				cardBoxShadow,
				cardSpace,

				//scart
				stackBg,
				stackWidth,
				stackSpace,
				stackBorderRadius,
				stackPadding,
				stackBoxShadow,

				//cartButton link
				cartButtonStyle,
				cartButtonText,
				cartButtonSize,
				cartButtonCustomSize,
				cartButtonTypography,
				cartButtonBg,
				cartButtonHoverBg,
				cartButtonBorder,
				cartButtonBorderRadius,
				cartButtonBoxShadow,
				cartButtonColor,
				cartButtonColor2,
				cartButtonHoverColor,

				//content
				layout,
				style,
				column,
				showComment,
				showCategory,
				categoryPosition,
				showcartButton,
				showTitle,
				titlePosition,

				//woo
				enablePrice,
				enableRegularPrice,
				enableOnSale,

				//separator
				showSeparator,
				separatorColor,
				separatorHeight,
				separatorSpace,

				//typography
				titleTypography,
				metaTypography,
				excerptTypography,
				categoryTypography,

				//colors
				titleColor,
				titleOverlayColor,
				metaColor,
				metaOverlayColor,
				titleHoverColor,
				excerptColor,
				excerptColor2,
				categoryColor,
				categoryColor2,
				categoryHoverColor,
				categoryHoverColor2,
				categoryBackground,
				categoryHoverBackground,
				categoryRadius,
				categoryPadding,
				badgePosition,
				badgePadding,

				//design
				bgColor,
				border,
				borderRadius,
				padding,
				boxShadow,
				contentPosition,
				girdContentPosition,

				//overlay
				overlayBg,
				overlayHoverBg,
				overlayBlend,
				overlayHeight,
				overlaySpace,
				overlayBorderRadius,

				//spacing
				columnGap,
				contentPadding,
				titleSpace,
				categorySpace,
				metaSpace,
				excerptSpace,
				//animation
				animation,
				//global
				globalZindex,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				hideTablet,
				hideMobile,
				globalCss

			}
		} = this.props
		const { device } = this.state;
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={['style', 'advance']}>
						<InspectorTab key={'style'}>
							<PanelBody title={__('Post Design')} initialOpen={true}>
								<Styles columns={4} value={style} onChange={val => setAttributes({ style: val })}
									options={[
										{ value: 1, svg: icons.postgrid_design_1 },
										{ value: 2, svg: layout === 1 ? icons.postgrid_design_3 : icons.postgrid_design_2 },
										{ value: 3, svg: layout === 1 ? icons.postgrid_design_5 : icons.postgrid_design_4 },
										{ value: 4, svg: icons.postgrid_design_6 },
									]}
								/>
								{layout === 2 &&
									<Range label={__('Select Column')} value={column} onChange={(value) => setAttributes({ column: value })} min={1} step={1} max={6} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}

								{((layout === 1) || ((layout === 2) && ((style === 3) || (style === 4)))) &&
									<ButtonGroup
										label={__('Content Align')}
										options={
											((layout === 2) && (style === 3)) ?
												[[__('Left'), 'left'], [__('Middle'), 'center'], [__('Right'), 'right']]
												:
												[[__('Top'), 'top'], [__('Middle'), 'center'], [__('Bottom'), 'bottom']]
										}
										value={((layout === 2) && (style === 3)) ? contentPosition : girdContentPosition}
										onChange={value => setAttributes(((layout === 2) && (style === 3)) ? { contentPosition: value } : { girdContentPosition: value })}
									/>
								} 
								 {(((layout === 1) && (style != 3)) || ((layout === 2) && (style != 3))) &&
									<Padding label={__('Padding')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								<Separator />
								{(((layout === 1) && (style === 1)) || ((layout === 2) && (style === 1))) &&
									<Fragment>
										<ColorAdvanced label={__('Background')} value={bgColor} onChange={(value) => setAttributes({ bgColor: value })} />
										<Border label={__('Border')} value={border} onChange={val => setAttributes({ border: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BorderRadius min={0} max={100} responsive device={device} label={__('Corner')} value={borderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ borderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
										<Padding label={__('Padding')} value={padding} onChange={val => setAttributes({ padding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BoxShadow label={__('Box-Shadow')} value={boxShadow} onChange={(value) => setAttributes({ boxShadow: value })} />
									</Fragment>
								} 
								{(style === 2) &&
									<Fragment>
										<ColorAdvanced label={__('Card Background')} value={cardBackground} onChange={(value) => setAttributes({ cardBackground: value })} />
										<Border label={__('Card Border')} value={cardBorder} onChange={val => setAttributes({ cardBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BorderRadius min={0} max={100} responsive device={device} label={__('Card Corner')} value={cardBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ cardBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
										{(layout === 1) &&
											<Range label={__('Card Space')} value={cardSpace} onChange={value => setAttributes({ cardSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										}
										<Padding label={__('Card Padding')} value={cardPadding} onChange={val => setAttributes({ cardPadding: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BoxShadow label={__('Card Box Shadow')} value={cardBoxShadow} onChange={(value) => setAttributes({ cardBoxShadow: value })} />
									</Fragment>
								} 

								
								{(style === 4) &&
									<Fragment>
										<Range label={__('Overlay Height')} value={overlayHeight} onChange={value => setAttributes({ overlayHeight: value })} unit={['px', 'em', '%']} min={50} max={700} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										{(layout === 1) &&
											<Range label={__('Overlay Space')} value={overlaySpace} onChange={value => setAttributes({ overlaySpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										}
										<BorderRadius min={0} max={100} responsive device={device} label={__('Overlay Corner')} value={overlayBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ overlayBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
										<Tabs>
											<Tab tabTitle={__('Normal')}>
												<ColorAdvanced label={__('Overlay')} value={overlayBg} onChange={(value) => setAttributes({ overlayBg: value })} />
											</Tab>
											<Tab tabTitle={__('Hover')}>
												<ColorAdvanced label={__('Hover Overlay')} value={overlayHoverBg} onChange={(value) => setAttributes({ overlayHoverBg: value })} />
											</Tab>
										</Tabs>
										<Select label={__('Blend Mode')} options={[['normal', __('Normal')], ['multiply', __('Multiply')], ['screen', __('Screen')], ['overlay', __('Overlay')], ['darken', __('Darken')], ['lighten', __('Lighten')], ['color-dodge', __('Color Dodge')], ['saturation', __('Saturation')], ['luminosity', __('Luminosity')], ['color', __('Color')], ['color-burn', __('Color Burn')], ['exclusion', __('Exclusion')], ['hue', __('Hue')]]} value={overlayBlend} onChange={val => setAttributes({ overlayBlend: val })} />
									</Fragment>
								} 

								{(style === 3) &&
									<Fragment>
										<ColorAdvanced label={__('Stack Background')} value={stackBg} onChange={(value) => setAttributes({ stackBg: value })} />
										{(layout === 2) &&
											<Range label={__('Stack Size')} value={stackWidth} onChange={value => setAttributes({ stackWidth: value })} unit={['px', 'em', '%']} min={50} max={600} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										}
										{(layout === 1) &&
											<Range label={__('Stack Space')} value={stackSpace} onChange={value => setAttributes({ stackSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										}
										<BorderRadius min={0} max={100} responsive device={device} label={__('Stack Corner')} value={stackBorderRadius} unit={['px', 'em', '%']} onChange={value => setAttributes({ stackBorderRadius: value })} onDeviceChange={value => this.setState({ device: value })} />
										<Padding label={__('Stack Padding')} value={stackPadding} onChange={val => setAttributes({ stackPadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<BoxShadow label={__('Stack Box Shadow')} value={stackBoxShadow} onChange={(value) => setAttributes({ stackBoxShadow: value })} />
									</Fragment>
								} 

								{(layout === 1) && (style === 1) &&
									<Fragment>
										<Separator />
										<Toggle label={__('Enable Separator')} value={showSeparator} onChange={value => setAttributes({ showSeparator: value })} />
									</Fragment>
								}
								{(layout === 1) && (style === 1) && (showSeparator === true) &&
									<Fragment>
										<Color label={__('Separator Color')} value={separatorColor} onChange={value => setAttributes({ separatorColor: value })} />
										<Range label={__('Separator Height')} value={separatorHeight} onChange={value => setAttributes({ separatorHeight: value })} unit={['px', 'em', '%']} min={0} max={30} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
										<Range label={__('Separator Spacing')} value={separatorSpace} onChange={value => setAttributes({ separatorSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
									</Fragment>
								} 
							</PanelBody>
							<PanelBody initialOpen={false} title={__('Heading')}>
								<Toggle label={__('Enable ')} value={enableHeading} onChange={value => setAttributes({ enableHeading: value })} />								
								{enableHeading &&  
								<Fragment>
									<TextControl label={__('Title')} value={headingContent} onChange={val => setAttributes({ headingContent: val })} />								
									<Color label={__('Title Color')} value={headingColor} onChange={(value) => setAttributes({ headingColor: value }) } />
								</Fragment>
								}
							</PanelBody>
							<PanelBody initialOpen={false} title={__('Product Item')}>
									
								<Toggle label={__('Enable Price')} value={enablePrice} onChange={value => setAttributes({ enablePrice: value })} />
								<Toggle label={__('Enable Regular Price')} value={enableRegularPrice} onChange={value => setAttributes({ enableRegularPrice: value })} />								
								<Toggle label={__('Enable On Sale')} value={enableOnSale} onChange={value => setAttributes({ enableOnSale: value })} />
								
							</PanelBody>
							<PanelBody initialOpen={false} title={__('Carousel')}>
                                <Range
                                        label={__('Gutter')}
                                        min={0} max={100}
                                        value={gutter}
                                        onChange={val => setAttributes({ gutter: val })}
                                        unit={['']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                <Range label={__('Items')} value={carouselItems} onChange={val => setAttributes({ carouselItems: val })} min={1} max={15} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Toggle label={__('Enable Arrows')} value={enableArrows} onChange={val => setAttributes({ enableArrows: val })} />
                                <Toggle label={__('Enable Dots')} value={enableDots} onChange={val => setAttributes({ enableDots: val })} />     
                             
                        
                                {enableArrows &&
                                    <Color label={__('Arrow Color')} value={arrowColor} onChange={(value) => setAttributes({ arrowColor: value }) } />
                                }            
                                {enableDots && 
                                    <Fragment>
                                        <Color label={__('Dots Color')} value={dotsColor} onChange={(value) => setAttributes({ dotsColor: value }) } />
                                        <Color label={__('Dots Color Active')} value={dotsColorActive} onChange={(value) => setAttributes({ dotsColorActive: value }) } />
                                    </Fragment>

                                }   

								<Margin
											max={150}
											min={0}
											responsive
											device={device}
											value={carouselItemMargin }
											label={__('Margin')}
											unit={['px', 'em', '%']}
											onChange={value => setAttributes({ carouselItemMargin : value })}
											onDeviceChange={value => this.setState({ device: value })}
							/>

                            </PanelBody>
							<PanelBody title={__('Query')} initialOpen={false}>
								<ButtonGroup
									label={__('Taxonomy')}
									options={[[__('Categories'), 'product_cat'], [__('Tags'), 'tags']]}
									value={taxonomy}
									onChange={value => setAttributes({ taxonomy: value })}
								/>
								<Dropdown
									label={taxonomy === 'categories' ? __('Categories') : __('Tags')}
									enableSearch
									defaultOptionsLabel="All"
									options={[{ value: 'all', label: __('All') }, ...taxonomyList]}
									value={taxonomy === 'categories' ? categories : tags}
									onChange={value => setAttributes(taxonomy === 'categories' ? { categories: value.length && value[value.length - 1].label === 'All' ? [] : value } : { tags: value.length && value[value.length - 1].label === 'All' ? [] : value })}
								/> 
								<Range label={__('Number of Items')} value={postsToShow} onChange={value => setAttributes({ postsToShow: parseInt(value) })} min={0} max={15} />

								<SelectControl
									label={__('Order By')}
									value={orderBy}
									options={[
										{ label: __('Date'), value: 'date' },
										{ label: __('Title'), value: 'title' },
										{ label: __('Random'), value: 'rand' },
										{ label: __('Menu Order'), value: 'menu_order' },
									]}
									onChange={value => setAttributes({ orderBy: value })}
								/>
								<ButtonGroup
									label={__('Order')}
									options={[[__('Ascending'), 'asc'], [__('Descending'), 'desc',]]}
									value={order}
									onChange={value => setAttributes({ order: value })}
								/>
							</PanelBody>


						
							 {/* <PanelBody title={__('Image Settings')} initialOpen={false}>
								<Toggle label={__('Show Featured Image')} value={showImages} onChange={value => setAttributes({ showImages: value })} />
								<Toggle label={__('Fixed Image Height')} value={enableFixedHeight} onChange={value => setAttributes({ enableFixedHeight: value })} />
								{enableFixedHeight && <Range label={__('')} value={fixedHeight} onChange={value => setAttributes({ fixedHeight: value })} unit={['px', 'em', '%']} min={10} max={600} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}
								<SelectControl
									label={__('Image Sizes')}
									value={imgSize}
									onChange={(value) => setAttributes({ imgSize: value })}
									options={wprig_admin.image_sizes}
								/>
								<BorderRadius
									min={0}
									max={100}
									responsive
									device={device}
									label={__('Image Corner')}
									value={imageRadius}
									unit={['px', 'em', '%']}
									onChange={value => setAttributes({ imageRadius: value })}
									onDeviceChange={value => this.setState({ device: value })} />

								<Select label={__('Hover Effect')} options={[['none', __('No Animation')], ['slide-top', __('Slide From Top')], ['slide-right', __('Slide From Right')], ['slide-bottom', __('Slide From Bottom')], ['slide-left', __('Slide From Left')], ['zoom-in', __('Zoom In')], ['zoom-out', __('Zoom Out')]]} value={imageAnimation} onChange={val => setAttributes({ imageAnimation: val })} />
							</PanelBody>  */}

							<PanelBody title='Content' initialOpen={false}>
								<Toggle label={__('Show Title')} value={showTitle} onChange={value => setAttributes({ showTitle: value })} />
							
								<Toggle label={__('Title Below Meta')} value={titlePosition} onChange={value => setAttributes({ titlePosition: value })} />
							
								<Toggle label={__('Show Comment')} value={showComment} onChange={value => setAttributes({ showComment: value })} />
							</PanelBody> 

							<PanelBody title='Image Settings' initialOpen={false}>
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
                                            <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                                        </Fragment>
                                        :
                                        <Url label={__('Image Source')} disableAdvanced value={externalImageUrl} onChange={newUrl => setAttributes({ externalImageUrl: newUrl })} />
                                }

                                <Url label={__('URL')} value={imageUrl} onChange={(value) => setAttributes({ imageUrl: value })} />

                                <TextControl label={__('Alt Text')} value={imgAlt} onChange={val => setAttributes({ imgAlt: val })} />
                                <RadioAdvanced label={__('Size')} value={imageSize} onChange={(value) => setAttributes({ imageSize: value })}
                                    options={[
                                        { label: __('Auto'), value: 'auto', title: __('Auto') },
                                        { label: __('S'), value: '300px', title: __('Small') },
                                        { label: __('M'), value: '600px', title: __('Medium') },
                                        { label: __('L'), value: '800px', title: __('Large') },
                                        { icon: 'fas fa-cog', value: 'custom', title: __('Custom') },
                                    ]}
                                />
                                {imageSize == 'custom' &&
                                    <Fragment>
                                        <Range label={__('Custom Width')} value={imageSizeCustom} onChange={val => setAttributes({ imageSizeCustom: val })} min={10} max={1920} responsive unit={['px', 'em', '%']} device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <Separator />
                                    </Fragment>
                                }
                                <Range label={__('Opacity')} value={imageOpacity} onChange={val => setAttributes({ imageOpacity: parseFloat(val) })} min={0.1} max={1} step={.1} />
                                {/* <BorderRadius label={__('Radius')} value={imageBorderRadius} onChange={val => setAttributes({ imageBorderRadius: val })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                {/* <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <BoxShadow label={__('Box-Shadow')} value={imageBoxShadow} onChange={val => setAttributes({ imageBoxShadow: val })} disableInset />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <BoxShadow label={__('Box-Shadow Hover')} value={imageBoxShadowHover} onChange={val => setAttributes({ imageBoxShadowHover: val })} disableInset />
                                    </Tab>
                                </Tabs> */}
                            </PanelBody>


							<PanelBody title={__('Category')} initialOpen={false}>
								<RadioAdvanced
									label={__('Category')}
									options={[
										{ icon: 'fas fa-ban', value: 'none', label: __('None'), },
										{ value: 'default', label: __('Default'), },
										{ value: 'badge', label: __('Badge'), }
									]}
									value={showCategory}
									onChange={val => setAttributes({ showCategory: val })}
								/>
								{showCategory !== 'none' &&
									<Fragment>
										{(layout !== 2 && showCategory == 'badge' && style != 4) &&
											<Select
												label={__('Badge Position')}
												options={[['leftTop', __('Left Top')], ['rightTop', __('Right Top')], ['leftBottom', __('Left Bottom')], ['rightBottom', __('Right Bottom')]]}
												value={categoryPosition}
												onChange={value => setAttributes({ categoryPosition: value })}
											/>
										}
										{(layout === 2 && showCategory == 'badge' && style != 4) &&
											<Fragment>
												<RadioAdvanced
													label={__('Badge Position')}
													options={[
														{ value: 'default', label: __('default'), title: __('Pre-defined') },
														{ icon: 'fas fa-cog', value: 'none', title: __('Advanced') },
													]}
													value={badgePosition}
													onChange={val => setAttributes({ badgePosition: val })}
												/>
												{
													badgePosition === 'default' ?
														<Select
															label={__('')}
															options={[['leftTop', __('Left Top')], ['rightTop', __('Right Top')], ['leftBottom', __('Left Bottom')], ['rightBottom', __('Right Bottom')]]}
															value={categoryPosition}
															onChange={value => setAttributes({ categoryPosition: value })}
														/>
														: <Padding label={__('Advanced')} value={badgePadding} onChange={val => setAttributes({ badgePadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
												}
												<Separator />
											</Fragment>
										}
										<Typography label={__('Typography')} value={categoryTypography} onChange={value => setAttributes({ categoryTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
										<Tabs>
											<Tab tabTitle={__('Normal')}>
												<Color label={__('Category Color')} value={showCategory == 'badge' ? categoryColor2 : categoryColor} onChange={value => setAttributes(showCategory == 'badge' ? { categoryColor2: value } : { categoryColor: value })} />
												{showCategory == 'badge' && <Color label={__('Category Background')} value={categoryBackground} onChange={value => setAttributes({ categoryBackground: value })} />}
											</Tab>
											<Tab tabTitle={__('Hover')}>
												<Color label={__('Category Hover Color')} value={showCategory == 'badge' ? categoryHoverColor2 : categoryHoverColor} onChange={value => setAttributes(showCategory == 'badge' ? { categoryHoverColor2: value } : { categoryHoverColor: value })} />
												{showCategory == 'badge' && <Color label={__('Category Background')} value={categoryHoverBackground} onChange={value => setAttributes({ categoryHoverBackground: value })} />}
											</Tab>
										</Tabs>
										<BorderRadius
											min={0}
											max={100}
											responsive
											device={device}
											label={__('Corner')}
											value={categoryRadius}
											unit={['px', 'em', '%']}
											onChange={value => setAttributes({ categoryRadius: value })}
											onDeviceChange={value => this.setState({ device: value })}
										/>
										{showCategory == 'badge' && <Padding label={__('Padding')} value={categoryPadding} onChange={val => setAttributes({ categoryPadding: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />}

									</Fragment>
								}
							</PanelBody> 

							<PanelBody title={__('Add To Cart Link')} initialOpen={false}>
								<Toggle label={__('Show Add To Cart Link')} value={showcartButton} onChange={value => setAttributes({ showcartButton: value })} />
								{
									showcartButton &&
									<Fragment>
										<Styles
											options={
												[
													{ value: 'fill', svg: icons.btn_fill, label: __('Fill') },
													{ value: 'outline', svg: icons.btn_outline, label: __('Outline') }
												]}
											value={cartButtonStyle}
											onChange={val => setAttributes({ cartButtonStyle: val })}
										/>
										<TextControl label={__('Button Text')} value={cartButtonText} onChange={val => setAttributes({ cartButtonText: val })} />
										<Typography label={__('Typography')} value={cartButtonTypography} onChange={value => setAttributes({ cartButtonTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />

										{
											cartButtonStyle === 'fill' &&
											<Fragment>
												<RadioAdvanced
													label={__('Button Size')}
													options={[
														{ label: 'S', value: 'small', title: 'Small' },
														{ label: 'M', value: 'medium', title: 'Medium' },
														{ label: 'L', value: 'large', title: 'Large' },
														{ icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
													]}
													value={cartButtonSize}
													onChange={(value) => setAttributes({ cartButtonSize: value })} />
												{cartButtonSize == 'custom' &&
													<Padding
														label={__('Custom Size')}
														value={cartButtonCustomSize}
														onChange={(value) => setAttributes({ cartButtonCustomSize: value })}
														unit={['px', 'em', '%']}
														max={150}
														min={0}
														responsive
														device={device}
														onDeviceChange={value => this.setState({ device: value })} />
												}


												<Border label={__('Border')} value={cartButtonBorder} onChange={val => setAttributes({ cartButtonBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
												{
													(cartButtonBorder.openBorder || cartButtonStyle === 'fill') &&
													<BorderRadius
														min={0}
														max={100}
														responsive
														device={device}
														label={__('Corner')}
														value={cartButtonBorderRadius}
														unit={['px', 'em', '%']}
														onChange={value => setAttributes({ cartButtonBorderRadius: value })}
														onDeviceChange={value => this.setState({ device: value })}
													/>
												}
												<BoxShadow label={__('Box-Shadow')} value={cartButtonBoxShadow} onChange={(value) => setAttributes({ cartButtonBoxShadow: value })} />
											</Fragment>
										}
										<Tabs>
											<Tab tabTitle={__('Normal')}>
												<Color label={__('Text Color')} value={cartButtonStyle === 'fill' ? cartButtonColor : cartButtonColor2} onChange={value => setAttributes(cartButtonStyle === 'fill' ? { cartButtonColor: value } : { cartButtonColor2: value })} />
												{cartButtonStyle === 'fill' && <ColorAdvanced label={__('Background')} value={cartButtonBg} onChange={(value) => setAttributes({ cartButtonBg: value })} />}
											</Tab>
											<Tab tabTitle={__('Hover')}>
												<Color label={__('Text Color')} value={cartButtonHoverColor} onChange={value => setAttributes({ cartButtonHoverColor: value })} />
												{cartButtonStyle === 'fill' && <ColorAdvanced label={__('Background')} value={cartButtonHoverBg} onChange={(value) => setAttributes({ cartButtonHoverBg: value })} />}
											</Tab>
										</Tabs>
									</Fragment>
								}
							</PanelBody> 

							<PanelBody title={__('Spacing')} initialOpen={false}>
								{(layout === 2) &&
									<Range label={__('Column Gap')} value={columnGap} onChange={value => setAttributes({ columnGap: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								{(showCategory == 'default') &&
									<Range label={__('Category')} value={categorySpace} onChange={value => setAttributes({ categorySpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								}
								<Range label={__('Title')} value={titleSpace} onChange={value => setAttributes({ titleSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Meta')} value={metaSpace} onChange={value => setAttributes({ metaSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Range label={__('Excerpt')} value={excerptSpace} onChange={value => setAttributes({ excerptSpace: value })} unit={['px', 'em', '%']} min={0} max={100} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
							</PanelBody> 

							<PanelBody title={__('Typography')} initialOpen={false}>
								<Typography label={__('Title')} value={titleTypography} onChange={value => setAttributes({ titleTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Separator />
								<Typography label={__('Meta')} value={metaTypography} onChange={value => setAttributes({ metaTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
								<Separator />
								<Typography label={__('Excerpt')} value={excerptTypography} onChange={value => setAttributes({ excerptTypography: value })} device={device} onDeviceChange={value => this.setState({ device: value })} />
							</PanelBody> 

							<PanelBody title={__('Colors')} initialOpen={false}>
								<Color label={__('Title')} value={style !== 4 ? titleColor : titleOverlayColor} onChange={value => setAttributes(style !== 4 ? { titleColor: value } : { titleOverlayColor: value })} />
								<Color label={__('Title Hover')} value={titleHoverColor} onChange={value => setAttributes({ titleHoverColor: value })} />
								<Color label={__('Meta')} value={style !== 4 ? metaColor : metaOverlayColor} onChange={value => setAttributes(style !== 4 ? { metaColor: value } : { metaOverlayColor: value })} />
								<Color label={__('Excerpt')} value={style !== 4 ? excerptColor : excerptColor2} onChange={value => setAttributes(style !== 4 ? { excerptColor: value } : { excerptColor2: value })} />
							</PanelBody>
                        </InspectorTab>
						<InspectorTab key={'advance'}>
							{animationSettings(uniqueId, animation, setAttributes)}
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
				
				{enableHeading && 
					<div className={`wprig-title-wrap`}> 
						<h3 className={`wprig-heading-selector`}>{headingContent}</h3>
					</div>
				}
				<div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''} sb-slider`}>
					<div className={`wprig-banner`}>
					<div className={`wprig-image-media `}>                          
                                <div className="wprig-image-container">

                                    {
                                        (imageType === 'local' && image.url != undefined) ?
                                            <Fragment>
                                                {image2x.url != undefined ?
                                                    <img className="wprig-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                                    :
                                                    <img className="wprig-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                                }
                                            </Fragment>
                                            :
                                            (imageType === 'external' && externalImageUrl.url != undefined) ?
                                                <img className="wprig-image-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
                                                :
                                                <div className="wprig-image-image wprig-image-placeholder"><i className="far fa-image" /></div>
                                    }

                                    
                                </div>
                        </div>
					</div>
						{
						(posts && posts.length) ?
							<Fragment>
								<div
									// onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
									className={`wprig-sb-product-carousel-wrapper wprig-sb-product-carousel-layout-${layout} ${(layout === 2) ? 'wprig-sb-product-carousel-column wprig-sb-product-carousel-column-md' + column.md + ' ' + 'wprig-sb-product-carousel-column-sm' + column.sm + ' ' + 'wprig-sb-product-carousel-column-xs' + column.xs : ''}`}>
									{posts && this.renderCarouselContent(posts) }
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
							
							</Fragment>
							:
							<div className="wprig-sb-product-carousel-is-loading">
								<Spinner />
							</div>
					} 
				</div>
			</Fragment >
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const { getEntityRecords } = select('core')
		const { attributes: { 
			taxonomy,
			order,
			orderBy,
			categories,
			tags,
			postsToShow,
			carouselItems,
			enableDots,
			enableArrows, } } = props

		let allTaxonomy = wprig_admin.all_taxonomy

		// let seletedTaxonomy = taxonomy === 'categories' ? 'categories' : 'tags'
		// let activeTaxes = taxonomy === 'categories' ? categories : tags

			
		var tax_query = [];
		tax_query["relation"] = "AND";
		
		for(const cat of categories){
			
			tax_query.push({
				taxonomy:taxonomy,
				field:'slug',
				terms:cat.value
			})
		}


		let query = {
			order: order,
			orderby: orderBy,
			per_page: postsToShow,
			taxonomy:taxonomy,
			tax_query:tax_query

        }
		let seletedTaxonomy = taxonomy === 'categories' ? 'categories' : 'tags'
		let activeTaxes = taxonomy === 'categories' ? categories : tags
		
		
		return {
            posts: getEntityRecords('postType', 'product', query),
			taxonomyList:wprig_admin.woocommerce_taxonomy,
			[seletedTaxonomy]: activeTaxes.map(({ value, label }) => value),
			carouselParams:{
				dots: enableDots,
				slidesToShow: parseInt(carouselItems.md),
				arrows: enableArrows,
				prevArrow:'<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
				nextArrow:'<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""></button>',
				responsive:[
					{
						breakpoint:900,
						settings:{
							slidesToShow: parseInt(carouselItems.md),
						}
					},
					{
						breakpoint:600,
						settings:{
							slidesToShow: carouselItems.sm,
						}
					},
					{
						breakpoint:320,
						settings:{
							slidesToShow: carouselItems.xs,
						}
					}
				]
			}
			// taxonomyList: allTaxonomy.product.terms ? allTaxonomy.product.terms[taxonomy === 'categories' ? 'category' : 'post_tag'] ? allTaxonomy.post.terms[taxonomy === 'categories' ? 'category' : 'post_tag'] : [] : [],
		};
	}),
	withCSSGenerator()
])(Edit)


