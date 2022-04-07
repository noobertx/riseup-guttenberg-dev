import classnames from 'classnames';
const { Component } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
	render() {
		const { uniqueId, textField, url, iconName, iconPosition, buttonSize, customClassName, animation, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		const classNames = classnames(
            { [`wprig-block-${uniqueId}`]: uniqueId },
            customClassName
        );

		return (
			<div className={classNames} {...animationAttr(animation)}>
				<div className={`wprig-block-btn-wrapper ${interactionClass}`}>
					<div className={`wprig-block-btn`}>
						<a className={`wprig-block-btn-anchor is-${buttonSize}`} href={url.url ? url.url : '#'} {...(url.target && { target: '_blank' })} {...(url.nofollow ? { rel: 'nofollow noopener noreferrer' } : {...url.target && { rel: 'noopener noreferrer' }}  )} >
							{(iconName.trim() != "") && (iconPosition == 'left') && (<i className={`wprig-btn-icon ${iconName}`} />)}
							<RichText.Content value={(textField == '') ? 'Add Text...' : textField} />
							{(iconName.trim() != "") && (iconPosition == 'right') && (<i className={`wprig-btn-icon ${iconName}`} />)}
						</a>
					</div>
				</div>
			</div>
		)
	}
}
export default Save