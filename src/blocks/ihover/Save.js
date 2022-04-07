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
                tabStyle,
                tabTitles,
                iconPosition,
                navAlignment,
                isLink,
                url,
                direction,
                hoverEffect,
                animation,
                interaction,
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';

        return (
            <div className={`wprig-block-${uniqueId} wprig-ihover wprig-ihover-effect-${hoverEffect} ${direction}`} {...animationAttr(animation)}>
                
                {!isLink ? 
                <div className={`wprig-ihover `}>
                    <div className={`wprig-ihover-body `}>
                        <InnerBlocks.Content /> 
                    </div>
                </div>
                :
                <div className={`wprig-ihover `}>
                    <a href={url.url ? url.url : '#'} {...(url.target && { target: '_blank' })} {...(url.nofollow ? { rel: 'nofollow noopener noreferrer' } : {...url.target && { rel: 'noopener noreferrer' }}  )}  >
                    <div className={`wprig-ihover-body `}>
                        <InnerBlocks.Content /> 
                    </div>
                    </a>
                </div>
                }
            </div>
        );
    }
}
export default Save;