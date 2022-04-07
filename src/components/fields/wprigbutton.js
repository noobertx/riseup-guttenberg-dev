const { __ } = wp.i18n
const { Component, Fragment } = wp.element
const { RichText } = wp.blockEditor

class WPRigButtonEdit extends Component {
    render() {
        const { buttonIconName, buttonIconPosition, buttonSize, buttonText, onTextChange } = this.props
        return (
            <div className="wprig-block-btn-wrapper">
                <div className={`wprig-block-btn`}>
                    <span className={`wprig-block-btn-anchor is-${buttonSize}`}>
                        {buttonIconName && (buttonIconPosition == 'left') && (<i className={`wprig-btn-icon ${buttonIconName}`} />)}
                        <RichText
                            key="editable"
                            keepPlaceholderOnFocus
                            placeholder={__('Add Text...')}
                            onChange={value => onTextChange(value)}
                            value={buttonText}
                        />
                        {buttonIconName && (buttonIconPosition == 'right') && (<i className={`wprig-btn-icon ${buttonIconName}`} />)}
                    </span>
                </div>
            </div>
        )
    }
}
class WPRigButtonSave extends Component {

    render() {
        const { buttonIconName, buttonIconPosition, buttonSize, buttonText, buttonUrl, buttonTag, buttonId } = this.props

        const buttonHtml = <Fragment>
            {buttonIconName && (buttonIconPosition == 'left') && (<i className={`wprig-btn-icon ${buttonIconName}`} />)}
            <RichText.Content value={buttonText ? buttonText : 'Add Text...'} />
            {buttonIconName && (buttonIconPosition == 'right') && (<i className={`wprig-btn-icon ${buttonIconName}`} />)}
        </Fragment>

        return (
            <div className="wprig-block-btn-wrapper">
                <div className={`wprig-block-btn`}>
                    {buttonTag == 'a' ?
                        <a className={`wprig-block-btn-anchor is-${[buttonSize]}`} {...buttonId ? 'id="' + buttonId + '"' : ''} href={(buttonUrl && buttonUrl.url) ? buttonUrl.url : '#'} {...((buttonUrl && buttonUrl.target) && { target: '_blank' })} {...((buttonUrl && buttonUrl.nofollow) ? { rel: 'nofollow noopener noreferrer' } : { ...(buttonUrl && buttonUrl.target) && { rel: 'noopener noreferrer' } })} >
                            {buttonHtml}
                        </a>
                        :
                        <button className={`wprig-block-btn-anchor is-${buttonSize}`} {...buttonId ? 'id="' + buttonId + '"' : ''} type="submit" role="button">
                            {buttonHtml}
                        </button>
                    }
                </div>
            </div>
        )
    }
}

export { WPRigButtonEdit, WPRigButtonSave }