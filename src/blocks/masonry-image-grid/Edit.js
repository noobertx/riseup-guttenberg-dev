const { __ } = wp.i18n
const { compose } = wp.compose;
const { select, withDispatch } = wp.data
const {  PanelBody, TextControl, SelectControl, Tooltip, Button, RangeControl ,FormFileUpload} = wp.components
const { Component, Fragment, createRef } = wp.element
const { InspectorControls, MediaPlaceholder,MediaUpload,InnerBlocks, InspectorAdvancedControls } = wp.blockEditor
const { Tab, Tabs, Color,ColorAdvanced, Border ,Toggle, BorderRadius , BoxShadow, Styles,TestField,Background,IconList,Range, globalSettings: { globalSettingsPanel, animationSettings },globalCustomSettings:{globalCustomAttributes, HoverEXSettings},  HelperFunction: { videoBackground }, CssGenerator: { CssGenerator }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import Modal from './../modal';
// import Masonry from "react-responsive-masonry"
// import { Swiper, SwiperSlide } from 'swiper/react';
import ImageMasonry from './image-masonry';
import icons from '../../helpers/icons';

import 'swiper/swiper.scss';
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
        console.log(el);

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
        console.log(this);
        this.setState({
            openModal:true,
            imageUrl:el.url,
        });       
        const t = this;
        setTimeout(function(){
            t.openOverlay()
        },250)
    }
    renderCells(imageItems){
        console.log(imageItems);
        if(imageItems && imageItems.length>0){
            return imageItems.map((el)=>{       
                return(
                    <div class="">
                        <img src = {el.thumbnail} data-image={el.url}  onClick={()=>{this.renderClick(el)}}/>
                    </div>
                )                                                        
        })
        }
    }
    renderImages(imageItems){
        if(imageItems.length>0){

            return imageItems.map((el)=>{       
                console.log(el);
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
                gutter,
                modalOverlayBg,
                overlayEffect,
                enableHoverFx,
                hoverEffect,
                hoverEffectDirection,

                enableViewButton,
                viewButtonType,
                viewButtonLabel,
                viewButtonIcon,
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
                linkButtonType,
                linkButtonLabel,
                linkButtonIcon,
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

                overlayLayout,
                modalLayout
            },
            setAttributes 
        }  = this.props;


        const overlayParams = {
            enableViewButton,
            viewButtonType,
            viewButtonLabel,
            viewButtonIcon,
            viewIconName,
            enableLinkButton,
            linkButtonType,
            linkButtonLabel,
            linkButtonIcon,
            linkIconName,
            overlayLayout
        }    

        const { device,imageCollection } = this.state;

        return (
            <Fragment>
                <InspectorControls>
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody initialOpen={false} title={__('Grid Settings')}>
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
                            }} />

                                     <Range
                                        label={__('Number of Columns')}
                                        min={0} max={15}
                                        value={columns}
                                        onChange={val => setAttributes({ columns: val })}
                                        unit={['']}
                                        responsive
                                        device={this.state.device}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />

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

                                <SelectControl
                                    label={__('Layout')}
                                    value={modalLayout}
                                    options={[
                                        { label: 'Layout 1', value: 'modal-layout-1' },
                                        { label: 'Layout 2', value: 'modal-layout-2' },
                                    ]}
                                    onChange={val => setAttributes({ modalLayout: val })}
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
                                {/* <BorderRadius
                                    label={__('Radius')}
                                    value={viewButtonBorderRadius}
                                    onChange={(value) => setAttributes({ viewButtonBorderRadius: value })}
                                    min={0}
                                    max={100}
                                    unit={['px', 'em', '%']}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} /> */}

                            
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
                            {HoverEXSettings(uniqueId,enableHoverFx, hoverEffect,hoverEffectDirection, setAttributes)}  
                            {/* {animationSettings(uniqueId, animation, setAttributes)}  */}
                            {/* {interactionSettings(uniqueId, interaction, setAttributes)} */}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

    

                {/* <div className={`wprig-grids-editor wprig-grid-gallery wprig-block-${uniqueId}`} > */}
                {/* </div> */}
                {imageItems.length==0 ? 
                <div className={`wprig-grids-editor wprig-grid-gallery wprig-block-${uniqueId}`} >
                   
                <MediaPlaceholder
                     onSelect={(newImages) =>{
                         const newImgs = newImages.map((img) => {
                             return {
                                 url: img.sizes.full.url,
                                 thumbnail:img.sizes.thumbnail.url,
                                 title:img.caption,
                                 id: img.id,
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
             </div>
                :
                <ImageMasonry 
                className={`wprig-grids-editor wprig-gallery wprig-mosaic-gallery`} 
                gutter = {gutter}
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
            
                
            </Fragment>
        )
    }
}

export default withCSSGenerator()(Edit);