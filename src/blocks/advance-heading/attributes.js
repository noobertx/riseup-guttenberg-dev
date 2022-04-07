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
        style: [
            { selector: '{{WPRIG}}{text-align: {{alignment}}; }' }
        ],
    },
    separatorNumber: {
        type: 'number',
        default: 1
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
 

    subHeading: { type: 'boolean', default: false },
    subHeadingLevel: { type: 'number', default: 3 },
    subHeadingContent: {
        type: 'string',
        source: 'html',
        selector: '.wprig-sub-heading-selector',
        default: 'Sub Heading'
    },

    subHeadingPosition: {
        type: 'string',
        default: 'after_title',
    },


    selector: {
        type: 'string',
        default: 'h2'
    },
    level: {
        type: 'number',
        default: 2
    },
  
    sourceOfCopiedStyle: { type: 'boolean', default: false }
}

export default attributes;