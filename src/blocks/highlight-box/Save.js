const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.wprigComponents;

class Save extends Component {

    render() {
        const {
            attributes: {
                uniqueId,
				heightOptions,
                rowHeight,
                alignment,
                isLink,
                url,
                shapeTop,
                shapeBottom,
                direction,
                hoverEffect,
                animation,
                interaction,
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';

        return (
            
            <div className={`wprig-block-${uniqueId} wprig-highlight-box ${hoverEffect}  ${direction}`} {...animationAttr(animation)}>
                             
                {!isLink ? 
                <div className={`wprig-highlight-box `}>
                    
                    <div className={`wprig-highlight-box-body `}>
                    {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
                        <div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
                    }
                    {(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
                        <div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
                    }   
                        <InnerBlocks.Content /> 
                    </div>
                </div>
                :
                <div className={`wprig-highlight-box `}>
                    
                    <a href={url.url ? url.url : '#'} {...(url.target && { target: '_blank' })} {...(url.nofollow ? { rel: 'nofollow noopener noreferrer' } : {...url.target && { rel: 'noopener noreferrer' }}  )}  >
                    <div className={`wprig-highlight-box-body `}>
                    <InnerBlocks.Content /> 
                    {/* {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
								<div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
							}
							{(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
								<div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
							} */}
                       
                    </div>
                    </a>
                </div>
                }
            </div>
        );
    }
}
export default Save;