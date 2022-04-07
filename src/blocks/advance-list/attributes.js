const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents;

const attributes = {
    // Global
    ...globalAttributes,
    uniqueId: {
        type: 'string',
        default: ''
    },
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    listType: {
        type: 'string',
        default: 'unordered'
    },

    alignment: {
        type: 'string',
        default: 'left',
        style: [
            {
                selector: '{{WPRIG}} .wprig-block-advanced-list {text-align: {{alignment}};}'
            }
        ]
    },

    listItems: {
        type: 'array',
        default: ['Create advanced list items', 'Options to choose list design', 'Beautiful interaction transitions']
    },

    bulletStyle: {
        type: 'object',
        default: {
            name: 'check-circle-outline',
            value: 'far fa-check-circle'
        }
    },
    useNumberBg: {
        type: 'boolean',
        default: true
    },
    sourceOfCopiedStyle: {
        type: 'boolean',
        default: false
    }
}

export default attributes;