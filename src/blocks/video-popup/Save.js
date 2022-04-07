const { Component } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
		const { uniqueId, layout, animation, alignment, icon, postfix, prefix, iconSize, url, isRipple, iconBorderRadius, iconBgColor, videoSource, bgVideo, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		return (
			<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`wprig-block-videopopup-wrapper ${interactionClass} wprig-alignment-${alignment}`}>
					{layout == 'fill' && <div className="wprig-block-videopopup-overlay"></div>}
					<div className={`wprig-block-videopopup wprig-size-${iconSize}`} >
						<a className="wprig-video-popup" href={videoSource=='external'?url:(bgVideo.url||'')}>
							{ prefix &&  <span className="wprig-video-popup-prefix"> {prefix} </span> }
							{ icon && (
                                <i className={`wprig-btn-icon ${icon}`}>
                                    { ( iconBgColor && isRipple) && 
										<span className="wprig-ripple" /> 
									}
                                </i>
                            ) }
							{ postfix &&  <span className="wprig-video-popup-postfix">{postfix}</span> }
						</a>
					</div>
				</div>
			</div>
		)
    }
}
export default Save