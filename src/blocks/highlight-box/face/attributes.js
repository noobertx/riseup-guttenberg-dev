const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents


const attributes= {
    uniqueId: {
        type: 'string',
        default: ''
    },
    id: {
        type: 'number',
        default: 1,
    },
    customClassName: {
        type: 'string',
        default: ''
    },
    ...globalAttributes,  // Global Settings

    containerWidth: {
        type: 'string',
        default: 'boxed'
    },
    faceBackground: {
        type: 'object',
        default: {
            bgimgPosition: 'center center',
            bgimgSize: 'cover',
            bgimgRepeat: 'no-repeat',
            bgDefaultColor: '#f5f5f5',
            bgimageSource: 'local',
            externalImageUrl: {}
        },
        style: [{ selector: '{{WPRIG}}.wp-block-wprig-highlight-box-face' }]
    },

    enableOverlay: { type: 'boolean', default: false },
    overlay: {
        type: 'object',
        default: {},
        style: [
            {
                condition: [
                    { key: 'enableOverlay', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} >.wprig-row-overlay'
            }
        ]
    },
    blend: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} >.wprig-row-overlay { mix-blend-mode: {{blend}}; }' }] },
    opacity: { type: 'number', default: '.8', style: [{ selector: '{{WPRIG}} >.wprig-row-overlay {opacity: {{opacity}}; }' }] },


    border: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}}'
            }
        ]
    },
    faceShadow: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}}' }] },
    border: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}}'
            }
        ]
    },
    borderRadius: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}}'
            }
        ]
    },
  

}


export default attributes;