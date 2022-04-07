const { Component, Fragment, createRef } = wp.element
import Modal from './../modal';


class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            openModal:false,
            imageCollection:[],
            imageUrl:"",
            openClass:"",
            caption:"",
            description:"",
            doneLoading:""
        };
        this.wprigContextMenu = createRef();
    }
    renderClick(el){
        this.setState({
            openModal:true,
            imageUrl:el.url,
            caption:el.caption,
            description:el.description,
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
            caption:"",
            description:"",
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
            images  
        }  = this.props;

        var the_id = id;
        this.loadCarousel();
       
    }
    componentDidUpdate(prevProps, prevState,){

        if(prevProps.id!= this.props.id ){
            this.loadCarousel();
        }

    }
    loadCarousel(){
        const {
            images,
            id,
            carouselParams
        }  = this.props;
        // console.log(this.state.doneLoading);
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
              this.setState({doneLoading:true})
            //   console.log(this.state.doneLoading);
              setTimeout(function(){
                        // console.log(id,carouselParams);
                        jQuery("."+id).slick(carouselParams);
                        //
                },500)
                }).catch(err => console.log("Failed to load images", err))
           
    }

    renderSlides(imageItems){

        const {
                enableHoverFx,
                overlayParams,
        }  = this.props;
        
        if(imageItems && imageItems.length>0){
            return imageItems.map((el)=>{       
                return(
                    <div class="cells">
                        {enableHoverFx && 
                            <div className="overlay">
                                <div className="overlay-content">
                                    <div className={`overlay-content ${overlayParams.overlayLayout}`}>
                                    {overlayParams.enableViewButton && overlayParams.enableModal &&
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

    render() {
        const {
            className,
            id,
            overlayEffect,
            modalLayout,
            enableHoverFx,
            hoverEffect,
            hoverEffectDirection,
            overlayParams,
            images,
            columns,
            gutter
            

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
            <div class={`${className}  ${id} ${enableHoverFx ? hoverEffect+' '+hoverEffectDirection : ' '} `} data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
            {/* <div className={`wprig-custom-gallery wprig-gallery slider wprig-block-${uniqueId} ${enableHoverFx ? hoverEffect+' '+hoverEffectDirection : ' '} `} > */}
                {this.renderSlides(images)}
            </div>
            </Fragment>
        )
    }
}

export default ImageCarousel;