const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents

export const attributes = {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,  // Global Settings
    level: {
        type: 'number',
        default: 4
    },
    align: {
        type: 'string',
        style: []
    },
    spacer: {
        type: 'object',
        default: {
            spaceTop: { md: '10', unit: 'px' },
            spaceBottom: { md: '10', unit: 'px' }
        },
        style: [{ selector: '{{WPRIG}}' }]
    },
    animatedText: { type: 'array', default: ['imagination', 'fascination', 'attention', 'passion', 'curiosity'] },
    animationType: {
        type: 'string',
        default: 'clip'
    },
 

    titleBefore: {
        type: 'string',
        default: 'The power of'
    },
    titleAfter: {
        type: 'string',
        default: 'makes us infinite'
    },

    showGlobalSettings: {
        type: 'boolean',
        default: true
    },
    showContextMenu: {
        type: 'boolean',
        default: true
    }
};