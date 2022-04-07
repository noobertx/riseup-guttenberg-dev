const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents

const attributes = {

    uniqueId: {
        type: 'string',
        default: ''
    },
    ...globalAttributes,  // Global Settings
    spacer: {
        type: 'object',
        default: {
            spaceTop: {
                md: '10',
                unit: 'px'
            },
            spaceBottom: {
                md: '10',
                unit: 'px'
            }
        },
        style: [{ selector: '{{WPRIG}}' }]
    },
    navAlignment: {
        type: 'string',
        default: 'left'
    },
    flipDirection: {
        type: 'string',
        default: 'wprig-flip--left'
    },
    flipboxHeight: {
        type: 'object', default: {
            md: '300',
            unit: 'px'
        },
        style: [
            {  
                selector: '{{WPRIG}} .wprig-flipbox {height: {{flipboxHeight}};}'
            }
        ]
    },
    tabs: {
        type: 'number',
        default: 2
    },
    tabStyle: {
        type: 'string',
        default: 'pills'
    },

    tabTitles: {
        type: 'array',
        default: [
            { title: 'Front' },
            { title: 'Back' }
        ]
    },



    testfield: { type: 'object', default: { url: '#' } },
}
export default attributes;