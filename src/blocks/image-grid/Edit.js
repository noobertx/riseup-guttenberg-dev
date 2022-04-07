const { __ } = wp.i18n
const { select } = wp.data
const {  PanelBody, RangeControl,TextControl,Button, SelectControl} = wp.components
const { Component, Fragment, createRef } = wp.element
const { InspectorControls, MediaPlaceholder,MediaUpload} = wp.blockEditor
const {
    Toggle,
     Styles,
    IconList,
    Range,
     globalSettings: { globalSettingsPanel,
     animationSettings },
globalCustomSettings:{globalCustomAttributes,
     HoverEXSettings},
  HelperFunction: {  animationAttr,
     IsInteraction },
 CssGenerator: { CssGenerator },
 withCSSGenerator,
 InspectorTabs,
 InspectorTab } = wp.wprigComponents
import { __experimentalNumberControl as NumberControl } from  '@wordpress/components';
import Modal from './../modal';
import icons from '../../helpers/icons';


import Mosaic from './mosaic';
import ImageMasonry from './image-masonry';
import ImageCarousel from './image-carousel';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            openModal:false,
            imageCollection:[],
            title:"",
            description:"",
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
       
        //    if(jQuery(".slider")){
            // jQuery(this.el).find("#gallery").unitegallery().destroy()
            // jQuery(this.el).find("#gallery").unitegallery()
            // this.loadCarousel(uniqueId,this.getCarouselParams())
        //    }
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
            title:el.caption,
            description:el.description
        });       
        const t = this;
        console.log(t)
        setTimeout(function(){
            t.openOverlay()
        },250)
    }

    renderCells(imageItems,enableHoverFx){

        const {
            attributes: {
                enableViewButton,
                viewButtonLabel,
                viewIconName,
                enableShareButton,
                shareButtonLabel,
                shareIconName,
                overlayLayout,
                enableModal
            },
            setAttributes 
        }  = this.props;

        if(imageItems && imageItems.length>0){
            return imageItems.map((el)=>{       
                return(
                    <div class="cells">
                        {enableHoverFx &&
                            <div className="overlay">
                                <div className="overlay-content">
                                    <div className={`overlay-content ${overlayLayout}`}>
                                    {enableViewButton &&  enableModal &&
                                        <button type="button" className="view" onClick={()=>{this.renderClick(el)}}>
                                            <i className={`wprig-btn-icon ${viewIconName}`}></i>
                                            {
                                                viewButtonLabel
                                            }
                                        </button>
                                    }
                                    {enableShareButton && 
                                        <button type="button" className="share">
                                            <i className={`wprig-btn-icon ${shareIconName}`}></i>
                                            {
                                                shareButtonLabel
                                            }
                                            {/* <ul className="tool-tip">
                                                {enableFacebook &&
                                                <li><a href = "#"><span className="fab fa-facebook"></span></a></li>
                                                }                                              
                                            </ul> */}
                                        </button>
                                    }
                                    </div>
                                </div>
                            </div>
                        }
                        <img 
                        src = {el.url} 
                        data-image={el.url}  
                        onClick={()=>{ !enableHoverFx ? this.renderClick(el): ''}}
                        />
                        
                    </div>
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

    render() {
        const {
            attributes: {
                uniqueId,
                className,
                imageItems,
                columns,
                columnsTablet,
                columnsPhone,
                rowGap,
                columnGap,
                cellHeight,
                cellWidth,
                cellMargin,
                enableModal,
                overlayEffect,
                enableHoverFx,
                hoverEffect,
                hoverEffectDirection,
                skin,

                carouselItems,
                maxRowHeight,
                innerGap,

                gutter,

                enableViewButton,
                viewButtonType,
                viewButtonLabel,
                viewButtonIcon,
                viewFillType,
                viewIconName,
                viewIconSize,

                enableShareButton,
                shareButtonType,
                shareButtonLabel,
                shareButtonIcon,
                shareFillType,
                shareIconName,
                // enableFacebook,

                enableDots,
                enableArrows,  

                overlayLayout,
                modalLayout,
                animation,

            },
            setAttributes 
        }  = this.props;

        const { device,imageCollection } = this.state;
        const overlayParams = {
            enableViewButton,
            viewButtonType,
            viewButtonLabel,
            viewButtonIcon,
            viewIconName,

            enableShareButton,
            shareButtonType,
            shareButtonLabel,
            shareButtonIcon,
            shareIconName,

            // enableFacebook,
          

            enableModal,
            overlayLayout
        }  

       
        return (
            <Fragment>
                <InspectorControls>
                    <InspectorTabs tabs={['content','hover', 'advance']}>
                        <InspectorTab key={'content'}>
                            <PanelBody initialOpen={true} title={__('Grid Settings')}>
                            <SelectControl
                                    label={__('Skin')}
                                    value={skin}
                                    options={[
                                        { label: 'Image Grid', value: '' },
                                        { label: 'Carousel', value: 'carousel' },
                                        { label: 'Mosaic', value: 'mosaic' },
                                        { label: 'Masonry', value: 'masonry' }
                                    ]}
                                    onChange={val => setAttributes({ skin: val })}
                                />

                                

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
                                       });
                                   }}
                                />
                                
                                { skin !="mosaic" &&  skin !="masonry" &&
                                <Fragment>

                                    <Range
                                        label={__('Columns')}
                                        value={columns || ''}
                                        onChange={val => setAttributes({ columns: val })}
                                        min={1}
                                        max={10}
                                        
                                    />
                                    <Range
                                        label={__('Columns Tablet')}
                                        value={columnsTablet || ''}
                                        onChange={val => setAttributes({ columnsTablet: val })}
                                        min={1}
                                        max={10}
                                        
                                    />
                                    <Range
                                        label={__('Columns Mobile')}
                                        value={columnsPhone || ''}
                                        onChange={val => setAttributes({ columnsPhone: val })}
                                        min={1}
                                        max={10}
                                        
                                    />

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

                                    <Range
                                        label={__('Height')}
                                        min={0} max={900}
                                        value={cellHeight}
                                        onChange={val => setAttributes({ cellHeight: val })}
                                        unit={['px', 'em','vh']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                </Fragment>
                                }
                                { skin =="mosaic" &&
                                <Fragment>
                                <div><label>Max Row Height</label></div>
                                <NumberControl
                                    isShiftStepEnabled={ false }
                                    onChange={val => setAttributes({ maxRowHeight: val })}
                                    shiftStep={ 10 }
                                    value={ maxRowHeight }
                                    />
                                <label>Gap</label>
                                <NumberControl
                                    isShiftStepEnabled={ false }
                                    onChange={val => setAttributes({ innerGap: val })}
                                    shiftStep={ 5 }
                                    value={ innerGap }
                                    />                                      
                                </Fragment>
                                }

                                {skin == "masonry" &&
                                <Fragment>
                                <Range
                                        label={__('Cell Width')}
                                        min={0} max={900}
                                        value={cellWidth}
                                        onChange={val => setAttributes({ cellWidth: val })}
                                        unit={['px', 'em','vw']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                <Range
                                        label={__('Cell Margin')}
                                        min={0} max={30}
                                        value={cellMargin}
                                        onChange={val => setAttributes({ cellMargin: val })}
                                        unit={['px','vw']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                                </Fragment>
                                }

                            </PanelBody>
                            {skin == "carousel" &&  
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
                             
                        
                                          
                            </PanelBody>
                            }
                            <PanelBody initialOpen={false} title={__('Lightbox Settings')}>
                            <Toggle label={__('Enable Modal')} value={enableModal} onChange={val => setAttributes({ enableModal: val })} />
                            {enableModal && 
                            <Fragment>
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
                                <SelectControl
                                    label={__('Layout')}
                                    value={modalLayout}
                                    options={[
                                        { label: 'Layout 1', value: 'modal-layout-1' },
                                        { label: 'Layout 2', value: 'modal-layout-2' },
                                    ]}
                                    onChange={val => setAttributes({ modalLayout: val })}
                                />
                                </Fragment>
                                }
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'hover'}>
                            {HoverEXSettings(uniqueId,enableHoverFx, hoverEffect,hoverEffectDirection, setAttributes)}  
                            <PanelBody initialOpen={false} title={__('Hover Overlay Content')}>
                                {enableModal  &&
                                <Toggle label={__('Enable View')} value={enableViewButton} onChange={val => setAttributes({ enableViewButton: val })} />
                                }
                                <Toggle label={__('Enable Share')} value={enableShareButton} onChange={val => setAttributes({ enableShareButton: val })} />
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

                            
                            </Fragment>
                            }
                                {enableShareButton  && 
                            <Fragment>
                                {/* <Toggle label={__('Enable Facebook')} value={enableFacebook} onChange={val => setAttributes({ enableFacebook: val })} /> */}
                                {/* <Toggle label={__('Enable Twitter')} value={enableTwitter} onChange={val => setAttributes({ enableTwitter: val })} /> */}
                                {/* <Toggle label={__('Enable Instagram')} value={enableInstagram} onChange={val => setAttributes({ enableInstagram: val })} /> */}
                            <TextControl
                                label="View Button Text"
                                value={ shareButtonLabel }
                                onChange={ ( value ) => setAttributes( { shareButtonLabel:value } ) }
                            />
                            <IconList
                                    label={__('Icon')}
                                    value={shareIconName}
                                    onChange={(value) => this.props.setAttributes({ shareIconName: value })} />
                                <Styles value={shareFillType}
                                    onChange={(value) => setAttributes({ shareFillType: value })}
                                    options={[
                                        { value: 'fill', svg: icons.btn_fill, label: __('Fill') },
                                        { value: 'outline', svg: icons.btn_outline, label: __('Outline') }
                                    ]}
                                />

                            
                            </Fragment>
                            }
                            </PanelBody>
                            <PanelBody title={__('Hover Overlay')} initialOpen={true}>  
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
                        
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            
                            
                            {animationSettings(uniqueId, animation, setAttributes)} 
                            {/* {interactionSettings(uniqueId, interaction, setAttributes)} */}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

            { this.state.openModal && 
                <Modal
                title="This is my modal"
                className={`wprig-dynamic-modal wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}
                overlayClassName = {`wprig-block-${uniqueId} ${overlayEffect} ${this.state.openClass} `}  
				onRequestClose={ () => {this.closeOverlay() }}>
                    <img src={`${this.state.imageUrl}`}/>
                </Modal>
            }
            {imageItems.length==0 ? 
                <div className={`wprig-grids-editor wprig-grid-gallery wprig-block-${uniqueId}`} >
                   
                   <MediaPlaceholder
                        onSelect={(newImages) =>{
                            const newImgs = newImages.map((img) => {
                                return {
                                    id: img.id,
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
						labels={{ title: "Image Slider" }}
						allowedTypes={["image"]}
						multiple
					/>
                </div> :
                <Fragment>
                    <Modal
                title={`${this.state.title ? this.state.title : "No Title" }  `}
                className={`wprig-dynamic-modal wprig-block-${uniqueId}${className ? ` ${className}` : ''} ${overlayEffect} ${this.state.openClass}` }
                overlayClassName = {`wprig-block-${uniqueId}`}  
				onRequestClose={ () => {this.closeOverlay() }}>
                    {modalLayout=='modal-layout-1' &&
                        <Fragment>
                            <figure className="modal-layout-1">
                                <img src={`${this.state.imageUrl}`}/>
                                <figcaption className = "description">
                                    <p>{this.state.description ? this.state.description : "No Description" }</p>
                                </figcaption>
                            </figure>
                        </Fragment>
                    }
                    {modalLayout=='modal-layout-2' &&
                        <Fragment>
                            <figure className="modal-layout-2">
                                <figcaption className = "description">
                                    <p>{this.state.description ? this.state.description : "No Description" }</p>
                                </figcaption>
                                <img src={`${this.state.imageUrl}`}/>
                            </figure>
                        </Fragment>
                    }
                </Modal>
                {
                    skin == "" && 
                    <div className={`wprig-grids-editor wprig-grid-gallery wprig-block-${uniqueId} ${enableHoverFx ? hoverEffect+' '+hoverEffectDirection : ' '} `}  {...animationAttr(animation)} >
                        {this.renderCells(imageItems,enableHoverFx)}
                    </div>
                }
                {
                    skin == "carousel" && 

                    <ImageCarousel 
                    className={`wprig-custom-gallery wprig-gallery slider`} 
                    gutter = {gutter}
                    carouselParams = {this.getCarouselParams()}
                    columns = {columns}
                    overlayEffect = {overlayEffect}
                    enableHoverFx = {enableHoverFx}               
                    hoverEffect = {hoverEffect}
                    modalLayout = {modalLayout}
                    overlayParams = {overlayParams}
                    hoverEffectDirection = {hoverEffectDirection}
                    id={`wprig-block-${uniqueId}`}
                    images={imageItems}/>

                }
                {
                    skin == "mosaic" && 
                    <Mosaic 
                    className={`wprig-grids-editor wprig-gallery wprig-mosaic-gallery`} 
                    maxRowHeight = {maxRowHeight}
                    innerGap = {innerGap}
                    overlayEffect = {overlayEffect}
                    enableHoverFx = {enableHoverFx}               
                    hoverEffect = {hoverEffect}
                    modalLayout = {modalLayout}
                    overlayParams = {overlayParams}
                    hoverEffectDirection = {hoverEffectDirection}
                    id={`wprig-block-${uniqueId}`}
                    images={imageItems}/>
                }
                {
                    skin == "masonry" && 
                    <ImageMasonry 
                    className={`wprig-grids-editor wprig-gallery wprig-masonry-gallery`} 
                    overlayEffect = {overlayEffect}
                    enableHoverFx = {enableHoverFx} 
                    cellWidth = {cellWidth}
                    cellMargin = {cellMargin}
                    hoverEffect = {hoverEffect}
                    modalLayout = {modalLayout}
                    overlayParams = {overlayParams}
                    hoverEffectDirection = {hoverEffectDirection}
                    id={`wprig-block-${uniqueId}`}
                    images={imageItems}/>
                }
                
                </Fragment>
            }

                
            </Fragment>
        )
    }
}

export default withCSSGenerator()(Edit);