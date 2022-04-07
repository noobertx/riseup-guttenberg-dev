/* eslint-disable react/react-in-jsx-scope */
const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment, createRef } = wp.element;
const {
    PanelBody,
    TextControl,
    TextareaControl,
    Toolbar,
    Button,
    Notice
} = wp.components;
const {
    Styles,
    Toggle,
    Tabs,
    Tab,
    globalSettings: {
        globalSettingsPanel,
        animationSettings
    },
    Inline: { InlineToolbar },
    wprigButton: { buttonSettings },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents

import icons from '../../helpers/icons';


class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true,
            selectedItem: -1,
            saved_globally: false
        }
        this._saveGlobally = this._saveGlobally.bind(this);
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId, reCaptchaSiteKey, reCaptchaSecretKey } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }

        if (wprig_admin.wprig_recaptcha_site_key) {
            setAttributes({ reCaptchaSiteKey: wprig_admin.wprig_recaptcha_site_key });
        }

        if (wprig_admin.wprig_recaptcha_secret_key) {
            setAttributes({ reCaptchaSecretKey: wprig_admin.wprig_recaptcha_secret_key });
        }

    }

    async _saveGlobally(siteKey, secretKey) {
        if (!siteKey || !secretKey) return;
        try {
            await wp.apiFetch({
                path: 'wprig/v1/add_wprig_options',
                method: 'POST',
                data: { key: 'wprig_recaptcha_site_key', value: siteKey }
            });
            await wp.apiFetch({
                path: 'wprig/v1/add_wprig_options',
                method: 'POST',
                data: { key: 'wprig_recaptcha_secret_key', value: secretKey }
            });
            this.setState({ saved_globally: true });
        } catch (e) {
            console.log(e);
        }
    }

    setSettings(type, val, index = -1) {
        const selectedItem = (index !== -1) ? index : this.state.selectedItem;
        const { attributes, setAttributes } = this.props;
        let formItems = [...attributes.formItems];
        formItems[selectedItem][type] = val;
        setAttributes({ formItems });
    }

    render() {
        const { selectedItem, device } = this.state;
        const { name, clientId, attributes, setAttributes } = this.props;
        const {
            uniqueId,
            className,
            formItems,
            inputSize,
            enableButton,
            buttonTag,
            buttonSize,
            buttonFillType,
            buttonText,
            buttonIconName,
            buttonIconPosition,
            fieldErrorMessage,
            formSuccessMessage,
            formErrorMessage,
            reCaptcha,
            reCaptchaSiteKey,
            reCaptchaSecretKey,
            emailReceiver,
            emailHeaders,
            emailFrom,
            emailSubject,
            emailBody,
            layout,
            animation,
            enablePosition,
            selectPosition,
            positionXaxis,
            positionYaxis,
            globalZindex,
            hideTablet,
            hideMobile,
            globalCss } = attributes;
        const setting_url = wprig_admin.admin_url + 'admin.php?page=wprig-settings';
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('')} initialOpen={true}>
                                <Styles
                                    value={layout}
                                    onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 'classic', img: icons.form_classic, label: __('Classic') },
                                        { value: 'material', img: icons.form_material, label: __('Material') },
                                    ]}
                                />
                            </PanelBody>

                            {selectedItem >= 0 &&
                                <PanelBody title={(formItems[selectedItem].label) ? formItems[selectedItem].label : __('Input Settings')}>

                                    <TextControl
                                        label={__('Label')}
                                        value={formItems[selectedItem].label}
                                        onChange={val => this.setSettings('label', val)}
                                        placeholder={__('Enter Label')}
                                    />

                                    <TextControl
                                        label={__('Name')}
                                        value={formItems[selectedItem].name}
                                        onChange={val => this.setSettings('name', val)}
                                        placeholder={__('Enter Name')}
                                        help={__('You must write field name with hyphen(-) with lowercase. No space, UPPERCASE, Capitalize is not allowed. This name should match with Form template value. Never keep empty this name.')}
                                    />

                                    <TextControl
                                        label={__('Placeholder')}
                                        value={formItems[selectedItem].placeholder}
                                        onChange={val => this.setSettings('placeholder', val)}
                                        placeholder={__('Enter Placeholder')}
                                    />

                                </PanelBody>
                            }


                            <PanelBody title={__('Settings')} initialOpen={false}>
                                <Tabs>
                                    <Tab tabTitle={__('Form')}>
                                        <TextControl
                                            label={__('Required Field Error Message')}
                                            value={fieldErrorMessage}
                                            onChange={val => setAttributes({ fieldErrorMessage: val })}
                                            help={__('Set required field error message here. Leave blank for default message.')}
                                        />
                                        <TextareaControl
                                            label={__('Form Submit Success Message')}
                                            value={formSuccessMessage}
                                            onChange={val => setAttributes({ formSuccessMessage: val })}
                                            help={__('Set your desired message after successful form submission. Leave blank for default.')}
                                        />
                                        <TextareaControl
                                            label={__('Form Submit Failed Message')}
                                            value={formErrorMessage}
                                            onChange={val => setAttributes({ formErrorMessage: val })}
                                            help={__('Set your desired message for form submission error. Leave blank for default.')}
                                        />
                                        <Toggle label={__('Enable reCAPTCHA')} value={reCaptcha} onChange={val => setAttributes({ reCaptcha: val })} />
                                        {
                                            reCaptcha && (
                                                ((wprig_admin.wprig_recaptcha_site_key && wprig_admin.wprig_recaptcha_site_key) || this.state.saved_globally) ? (
                                                    <div className='api-notice'>{__('reCaptcha keys added successfully')}, <a target='_blank' href={setting_url}>{__('Edit keys here')}</a></div>
                                                ) : (
                                                        reCaptchaSiteKey && reCaptchaSecretKey ? (
                                                            <div className='recaptcha-keys'>
                                                                <TextControl
                                                                    label={__('Site Key ')}
                                                                    value={reCaptchaSiteKey}
                                                                    onChange={val => setAttributes({ reCaptchaSiteKey: val })}
                                                                    placeholder={__('Enter Google Site Key')}
                                                                />
                                                                <TextControl
                                                                    label={__('Secret Key ')}
                                                                    value={reCaptchaSecretKey}
                                                                    onChange={val => setAttributes({ reCaptchaSecretKey: val })}
                                                                    placeholder={__('Enter Google Secret Key')}
                                                                />
                                                                <Button isPrimary onClick={() => this._saveGlobally(reCaptchaSiteKey, reCaptchaSecretKey)}>{__('Set globally')}</Button>
                                                            </div>
                                                        ) : (
                                                                <div className='api-notice warning'>{__('reCaptcha requires site key & secret key')}, <a target='_blank' href={setting_url}>{__('Add keys here')}</a></div>
                                                            )
                                                    )
                                            )
                                        }
                                    </Tab>
                                    <Tab tabTitle={__('Email')}>
                                        <TextControl
                                            label={__('Recipient Email')}
                                            value={emailReceiver}
                                            onChange={val => setAttributes({ emailReceiver: val })}
                                            placeholder={__('Enter Recipient Email')}
                                            help={__('Enter the recipient email address. This field is mandatory. Without a recipient email, contact form will not work.')}
                                        />
                                        <TextareaControl
                                            label={__('Email Headers')}
                                            value={emailHeaders}
                                            onChange={val => setAttributes({ emailHeaders: val })}
                                        />
                                        <TextControl
                                            label={__('From Email')}
                                            value={emailFrom}
                                            onChange={val => setAttributes({ emailFrom: val })}
                                            placeholder={__('Your Name: admin@example.com')}
                                        />
                                        <Notice status="warning" isDismissible={false}>
                                            {__("Please use your site's email, to avoid any error.")}
                                            <br />
                                            {__("if your site is example.com, the email should be anything@example.com")}
                                        </Notice>
                                        <TextControl
                                            label={__('Subject')}
                                            value={emailSubject}
                                            onChange={val => setAttributes({ emailSubject: val })}
                                            placeholder={__('Enter Subject')}
                                        />
                                        <TextareaControl
                                            label={__('Email Body')}
                                            value={emailBody}
                                            onChange={val => setAttributes({ emailBody: val })}
                                            help={__('Set your form email body here. In editor don\'t add any CSS style or others option just add your form field name between double curly braces {{field-name}} as you set in \'Field Name\'.')}
                                        />
                                    </Tab>
                                </Tabs>
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className={`wprig-block-contact-form wprig-layout-${layout}`}
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >
                        <form className="wprig-form">
                            {formItems.map((item, index) =>
                                <div key={index} className={`wprig-form-group wprig-form-group-index-${index}`} style={{ width: `${item.width.md}%` }}>
                                    <div className="wprig-form-group-inner">

                                        {!item.hideLabel && layout == 'classic' &&
                                            <label className="wprig-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }

                                        {/* Text and Email */}
                                        {(item.type == 'text' || item.type == 'email') &&
                                            <input className={`wprig-form-control is-${inputSize}`} type={item.type} placeholder={__(item.placeholder)} required={item.required} onClick={() => this.setState({ selectedItem: index })} />
                                        }

                                        {/* Textarea */}
                                        {item.type == 'textarea' &&
                                            <textarea className="wprig-form-control" placeholder={__(item.placeholder)} required={item.required} onClick={() => this.setState({ selectedItem: index })}></textarea>
                                        }

                                        {layout == 'material' &&
                                            <label className="wprig-form-label">
                                                <span contenteditable="true" onBlur={(e) => this.setSettings('label', e.target.innerText, index)}>
                                                    {__(item.label)} </span> {item.required && '*'}
                                            </label>
                                        }
                                    </div>
                                </div>
                            )}
                            <div className="wprig-form-group" style={{ width: '100%' }}>
                                <wprigButtonEdit
                                    enableButton={enableButton}
                                    buttonFillType={buttonFillType}
                                    buttonSize={buttonSize}
                                    buttonText={buttonText}
                                    buttonIconName={buttonIconName}
                                    buttonIconPosition={buttonIconPosition}
                                    buttonTag={buttonTag}
                                    onTextChange={value => setAttributes({ buttonText: value })}
                                />
                            </div>
                        </form>

                        <div
                            ref={this.wprigContextMenu}
                            className={'wprig-context-menu-wraper'}
                        >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                wprigContextMenu={this.wprigContextMenu.current}
                            />
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default withCSSGenerator()(Edit);