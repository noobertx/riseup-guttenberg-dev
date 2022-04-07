
const {
    globalSettings: {
        globalAttributes
    },
    HelperFunction: {
        IsInteraction
    }
} = wp.wprigComponents;

const attributes = {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,
    buttons: { type: 'number', default: 2 },
    alignment: {
        type: 'object',
        default: { md: 'flex-start' },
        style: [
            { selector: '{{WPRIG}} .wprig-block-button-group {justify-content: {{alignment}}; }' }
        ],
    },
    spacing: {
        type: 'object',
        default: {
            unit: "px",
            md: "10"
        },
        style: [
            // { selector: '{{WPRIG}} .wprig-block-button-group {margin: -{{spacing}};} {{WPRIG}} .wprig-block-button-group.wprig-backend .block-editor-block-list__layout > div[data-type="wprig/button"]:not(:nth-last-child(2)), {{WPRIG}} .wprig-block-button-group .wp-block-wprig-button{margin: {{spacing}};}' }
            { selector: '{{WPRIG}} .wprig-block-button-group {margin-right: -{{spacing}};} {{WPRIG}} .wprig-block-button-group.wprig-backend .block-editor-block-list__layout > div[data-type="wprig/button"]:not(:nth-last-child(2)), {{WPRIG}} .wprig-block-button-group .wp-block-wprig-button:not(:last-child){margin-right: {{spacing}};}' }
        ]
    }
}
export default attributes;