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
    tabs: {
        type: 'number',
        default: 2
    },

    tabTitles: {
        type: 'array',
        default: [
            { title: 'Primary' },
            { title: 'Secondary' }
        ]
    },

    // Body


    bodySeparatorHeight: {
        type: 'object',
        default: {
            md: 1,
            unit: 'px'
        },
        style: [
            {
                selector: '{{WPRIG}} .wprig-ihover-body {border-top: {{bodySeparatorHeight}} solid transparent;}'
            }
        ]
    },
    bodySeparatorColor: {
        type: 'string',
        default: '#e5e5e5',
        style: [
            {
                selector: '{{WPRIG}} .wprig-ihover-body'
            }
        ]
    },

    hoverEffect: {
        type: 'string',
        default: 'wprig-ihover-effect-1'
    },
    
    direction:{
        type: 'string',
        default: 'right-to-left'
    },

    minHeight:{
        type: 'object',
        default: {
            md: 200,
            unit: 'px'
        },
        style: [
            {
                selector: '{{WPRIG}} .wp-block-wprig-ihover-face{min-height: {{minHeight}};}'
            }
        ]
    },

    isLink: { type: 'boolean', default: 0 },
    url: { type: 'object', default: { url: '#' } }
}
export default attributes;