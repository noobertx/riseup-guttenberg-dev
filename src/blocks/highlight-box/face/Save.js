import classnames from 'classnames';
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
class Save extends Component {
    render() {
        const {
            attributes: {
                uniqueId,
                id,
                faceBackground,
				enableOverlay,
				overlay,
				opacity,
				blend,
				border,
				borderRadius,
				faceShadow,
				rowHeight,
				heightOptions,
				shapeBottom,
				shapeTop,
				position,
                customClassName
            }
        } = this.props;

        return (
            <div className={`wprig-block-${uniqueId} ${customClassName}` }>                
                {(Object.entries(faceBackground).length > 0 && faceBackground.openBg == 1 && faceBackground.bgType == 'video') &&
                    videoBackground(faceBackground, 'row')
                }
				<div className="wprig-row-overlay"></div>
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;