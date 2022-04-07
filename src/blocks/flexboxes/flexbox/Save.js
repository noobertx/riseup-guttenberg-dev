const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr } } = wp.wprigComponents

class Save extends Component {
	render() {
		const { attributes:{ uniqueId, animation } } = this.props
		return(
			<div className={ `wprig-column wprig-column-front wprig-block-${uniqueId}` } {...animationAttr(animation)}>
				<div className={ `wprig-column-inner` }>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save