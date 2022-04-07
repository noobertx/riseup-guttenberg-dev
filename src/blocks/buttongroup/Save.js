const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.wprigComponents

class Save extends Component {
	render() {
		const { uniqueId, interaction, animation } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
			<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`wprig-block-button-group ${interactionClass}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save