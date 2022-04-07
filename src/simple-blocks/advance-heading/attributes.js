const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents

const attributes = {
    uniqueId: { type: 'string', default: '' },
    ...globalAttributes,
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },
    content: {
        type: 'string',
        source: 'html',
        selector: '.wprig-heading-selector',
        default: 'WPRIG - A Full-fledged Gutenberg Builder'
    },
    alignment: {
        type: 'object',
        default: {},        
    },
    typography: {
        type: 'object',
        default: { openTypography: 1, size: { md: 24, unit: 'px' } },
    },
    separatorStyle: {
        type: 'string',
        default: '',
        style: [
            {
                condition: [{ key: 'separatorStyle', relation: '!=', value: '' }],
                selector: '{{WPRIG}} .wprig-block-heading .wprig-separator-type-css {border-top-style: {{separatorStyle}};}'
            }
        ],
    },
    separatorPosition: { type: 'string', default: 'top' },
    separatorColor: {
        type: 'string',
        default: '',    
    },
    separatorStroke: {
        type: 'number',
        default: 3,
        style: [
            {
                condition: [{ key: 'separatorStyle', relation: '!=', value: '' }],
                selector: '{{WPRIG}} .wprig-block-heading .wprig-separator-type-svg svg .wprig-separator-stroke {stroke-width: {{separatorStroke}}px;} {{WPRIG}} .wprig-block-heading .wprig-separator-type-css {border-top-width: {{separatorStroke}}px;}'
            }
        ]
    },
    separatorWidth: {
        type: 'object',
        default: { md: 60 },
        style: [
            {
                condition: [{ key: 'separatorStyle', relation: '!=', value: '' }],
                selector: '{{WPRIG}} .wprig-block-heading .wprig-separator-type-css {width: {{separatorWidth}}px;} {{WPRIG}} .wprig-block-heading .wprig-separator-type-svg svg {width: {{separatorWidth}}px;}'
            }
        ]
    },
    separatorNumber: {
        type: 'number',
        default: 1
    },
    separatorSpacing: {
        type: 'object',
        default: { md: 10 },
        style: [
            {
                condition: [{ key: 'separatorStyle', relation: '!=', value: '' }],
                selector: '{{WPRIG}} .wprig-separator-position-left .wprig-separator {margin-right: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-position-right .wprig-separator {margin-left: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-position-leftright .wprig-separator-before {margin-right: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-position-leftright .wprig-separator-after {margin-left: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-position-top .wprig-separator {margin-bottom: {{separatorSpacing}}px;} {{WPRIG}} .wprig-separator-position-bottom .wprig-separator {margin-top: {{separatorSpacing}}px;}'
            }
        ],
    },

    subHeading: { type: 'boolean', default: false },
    subHeadingLevel: { type: 'number', default: 3 },
    subHeadingContent: {
        type: 'string',
        source: 'html',
        selector: '.wprig-sub-heading-selector',
        default: 'Sub Heading'
    },
    subHeadingTypography: {
        type: 'object',
        default: { openTypography: 1, size: { md: 16, unit: 'px' } },
        
    },
    subHeadingColor: {
        type: 'string', default: '#333',
        
    },
    subHeadingPosition: {
        type: 'string',
        default: 'after_title',
    },
    subHeadingSpacing: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'subHeading', relation: '==', value: 1 },
                    { key: 'subHeadingPosition', relation: '==', value: 'after_title' }
                ],
                selector: '{{WPRIG}} .wprig-block-heading .wprig-sub-heading-selector {margin-top: {{subHeadingSpacing}};}'
            },
            {
                condition: [
                    { key: 'subHeading', relation: '==', value: 1 },
                    { key: 'subHeadingPosition', relation: '==', value: 'before_title' }
                ],
                selector: '{{WPRIG}} .wprig-block-heading .wprig-sub-heading-selector {margin-bottom: {{subHeadingSpacing}};}'
            }
        ],
    },

    selector: {
        type: 'string',
        default: 'h2'
    },
    level: {
        type: 'number',
        default: 2
    },
    textColor: {
        type: 'string', default: 'default',
    },
    sourceOfCopiedStyle: { type: 'boolean', default: false }
}

export default attributes;