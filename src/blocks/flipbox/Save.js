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
                animation,
                interaction,
                flipDirection
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';

        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-flipbox `}>
                    <div className={`wprig-flipbox-body `+flipDirection}>
                        <InnerBlocks.Content /> 
                    </div>
                </div>
            </div>
        );
    }
}
export default Save;