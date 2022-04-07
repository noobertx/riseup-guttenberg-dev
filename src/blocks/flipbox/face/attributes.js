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
    color_scheme: {
        type: "string",
        default: "info",
    },
    customClassName: {
        type: 'string',
        default: ''
    },
    ...globalAttributes,  // Global Settings
}


export default attributes;