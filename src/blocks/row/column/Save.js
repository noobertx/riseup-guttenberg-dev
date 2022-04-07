const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr } } = wp.wprigComponents

class Save extends Component {



	render() {
		const { attributes:{ uniqueId,columnWidth, animation } } = this.props
		return(
			<div className={ `wprig-column  col-lg-${columnWidth.md} col-md-${columnWidth.sm} col-${columnWidth.xs}  wprig-column-front wprig-block-${uniqueId}` } {...animationAttr(animation)}>
				<div className={ `wprig-column-inner` }>
					<InnerBlocks.Content />
				</div>
			</div>
		)
	}
}
export default Save