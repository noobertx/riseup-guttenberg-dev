const { __ } = wp.i18n;
const { Component } = wp.element;
const { wprigButtonSave } = wp.wprigComponents
const { HelperFunction: { animationAttr } } = wp.wprigComponents;
class Save extends Component {

    _encrypt(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    _renderField(item, index, inputSize) {
        const fieldID = `wprig-form-input-${index}`;
        const fieldName = `wprig-form-input[${item.name}${(item.required ? '*' : '') }]`;
        const fieldClass = `wprig-form-control is-${inputSize}`;
        switch( item.type ) {
            case 'text':
            case 'email':
                return <input id={ fieldID } name={ fieldName } className={ fieldClass } type={ item.type } placeholder={ __( item.placeholder ) } required={ item.required }/>;
            case 'textarea':
                return <textarea id={ fieldID } name={ fieldName } className={ fieldClass } placeholder={ __( item.placeholder ) } required={ item.required }></textarea>;
            default:
                return '';
        }
    }

    _renderFormGroupCss() {
        const { formItems } = this.props.attributes;
        let formGroupCss = '';
        formItems.forEach( ( item, index ) => {
            formGroupCss += `${ item.width.md ? `.wprig-form-group.wprig-form-group-index-${index} { width: ${item.width.md}% }`: `` }
                ${ item.width.sm ? `@media (max-width: 991px) { .wprig-form-group.wprig-form-group-index-${index} { width: ${item.width.sm}% } }` : `` }
                ${ item.width.xs ? `@media (max-width: 767px) { .wprig-form-group.wprig-form-group-index-${index} { width: ${item.width.xs}% } }` : `` }`;
        });
        return formGroupCss;
    }

    render() {
        const { _encrypt, _renderField } = this;
        const { uniqueId, formItems, inputSize, fieldErrorMessage, formSuccessMessage, formErrorMessage, reCaptcha, reCaptchaSiteKey, reCaptchaSecretKey, emailReceiver, emailHeaders, emailFrom, emailSubject, emailBody, layout, buttonFillType, buttonSize, buttonText, buttonIconName, buttonIconPosition, buttonTag, animation } = this.props.attributes
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <style>{ this._renderFormGroupCss() }</style>
                <div className={`wprig-block-contact-form wprig-layout-${layout}`}>
                    <form className="wprig-form">
                        { formItems.map( ( item, index ) =>
                            <div key={ index } className={`wprig-form-group wprig-form-group-index-${index}`}>
                                <div className="wprig-form-group-inner">
                                    { !item.hideLabel && layout == 'classic' &&
                                        <label for={ `wprig-form-input-${index}` } className="wprig-form-label"> { __( item.label ) } { item.required && '*' }</label>
                                    }
                                    { _renderField(item, index, inputSize) }
                                    { layout == 'material' &&
                                        <label className="wprig-form-label"> { __( item.label ) } { item.required && '*' }</label>
                                    }
                                </div>
                            </div>
                        ) }

                        { (reCaptcha && reCaptchaSiteKey && reCaptchaSecretKey) &&
                            <div className="wprig-form-group">
                                <div className="wprig-google-recaptcha" />
                            </div>
                        }

                        <div className="wprig-form-group" style={ {  width: '100%' } }>
                            <wprigButtonSave
								buttonFillType={buttonFillType}
								buttonSize={buttonSize}
								buttonText={buttonText}
								buttonIconName={buttonIconName}
								buttonIconPosition={buttonIconPosition}
                                buttonTag={buttonTag}
							/>
                            <input type="hidden" name="field-error-message" value={ _encrypt( fieldErrorMessage ) } />
                            <input type="hidden" name="form-success-message" value={ _encrypt( formSuccessMessage ) } />
                            <input type="hidden" name="form-error-message" value={ _encrypt( formErrorMessage ) } />
                            <input type="hidden" name="recaptcha" value={ (reCaptcha && reCaptchaSiteKey && reCaptchaSecretKey) ? 'true' : 'false' } />
                            <input type="hidden" name="recaptcha-site-key" value={ reCaptchaSiteKey } />
                            <input type="hidden" name="recaptcha-secret-key" value={ reCaptchaSecretKey } />
                            <input type="hidden" name="email-receiver" value={ _encrypt( emailReceiver ) } />
                            <input type="hidden" name="email-headers" value={ _encrypt( emailHeaders ) } />
                            <input type="hidden" name="email-from" value={ _encrypt( emailFrom ) } />
                            <input type="hidden" name="email-subject" value={ _encrypt( emailSubject ) } />
                            <input type="hidden" name="email-body" value={ _encrypt( emailBody ) } />
                        </div>
                        <div className="wprig-form-group">
                            <div className="wprig-form-group-inner">
                                <div className="wprig-form-message"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Save;