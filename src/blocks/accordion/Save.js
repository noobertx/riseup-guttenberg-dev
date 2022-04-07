const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
        const { animation, uniqueId, itemToggle, interaction} = this.props.attributes;
        const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';
        const className = `wprig-block-accordion ${interactionClass} wprig-block-${uniqueId}`;
        return (
            <div className={ className } {...animationAttr(animation)} data-item-toggle={itemToggle}>
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;