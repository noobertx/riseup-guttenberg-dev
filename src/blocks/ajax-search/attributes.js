const { globalSettings: { globalAttributes } } = wp.wprigComponents

const attributes = {
    uniqueId: {
        type: 'string',
        default: ''
    },
    // Global
    ...globalAttributes,
    buttonGroup: {
        type: 'boolean',
        default: false
    },
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    disableFullWidth: {
        type: 'boolean',
        default: false,
        style: [
            {
                condition: [
                    { key: 'disableFullWidth', relation: '==', value: true }
                ],
                selector: '{{WPRIG}}  {width:fit-content;}'
            }
        ]
    },
    parentClientId: { type: 'string', default: '' },
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
    enableAlignment: { type: 'boolean', default: true },
    customClassName: { type: 'string', default: '' },
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{WPRIG}}' }] },
    textField: { type: 'string', default: '' },
    buttonWidthType: {
        type: 'string',
        default: 'auto',
        style: [
            {
                condition: [
                    { key: 'buttonWidthType', relation: '==', value: 'block' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor {display: -webkit-box; display: -ms-flexbox; display: flex;}'
            }
        ]
    },
    buttonWidth: {
        type: 'object',
        default: {
            md: 260,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'buttonWidthType', relation: '==', value: 'fixed' },
                    { key: 'disableFullWidth', relation: '==', value: false },
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor {width: {{buttonWidth}};}'
            },
            {
                condition: [
                    { key: 'buttonWidthType', relation: '==', value: 'fixed' },
                    { key: 'disableFullWidth', relation: '==', value: true },
                ],
                selector: '{{WPRIG}}, {{WPRIG}} .wprig-block-btn-anchor {width: {{buttonWidth}};}'
            },
        ]
    },
    alignment: {
        type: 'object', default: { md: 'center' },
        style: [
            {
                condition: [
                    { key: 'enableAlignment', relation: '==', value: true }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-wrapper {text-align: {{alignment}};}'
            }
        ]
    },
    fillType: { type: 'string', default: 'fill' },
    url: { type: 'object', default: { url: '#' } },
    buttonSize: { type: 'string', default: 'large' },
    buttonPadding: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: { md: 18 },
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'buttonSize', relation: '==', value: 'custom' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor'
            }
        ]
    },
    typography: {
         type: 'object',
          default: {}, 
          style: [{ selector: '{{WPRIG}} .wprig-block-btn-wrapper .wprig-block-btn .wprig-block-btn-anchor ' }] },
    buttonColor: {
        type: 'string', default: '#fff',
        style: [
            {
                condition: [
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor { color:{{buttonColor}}; }'
            },
        ]
    },
    buttonColor2: {
        type: 'string', default: 'var(--wprig-color-1)',
        style: [
            {
                condition: [
                    { key: 'fillType', relation: '!=', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor { color:{{buttonColor2}}; }'
            }
        ]
    },
    buttonHoverColor: {
        type: 'string', default: '#fff',
        style: [
            {
                condition: [
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor:hover { color:{{buttonHoverColor}}; }'
            }
        ]
    },
    buttonHoverColor2: {
        type: 'string', default: '#fff',
        style: [
            {
                condition: [{ key: 'fillType', relation: '!=', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor:hover { color:{{buttonHoverColor2}}; }'
            }
        ]
    },
    bgColor: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: 'var(--wprig-color-1)',
            gradient: {
                color1: 'var(--wprig-color-2)',
                color2: 'var(--wprig-color-1)',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear'
            }
        },
        style: [
            {
                condition: [
                    { key: 'fillType', relation: '==', value: 'fill' }
                ],
                selector: '{{WPRIG}} .wprig-block-btn-anchor'
            }
        ]
    },
    bgHoverColor: {
        type: 'object',
        default: {
            type: 'color',
            openColor: 1,
            color: 'var(--wprig-color-2)',
            gradient: {
                color1: '#16d03e',
                color2: '#1f91f3',
                direction: 0,
                start: 0,
                stop: 100,
                type: 'linear',
            }
        },
        style: [
            { selector: '{{WPRIG}} .wprig-block-btn-anchor:before' }
        ]
    },
    buttonBorder: {
        type: 'object', default: { openBorder: 1, widthType: 'global', global: { md: '1' }, type: 'solid', color: 'var(--wprig-color-1)' },
        style: [
            {
                selector: '{{WPRIG}} .wprig-block-btn-anchor'
            }
        ]
    },
    borderHoverColor: {
        type: 'string', default: 'var(--wprig-color-2)',
        style: [
            {
                selector: '{{WPRIG}} .wprig-block-btn-anchor:hover {border-color: {{borderHoverColor}};}'
            }
        ]
    },
    buttonBorderRadius: {
        type: 'object',
        default: {
            openBorderRadius: 1,
            radiusType: 'global',
            global: { md: 4 },
            unit: 'px',

        },
        style: [{ selector: '{{WPRIG}} .wprig-block-btn-anchor' }]
    },
    buttonShadow: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}} .wprig-block-btn-anchor'
            }
        ]
    },
    buttonHoverShadow: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}} .wprig-block-btn-anchor:hover'
            }
        ]
    },
    iconName: { type: 'string', default: '' },
    iconPosition: { type: 'string', default: 'right' },
    iconSize: {
        type: 'object', default: {},
        style: [
            {
                condition: [
                    { key: 'iconName', relation: '!=', value: '' }
                ],
                selector: '{{WPRIG}} .wprig-btn-icon {font-size: {{iconSize}}}'
            }
        ]
    },
    iconGap: {
        type: 'object', default: { md: 8, unit: 'px' },
        style: [
            {
                condition: [
                    { key: 'iconName', relation: '!=', value: '' },
                    { key: 'iconPosition', relation: '==', value: 'left' },
                ],
                selector: '{{WPRIG}} .wprig-btn-icon { margin-right: {{iconGap}}; }'
            },
            {
                condition: [
                    { key: 'iconName', relation: '!=', value: '' },
                    { key: 'iconPosition', relation: '==', value: 'right' },
                ],
                selector: '{{WPRIG}} .wprig-btn-icon { margin-left: {{iconGap}}; }'
            },
        ]
    },
    sourceOfCopiedStyle: { type: 'boolean', default: false }
}

export default attributes;