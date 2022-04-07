const { compose } = wp.compose;
const { Component, Fragment, createRef } = wp.element
const { Tooltip } = wp.components
const { withDispatch,withSelect } = wp.data
const { withCSSGenerator } = wp.wprigComponents

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            hideRowSettings: false,
            slides :0
        };
        this.wprigContextMenu = createRef();
    }
    componentDidMount() {

    }

    shouldComponentUpdate(){

    }

    componentDidUpdate(prevProps){

    }

    render() {
        const {			
            attributes: {
                uniqueId,
                className,
                carousel_items,
                slides,
            },
            setAttributes 
        } = this.props;

        if(!carousel_items){
            return (
                <Fragment>
                    <div className={`wprig-section wprig-block-${uniqueId} `}>
                    <Tooltip text="Number of slides">


                        <button onClick={() => {
                                    // if(slides > 1) {
                                        setAttributes({ carousel_items: 3 });
                                        console.log(slides,carousel_items)
                                    // }
                        }}>Go</button>
                        </Tooltip>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <div className={`wprig-section wprig-block-${uniqueId} `}>
                    
                    <h1>You Can Edit This {carousel_items} Element</h1>
                </div>
            </Fragment>
        )
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