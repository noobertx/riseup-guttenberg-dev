const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
		const { uniqueId, animation, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
			<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`wprig-block-wrapper-block ${interactionClass}`}>
					<div className={`panel-wrap`}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		)
    }
}
export default Save