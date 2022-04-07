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
    tabs: {
        type: 'number',
        default: 3
    },
    tabStyle: {
        type: 'string',
        default: 'pills'
    },

    tabTitles: {
        type: 'array',
        default: [
            { title: 'Tab 1' },
            { title: 'Tab 2' },
            { title: 'Tab 3' }
        ]
    },


    //icons
    iconPosition: {
        type: 'string',
        default: 'right'
    },
    iconSize: {
        type: 'object',
        default: {},
        style: [
            {
                selector: '{{WPRIG}} .wprig-tab-icon {font-size: {{iconSize}}}'
            }]
    },
    iconGap: {
        type: 'object',
        default: {
            md: 8,
            unit: 'px'
        },
        style: [{ selector: '{{WPRIG}} .wprig-tab-title.wprig-has-icon-left .wprig-tab-icon { margin-right: {{iconGap}}; } {{WPRIG}} .wprig-tab-title.wprig-has-icon-right .wprig-tab-icon  { margin-left: {{iconGap}};} {{WPRIG}} .wprig-tab-title.wprig-has-icon-top .wprig-tab-icon  { margin-bottom: {{iconGap}};}' }]
    },

    //Color
    navColor: {
        type: 'string',
        default: '#999999',
        style: [
            { selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title { color:{{navColor}}; }' }
        ]
    },
    // Body
    bodyBg: {
        type: 'string', default: '#F5F5F5',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body {background-color: {{bodyBg}};}'
            }
        ]
    },
}
export default attributes;