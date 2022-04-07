const { Component, Fragment, createRef } = wp.element
import Modal from './../modal';
import 'jquery-mosaic/jquery.mosaic.min.js';
import icons from '../../helpers/icons';


class Mosaic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            openModal:false,
            imageCollection:[],
            caption :"",
            imageUrl:"",
            openClass:""
        };
        this.wprigContextMenu = createRef();
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

    componentDidMount() {
        const {
            className,
            id,
            images,
            maxRowHeight  
        }  = this.props;

        var the_id = id;

        if(jQuery("."+id).find("#gallery") ){
            // setTimeout(function(){
            //     jQuery("."+the_id).find("#gallery").unitegallery()
            //     console.log("Hello World"+the_id);

            // },5000)
            this.loadMosaicScript(id);

        }
    }

    componentDidUpdate(prevProps, prevState,){
        const {
            innerGap,
            id,
            maxRowHeight  
        }  = this.props;
        
        // console.log(this.props.id, prevProps.id)
        if(prevProps.id!=this.props.id ||prevProps.maxRowHeight!=this.props.maxRowHeight || prevProps.innerGap != this.props.innerGap ){
            this.setState({doneLoading:false})
            
            this.loadMosaicScript(id);
        }
    }

    loadMosaicScript(id){
        const {
            className,
            images,
            maxRowHeight  ,
            innerGap
        }  = this.props;
        const loadImage = image => {
            return new Promise((resolve, reject) => {
              const loadImg = new Image()
              loadImg.src = image.url
              // wait 2 seconds to simulate loading time
              loadImg.onload = () =>
                setTimeout(() => {
                  resolve(image.url)
                }, 2000)
      
              loadImg.onerror = err => reject(err)
            })
          }
    
                Promise.all(images.map(image => loadImage(image))).then(() => {
                    // $("."+id).find("#gallery").unitegallery()
                    // console.log("Doing Mosaic")
                    this.setState({doneLoading:true})
                    setTimeout(function(){
                        // console.log(jQuery("."mosaicx).find("#gallery"));
                        jQuery("."+id +" >.mosaicx").Mosaic();
                        // console.log(id);
                    // jQuery("."+className).find("#gallery").Mosaic({
                    //     maxRowHeight:maxRowHeight,
                    //     innerGap:parseInt(innerGap),
                    //     responsiveWidthThreshold:true
                    // });
                },500)
                }).catch(err => console.log("Failed to load images", err))
           
    }


    renderCells(imageItems,enableHoverFx,overlayParams){
        if(imageItems && imageItems.length>0){
            return imageItems.map((el)=>{       
                return(
                    <div class="cells">
                        {enableHoverFx && 
                            <div className="overlay">
                                <div className={`overlay-content ${overlayParams.overlayLayout}`}>
                                    {overlayParams.enableViewButton && overlayParams.enableModal  &&
                                        <button type="button" className="view" onClick={()=>{this.renderClick(el)}}>
                                            <i className={`wprig-btn-icon ${overlayParams.viewIconName}`}></i>
                                            {
                                                overlayParams.viewButtonLabel
                                            }
                                        </button>
                                    }

                                    
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

    renderMosaicBlocks(){
        const {
            className,
            id,
            overlayEffect,
            enableHoverFx,
            maxRowHeight,
            innerGap,
            hoverEffect,
            modalLayout,
            imageItems,
            hoverEffectDirection,
            overlayParams,
            images  
        }  = this.props;

        // console.log("renderMosaicBlocks");
        return(
            <Fragment>
                <div className={`${className}  ${id} ${enableHoverFx ? hoverEffect+' '+hoverEffectDirection : ' '} `}>
                    <div class="mosaicx" data-max-row-height={maxRowHeight} data-inner-gap={innerGap} > 
                        {/* {this.renderCells(images,enableHoverFx,overlayParams)} */}
                       { images && images.length>0 &&
             images.map((el)=>{       
                return(
                    <div class="cells">
                        {enableHoverFx && 
                            <div className="overlay">
                                <div className={`overlay-content ${overlayParams.overlayLayout}`}>
                                    {overlayParams.enableViewButton && overlayParams.enableModal  &&
                                        <button type="button" className="view" onClick={()=>{this.renderClick(el)}}>
                                            <i className={`wprig-btn-icon ${overlayParams.viewIconName}`}></i>
                                            {
                                                overlayParams.viewButtonLabel
                                            }
                                        </button>
                                    }
                                    {overlayParams.enableShareButton && 
                                        <button type="button" className="share">
                                            <i className={`wprig-btn-icon ${overlayParams.shareIconName}`}></i>
                                            {
                                                overlayParams.shareButtonLabel
                                            }
                                            <ul className="tool-tip">
                                                {overlayParams.enableFacebook &&
                                                <li><a href = "#"><span className="fab fa-facebook"></span></a></li>
                                                }
                                            </ul>
                                        </button>
                                    }
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
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        const {
            className,
            id,
            overlayEffect,
            enableHoverFx,
            maxRowHeight,
            innerGap,
            hoverEffect,
            modalLayout,
            hoverEffectDirection,
            images  
        }  = this.props;

        const { doneLoading } = this.state;

       

        if(!doneLoading){
            return(
                <Fragment>
                    <p>Gallery is loading</p>
                </Fragment>
            )
        }

        return(
            
            <Fragment>
                { this.state.openModal && 
                <Modal
                title={`${this.state.caption ? this.state.caption : "No Title" }  `}
                className={`wprig-dynamic-modal wprig-block-${id}${className ? ` ${className}` : ''} ${overlayEffect} ${this.state.openClass}` }
                overlayClassName = {`wprig-block-${id}`}  
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

            {this.renderMosaicBlocks() }
               
            </Fragment>
        )
    }
}

export default Mosaic;