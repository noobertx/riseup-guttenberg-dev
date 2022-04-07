const { Component ,createPortal} = wp.element;
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
		const { uniqueId, animation, interaction,close,
            delay,
            remeber,
            size,
            id,
            classesList,
            className,
            style } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
            <div className={`wprig-modal-elements  gutten-modal-123 ${className ? ` ${className}` : ''}`}>              
				<div className={`wprig-block-wrapper-block ${interactionClass}`}>
					<InnerBlocks.Content />
				</div>
			</div>
        )
    }
}
export default Save