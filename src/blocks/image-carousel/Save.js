const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, videoBackground } } = wp.wprigComponents

class Save extends Component {
    render() {
        const { attributes: { uniqueId, animation,imageItems } } = this.props

        return(
        <div className={`wprig-grid-image wprig-block-${uniqueId} `}>
            {imageItems.length  > 0 && imageItems.map((el)=>{                                
                return (
                    <figure>
                    <img src = {el.url}/>
                    </figure>
                )                                                               
            })}
        </div>
        )
    }
}

export default Save