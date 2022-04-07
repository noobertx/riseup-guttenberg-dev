const { __ } = wp.i18n
const { compose } = wp.compose;
const { select, withDispatch } = wp.data
const {  PanelBody, TextControl, SelectControl, Tooltip, Button, RangeControl ,FormFileUpload} = wp.components
import { __experimentalNumberControl as NumberControl } from  '@wordpress/components';
const { Component, Fragment, createRef } = wp.element
const { InspectorControls,  MediaUpload, MediaPlaceholder, InnerBlocks, InspectorAdvancedControls } = wp.blockEditor
const { Tab, Tabs, Color,ColorAdvanced, Border ,IconList, BorderRadius , BoxShadow,Styles, TestField,Background,Range,Toggle, globalCustomSettings:{globalCustomAttributes, HoverEXSettings}, globalSettings: { globalSettingsPanel, animationSettings }, HelperFunction: { videoBackground }, CssGenerator: { CssGenerator }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import Modal from './../modal';

import icons from '../../helpers/icons';

import SwiperCore, { Navigation,Pagination} from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';


SwiperCore.use([Navigation,Pagination]);
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            openModal:false,
            imageCollection:[],
            imageUrl:"",
            openClass:""
        };
        this.wprigContextMenu = createRef();
    }
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId , imageItems} } = this.props
        const { imageCollection } = this.state
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

       
            this.setState({
               imageCollection : imageItems
           })
       
           if(jQuery(this.el).find("#gallery")){
            // jQuery(this.el).find("#gallery").unitegallery().destroy()
            // jQuery(this.el).find("#gallery").unitegallery()
           }
        }
        
        componentWillUpdate(nextProps, nextState){
            const { setAttributes, clientId, attributes: { uniqueId , imageItems} } = this.props                     
            if(imageItems!= nextProps.attributes.imageItems){
                this.setState({
                    imageCollection : imageItems
                })

            }
    }
    openModal(el){
        // console.log(el);

    }

    openOverlay(){

        this.setState({
            openClass:"open"
        });       

    }
    closeModal(){
        this.setState({
            openModal:false,
            imageUrl:"",
        });  
    }
    closeOverlay(){
        this.setState({
            openClass:""
        });   
        const t = this;
        setTimeout(function(){
            t.closeModal()
        },250)
    }

    renderClick(el){

        this.setState({
            openModal:true,
            imageUrl:el.url,
        });       
        const t = this;
        setTimeout(function(){
            t.openOverlay()
        },250)
    }
    renderSlides(imageItems){
        const {
            attributes: {
                uniqueId,
                className,
                columns,
                rowGap,
                columnGap,
                modalOverlayBg,
                overlayEffect,
                carouselItems,

                enableHoverFx,
                overlayLayout,
                viewIconName,
                linkIconName,
                viewButtonLabel,
                linkButtonLabel,

                enableViewButton,
                enableLinkButton,
            },
            setAttributes 
        }  = this.props;

        if(imageItems && imageItems.length>0){

            return imageItems.map((el)=>{       
                return(
                    <SwiperSlide >
                        <div class="cells">
                        {enableHoverFx && 
                            <div className="overlay">
                                <div className={`overlay-content ${overlayLayout}`}>
                                    { enableViewButton &&
                                    <button type="button" className="view" onClick={()=>{this.renderClick(el)}}>
                                        <i className={`wprig-btn-icon ${viewIconName}`}>{viewButtonLabel}</i>
                                    </button>
                                    }
                                    { enableLinkButton &&
                                    <button type="button" className="link">                                        
                                        <i className={`wprig-btn-icon ${linkIconName}`}>{linkButtonLabel}</i>
                                    </button>
                                    }
                                </div>
                            </div>
                        }
                        <img src = {el.thumbnail} data-image={el.url}  onClick={()=>{this.renderClick(el)}}/>
                        </div>
                    </SwiperSlide>
                )                                                        
        })
        }
    }
    renderImages(imageItems){
        if(imageItems.length>0){
            return imageItems.map((el)=>{       
                return(
                    <a href={el.url}>
                        <img src = {el.url} data-image={el.url}     data-description="This is a Lemon Slice"/>
                    </a>
                )                                                                     
            })
        }
    }

    render() {
        const {
            attributes: {
                uniqueId,
                className,
                imageItems,
                columns,
                rowGap,
                columnGap,
                modalOverlayBg,
                overlayEffect,
                carouselItems,
                hoverEffect,
                hoverEffectDirection,
                overlayLayout,
                enableHoverFx,
                modalLayout,

                dotsColor,
                arrowColor,

                enableViewButton,                
                viewButtonLabel,
                viewFillType,
                viewButtonColor,
                viewButtonColor2,
                viewButtonHoverColor,
                viewButtonHoverColor2,
                viewButtonBgColor,
                viewButtonBgColorHover,
                viewButtonBorder,
                viewButtonBorderHoverColor,
                viewButtonBorderRadius,
                viewButtonShadow,
                viewButtonShadowHover,
                viewIconName,
                viewIconSize,

                enableLinkButton,
                linkButtonLabel,
                linkFillType,
                linkButtonColor,
                linkButtonColor2,
                linkButtonHoverColor,
                linkButtonHoverColor2,
                linkButtonBgColor,
                linkButtonBgColorHover,
                linkButtonBorder,
                linkButtonBorderHoverColor,
                linkButtonBorderRadius,
                linkButtonShadow,
                linkButtonShadowHover,
                linkIconName,
                linkIconSize,

                cellHeight,
            },
            setAttributes 
        }  = this.props;

        const { device,imageCollection } = this.state;

        return (
            <Fragment>
                <InspectorControls>
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody initialOpen={false} title={__('Grid Settings')}>
                                {/* <TestField label={__('Upload Images')} multiple={true} type={['image']} value={imageItems} panel={true} onChange={value => setAttributes({ imageItems: value })} /> */}
                                <MediaUpload
                                    value={imageItems.map((img) => img.id)}
                                    allowedTypes={["image"]}
                                    multiple
                                    gallery
                                    render={({ open }) => (
                                        <Button
                                            icon = "edit"
                                            onClick={open}
                                            isPrimary = "true"
                                        >Edit Gallery Selection</Button>
                                    )}
                                    onSelect={(newImages) => {
                                       
                                       const newImgs = newImages.map((img) =>{
                                          return  imageItems.find((c) => c.id === img.id)
                                           ? imageItems.find((c) => c.id === img.id)
                                           : {
                                               id: img.id,
                                               url: img.sizes.full.url,
                                               thumbnail:img.sizes.thumbnail.url,
                                               title:img.caption,
                                               
                                           }
                                       }
                                       );
                                        setAttributes({
                                           imageItems: newImgs,
                                           // descriptions: newCaptionArray,
                                       });
                                   }}
                                />
                                    <Range label={__('Items')} value={carouselItems} onChange={val => setAttributes({ carouselItems: val })} min={1} max={15} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                           

                                    <Range
                                        label={__('Row Gap')}
                                        min={0} max={100}
                                        value={rowGap}
                                        onChange={val => setAttributes({ rowGap: val })}
                                        unit={['px', 'em', '%','vw']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />

                                    <Range
                                        label={__('Column Gap')}
                                        min={0} max={100}
                                        value={columnGap}
                                        onChange={val => setAttributes({ columnGap: val })}
                                        unit={['px', 'em', '%','vw']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />

                                <div><label>Max Row Height</label></div>
                                <NumberControl
                                    isShiftStepEnabled={ false }
                                    onChange={val => setAttributes({ cellHeight: val })}
                                    shiftStep={ 10 }
                                    value={ cellHeight }
                                />

                            </PanelBody>
                            <PanelBody initialOpen={false} title={__('Carousel')}>
                                <Color label={__('Arrow Color')} value={arrowColor} onChange={(value) => setAttributes({ arrowColor: value }) } />
                                <Color label={__('Dots Color')} value={dotsColor} onChange={(value) => setAttributes({ dotsColor: value }) } />
                            </PanelBody>

                            <PanelBody initialOpen={false} title={__('Lightbox Settings')}>
                            <SelectControl
                                    label={__('Effect')}
                                    value={overlayEffect}
                                    options={[
                                        { label: 'Fade in Scale', value: 'fade-in-scale' },
                                        { label: 'Newspaper', value: 'news-paper' },
                                        { label: 'Fall', value: 'fall' },
                                        { label: 'Side Fall', value: 'side-fall' },
                                        { label: 'Sticky Up', value: 'sticky-up' },
                                        { label: '3D Flip Horizontal', value: 'flip-horizontal' },
                                        { label: '3D Flip Vertical', value: 'flip-vertical' },
                                        { label: '3D Sign', value: 'sign' },
                                        { label: 'Super Scaled', value: 'super-scaled' },
                                        { label: 'Just ME', value: 'just-me' },
                                        { label: '3D Split', value: 'split' },
                                        { label: '3D Rotate Bottom', value: 'rotate-bottom' },
                                        { label: '3D Rotate In Left Bottom', value: 'rotate-in-left' },
                                        { label: 'Slip From Top', value: 'slip-from-top' },
                                        { label: 'Slide Down', value: 'overlay-slidedown' },
                                        { label: 'Slide Up', value: 'overlay-slideup' },
                                        { label: 'Slide Left', value: 'overlay-slideleft' },
                                        { label: 'Slide Right', value: 'overlay-slideright' },
                                    ]}
                                    onChange={val => setAttributes({ overlayEffect: val })}
                                />
                                <Background
                                            parallax
                                            value={modalOverlayBg}
                                            label={__('Background')}
                                            externalImage
                                            sources={['image', 'gradient', 'video']}
                                            onChange={val => setAttributes({ modalOverlayBg: val })}
                                        />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            <PanelBody initialOpen={true} title={__('Hover Overlay Content')}>
                                <Toggle label={__('Enable View')} value={enableViewButton} onChange={val => setAttributes({ enableViewButton: val })} />
                                {enableViewButton  &&
                            <Fragment>
                            <TextControl
                                label="View Button Text"
                                value={ viewButtonLabel }
                                onChange={ ( value ) => setAttributes( { viewButtonLabel:value } ) }
                            />
                            <IconList
                                    label={__('Icon')}
                                    value={viewIconName}
                                    onChange={(value) => this.props.setAttributes({ viewIconName: value })} />
                                {viewIconName &&
                                    <Fragment>
                                        <Range
                                            label={__('Size')}
                                            value={viewIconSize}
                                            onChange={(value) => setAttributes({ viewIconSize: value })}
                                            unit={['px', 'em', '%']}
                                            min={5}
                                            max={48}
                                            responsive
                                            device={device}
                                            onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                                <Styles value={viewFillType}
                                    onChange={(value) => setAttributes({ viewFillType: value })}
                                    options={[
                                        { value: 'fill', svg: icons.btn_fill, label: __('Fill') },
                                        { value: 'outline', svg: icons.btn_outline, label: __('Outline') }
                                    ]}
                                />
                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Text Color')} value={viewFillType == 'fill' ? viewButtonColor : viewButtonColor2} onChange={(value) => viewFillType == 'fill' ? setAttributes({ viewButtonColor: value }) : setAttributes({ viewButtonColor2: value })} />
                                        {viewFillType == 'fill' &&
                                            <ColorAdvanced label={__('Background')} value={viewButtonBgColor} onChange={(value) => setAttributes({ viewButtonBgColor: value })} />
                                        }
                                        <Border label={__('Border')} value={viewButtonBorder} onChange={val => setAttributes({ viewButtonBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={viewButtonShadow} onChange={(value) => setAttributes({ viewButtonShadow: value })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Text Color')} value={viewFillType == 'fill' ? viewButtonHoverColor : viewButtonHoverColor2} onChange={(value) => viewFillType == 'fill' ? setAttributes({ viewButtonHoverColor: value }) : setAttributes({ viewButtonHoverColor2: value })} />
                                        <ColorAdvanced label={__('Background')} value={viewButtonBgColorHover} onChange={(value) => setAttributes({ viewButtonBgColorHover: value })} />
                                        <Color label={__('Border Color')} value={viewButtonBorderHoverColor} onChange={(value) => setAttributes({ viewButtonBorderHoverColor: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={viewButtonShadowHover} onChange={(value) => setAttributes({ viewButtonShadowHover: value })} />
                                    </Tab>
                                </Tabs>
                                <BorderRadius
                                    label={__('Radius')}
                                    value={viewButtonBorderRadius}
                                    onChange={(value) => setAttributes({ viewButtonBorderRadius: value })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                              
                            </Fragment>
                            }
                                <Toggle label={__('Enable Link')} value={enableLinkButton} onChange={val => setAttributes({ enableLinkButton: val })} />
                                {enableLinkButton && 
                            <Fragment>
                            <TextControl
                                label="link Button Text"
                                value={ linkButtonLabel }
                                onChange={ ( value ) => setAttributes( { linkButtonLabel:value } ) }
                            />
                            <IconList
                                    label={__('Link Icon')}
                                    value={linkIconName}
                                    onChange={(value) => this.props.setAttributes({ linkIconName: value })} />
                                {linkIconName &&
                                    <Fragment>
                                        <Range
                                            label={__('Link Icon Size')}
                                            value={linkIconSize}
                                            onChange={(value) => setAttributes({ linkIconSize: value })}
                                            unit={['px', 'em', '%']}
                                            min={5}
                                            max={48}
                                            responsive
                                            device={device}
                                            onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                }
                                <Styles value={linkFillType}
                                    onChange={(value) => setAttributes({ linkFillType: value })}
                                    options={[
                                        { value: 'fill', svg: icons.btn_fill, label: __('Fill') },
                                        { value: 'outline', svg: icons.btn_outline, label: __('Outline') }
                                    ]}
                                />
                                <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Text Color')} value={linkFillType == 'fill' ? linkButtonColor : linkButtonColor2} onChange={(value) => linkFillType == 'fill' ? setAttributes({ linkButtonColor: value }) : setAttributes({ linkButtonColor2: value })} />
                                        {linkFillType == 'fill' &&
                                            <ColorAdvanced label={__('Background')} value={linkButtonBgColor} onChange={(value) => setAttributes({ linkButtonBgColor: value })} />
                                        }
                                        <Border label={__('Border')} value={linkButtonBorder} onChange={val => setAttributes({ linkButtonBorder: val })} min={0} max={10} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={linkButtonShadow} onChange={(value) => setAttributes({ linkButtonShadow: value })} />
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Text Color')} value={linkFillType == 'fill' ? linkButtonHoverColor : linkButtonHoverColor2} onChange={(value) => linkFillType == 'fill' ? setAttributes({ linkButtonHoverColor: value }) : setAttributes({ linkButtonHoverColor2: value })} />
                                        <ColorAdvanced label={__('Background')} value={linkButtonBgColorHover} onChange={(value) => setAttributes({ linkButtonBgColorHover: value })} />
                                        <Color label={__('Border Color')} value={linkButtonBorderHoverColor} onChange={(value) => setAttributes({ linkButtonBorderHoverColor: value })} />
                                        <BoxShadow label={__('Box-Shadow')} value={linkButtonShadowHover} onChange={(value) => setAttributes({ linkButtonShadowHover: value })} />
                                    </Tab>
                                </Tabs>
                                <BorderRadius
                                    label={__('Radius')}
                                    value={linkButtonBorderRadius}
                                    onChange={(value) => setAttributes({ linkButtonBorderRadius: value })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                    }
                            </PanelBody>
                            <SelectControl
                                    label={__('Overlay Layout')}
                                    value={overlayLayout}
                                    options={[
                                        { label: 'Layout 1', value: 'overlay-layout-1' },
                                        { label: 'Layout 2', value: 'overlay-layout-2' },
                                        { label: 'Layout 3', value: 'overlay-layout-3' },
                                        { label: 'Layout 4', value: 'overlay-layout-4' },
                                        { label: 'Layout 5', value: 'overlay-layout-5' },
                                    ]}
                                    onChange={val => setAttributes({ overlayLayout: val })}
                                />
                             {HoverEXSettings(uniqueId,enableHoverFx, hoverEffect,hoverEffectDirection, setAttributes)}
                            {/* {animationSettings(uniqueId, animation, setAttributes)}  */}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>
                {/* <div className={`wprig-floating-element`}>
                    <h1>This is a floating element</h1>
                    <ul className={`wprig-flexbuttons`}>
                        <li><a href="#">Item 1</a></li>
                        <li><a href="#">Item 2</a></li>
                        <li><a href="#">Item 3</a></li>
                        <li><a href="#">Item 4</a></li>
                        <li><a href="#">Item 5</a></li>
                    </ul>
                </div> */}
            {/* {globalSettingsPanel( globalZindex, hideTablet, hideMobile, globalCss, setAttributes)} */}

            { this.state.openModal && 
                <Modal
                title={`${this.state.caption ? this.state.caption : "No Title" }  `}
                className={`wprig-dynamic-modal wprig-block-${uniqueId}${className ? ` ${className}` : ''} ${overlayEffect} ${this.state.openClass}` }
                overlayClassName = {`wprig-block-${uniqueId}`}  
				onRequestClose={ () => {this.closeOverlay() }}>
                    {modalLayout=='modal-layout-1' &&
                        <Fragment>
                            <img src={`${this.state.imageUrl}`}/>
                            <p>{this.state.description ? this.state.description : "No Description" }</p>
                        </Fragment>
                    }
                    {modalLayout=='modal-layout-2' &&
                        <Fragment>
                            <p>{this.state.description ? this.state.description : "No Description" }</p>
                            <img src={`${this.state.imageUrl}`}/>
                        </Fragment>
                    }
                </Modal>
            }


    
            {imageItems.length==0 ? 
                   
                <MediaPlaceholder
                     onSelect={(newImages) =>{
                         const newImgs = newImages.map((img) => {
                             return {
                                 url: img.sizes.full.url,
                                 thumbnail:img.sizes.thumbnail.url,
                                 title:img.caption,

                             }
                         })
                         setAttributes({
                             imageItems: newImgs,								
                         })
                     }
                        
                     }
                     labels={{ title: "Select Images" }}
                     allowedTypes={["image"]}
                     multiple
                 />
            
                
                :
                <div className={`wprig-grids-editor wprig-grid-gallery wprig-block-${uniqueId} ${enableHoverFx ? hoverEffect+' '+hoverEffectDirection : ' '}  `} >
                <Swiper
                    spaceBetween={50}
                    slidesPerView={`${carouselItems.md}`}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            width: 320,
                            slidesPerView: carouselItems.xs,
                        },
                        640: {
                            width: 640,
                            slidesPerView: carouselItems.sm,
                        },
                        // when window width is >= 768px
                        1000: {
                            width: 1000,
                            slidesPerView: carouselItems.md,
                        },
                    }}
                    onSlideChange={() => console.log('slide change')}                    
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    {this.renderSlides(imageItems)}
                </Swiper>               
            </div>


            }
            </Fragment>
        )
    }
}

export default withCSSGenerator()(Edit);