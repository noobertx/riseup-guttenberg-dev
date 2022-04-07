const { Component } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

class Save extends Component {
    render() {
		const { uniqueId, name, url, animation, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';
		return (
			<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`wprig-block-icon-wrapper ${interactionClass}`}>
					<div className="wprig-block-icon">
                    {url.url ?
						<a className="wprig-icon-block-anchor" href={url.url||'#'} {...( url.target && {target:'_blank'})} {...( url.nofollow && {rel:'nofollow noopener noreferrer'})}>
							<i className={name} />
						</a>
                        : <i className={name} />
                    }
					</div>
				</div>
			</div>
		)
    }
}
export default Save