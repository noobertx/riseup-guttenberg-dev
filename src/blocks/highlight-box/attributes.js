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
    bodyBg: {
        type: 'string', default: '#F5F5F5',
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body {background-color: {{bodyBg}};}'
            }
        ]
    },

    heightOptions: { type: 'string', default: 'auto' },
    rowHeight: {
        type: 'object', default: {},
        style: [
            {
                condition: [
                    { key: 'heightOptions', relation: '==', value: 'custom' },
                ],
                selector: '{{WPRIG}} .wprig-highlight-box-body { height: {{rowHeight}}} '
            }
        ]
    },

    position: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} .wp-block-wprig-highlight-box-face{ align-items:{{position}}}'}] },
    alignment: {
        type: 'object',
        default: {},
        style: [
            { selector: '/*debugging alignment*/ {{WPRIG}} .wp-block-wprig-highlight-box-face{justify-content: {{alignment}}; }, {{WPRIG}}.wp-block-wprig-highlight-box-face{justify-content: {{alignment}}; }' }
        ],
    },
    bodyPadding: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: {
                md: 0
            },
            unit: 'px',
        },
        style: [
            {                
                selector: '{{WPRIG}} .wprig-highlight-box-body'
            }
        ]
    },
    bodyBorder: {
        type: 'object',
        default: {
            borderType: 'global'
        },
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body'
            }
        ]
    },
    bodyShadow: {
        type: 'object',
        default: {
            horizontal: 2,
            vertical: 2,
            blur: 3,
            spread: '0'
        },
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body'
            }
        ]
    },
    bodyBorderRadius: {
        type: 'object',
        default: {
            radiusType: 'global'
        },
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body'
            }
        ]
    },

    bodySeparatorHeight: {
        type: 'object',
        default: {
            md: 1,
            unit: 'px'
        },
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body {border-top: {{bodySeparatorHeight}} solid transparent;}'
            }
        ]
    },
    bodySeparatorColor: {
        type: 'string',
        default: '#e5e5e5',
        style: [
            {
                selector: '{{WPRIG}} .wprig-highlight-box-body'
            }
        ]
    },

    hoverEffect: {
        type: 'string',
        default: 'wprig-highlight-box-effect-1'
    },
    
    direction:{
        type: 'string',        
        condition: [
            { key: 'hoverEffect', relation: '!=', value: '2' },
            { key: 'hoverEffect', relation: '!=', value: '3' },
        ],
        default: 'bottom-to-top'
    },

    shapeTop: {
        type: 'object',
        default: {
            openShape: 0,
            color: '#006fbf',
            shapeType: 'top',
            width: { unit: '%' },
            height: { unit: 'px' },
        },
        style: [{ selector: '{{WPRIG}} .wprig-shape-divider.wprig-top-shape' }]
    },
    shapeBottom: {
        type: 'object',
        default: {
            openShape: 0,
            color: '#006fbf',
            shapeType: 'bottom',
            width: { unit: '%' },
            height: { unit: 'px' }
        },
        style: [{ selector: '{{WPRIG}} .wprig-shape-divider.wprig-bottom-shape' }]
    },

}
export default attributes;