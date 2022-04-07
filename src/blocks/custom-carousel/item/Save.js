/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
const { Component } = wp.element
const { InnerBlocks } = wp.blockEditor
const { HelperFunction: { animationAttr, videoBackground } } = wp.wprigComponents

class Save extends Component {

	getClassName = () => {
		const {
			attributes: {
				align,
				childRow,
				rowContainerWidth
			}
		} = this.props;
		let wrapperClassName = '';

		if (typeof align !== 'undefined') {
			if (align === 'full' && rowContainerWidth === 'boxed') {
				wrapperClassName = 'wprig-container';
			} else {
				wrapperClassName = 'wprig-container-fluid';
			}
		} else {
			if (childRow) {
				wrapperClassName = 'wprig-container-fluid';
			} else {
				wrapperClassName = 'wprig-container';
			}
		}

		return wrapperClassName;
	}

	render() {
		const { attributes: { uniqueId, animation, align, rowContainerWidth, rowId, rowBg, shapeTop, shapeBottom, heightOptions } } = this.props

		return (
			<div className={`wprig-section wprig-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'wprig-section-parallax' : ''}`} {...rowId ? { id: rowId } : ''} {...animationAttr(animation)}>

				{(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
					<div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
				}
				{(Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video') &&
					videoBackground(rowBg, 'row')
				}
				{(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
					<div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
				}
				<div className="wprig-row-overlay"></div>
				<div className={this.getClassName()}>
					<div className={`wprig-row ${(heightOptions == 'window') ? 'wprig-row-height-window' : ''}`}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		)
	}
}
export default Save