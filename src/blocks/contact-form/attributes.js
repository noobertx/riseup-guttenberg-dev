const { globalSettings: { globalAttributes }, wprigButton: { buttonAttributes }, } = wp.wprigComponents
const formItems = [
    { type: 'text', label: 'Full Name', name: 'full-name ', placeholder: 'Full Name', width: { md: 50 }, required: true, hideLabel: false },
    { type: 'email', label: 'Email', name: 'email', placeholder: 'Email', width: { md: 50 }, required: true, hideLabel: false },
    { type: 'text', label: 'Subject', name: 'subject', placeholder: 'Subject', width: { md: 100 }, required: true, hideLabel: false },
    { type: 'textarea', label: 'Message', name: 'message', placeholder: 'Message', width: { md: 100 }, required: true, hideLabel: false }
]

const attributes =  {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,
    ...buttonAttributes,
    layout: { type: 'string', default: 'classic' },
    useDefaultStyle: { type: 'boolean', default: true },
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{WPRIG}}' }] },
    enableButtonAlignment: { type: 'boolean', default: true },
    enableButton: { type: 'boolean', default: true },
    buttonTag: { type: 'string', default: 'button' },
    buttonText: { type: 'string', default: 'Submit' },
    formItems: { type: 'array', default: formItems },

    inputSize: { type: 'string', default: 'medium' },

    fieldErrorMessage: { type: 'string', default: 'Please fill the required field.' },
    formSuccessMessage: { type: 'string', default: 'Email successfully sent!' },
    formErrorMessage: { type: 'string', default: 'Email sending failed, something went wrong! Please try again.' },
    reCaptcha: { type: 'boolean', default: false },
    reCaptchaSiteKey: { type: 'string', default: '' },
    reCaptchaSecretKey: { type: 'string', default: '' },
    emailReceiver: { type: 'string', default: '' },
    emailHeaders: { type: 'string', default: 'Reply-To: {{email}}\nReply-name: {{full-name }} \nCc: {{email}}\nBcc: admin@yourcompany.com' },
    emailFrom: { type: 'string', default: `Your Company Name: admin@${wprig_admin.actual_url}` },
    emailSubject: { type: 'string', default: '{{subject}} | {{email}} | {{site-name}}' },
    emailBody: { type: 'string', default: '<p><strong>From:</strong> {{full-name }}</p><strong>Email:</strong> {{email}}</p>\n<p><strong>Subject:</strong> {{subject}}</p>\n<p><strong>Message:</strong> {{message}}</p>' },
    sourceOfCopiedStyle: { type: 'boolean', default: false },
}

export default attributes;