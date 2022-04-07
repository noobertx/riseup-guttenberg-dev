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
        default: 2
    },
    tabStyle: {
        type: 'string',
        default: 'pills'
    },

    tabTitles: {
        type: 'array',
        default: [
            { title: '1' },
            { title: '2' }
        ]
    },

    typography: {
        type: 'object',
        default: {},
        style: [
            { selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title' }
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

    // Size
    navSize: {
        type: 'string',
        default: '6px 15px',
        style: [
            {
                condition: [
                    { key: 'navSize', relation: '!=', value: 'custom' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title {padding: {{navSize}};}'
            }
        ]
    },
    navPaddingY: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'navSize', relation: '==', value: 'custom' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title {padding-top: {{navPaddingY}}; padding-bottom: {{navPaddingY}};}'
            }
        ]
    },
    navPaddingX: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'navSize', relation: '==', value: 'custom' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title {padding-left: {{navPaddingX}}; padding-right: {{navPaddingX}};}'
            }
        ]
    },

    // Spacing
    navSpacing: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [
            { selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav {margin-left: calc(-{{navSpacing}}/2); margin-right: calc(-{{navSpacing}}/2);} {{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item {margin-left: calc({{navSpacing}}/2); margin-right: calc({{navSpacing}}/2);}' }
        ]
    },

    //Color
    navColor: {
        type: 'string',
        default: '#999999',
        style: [
            { selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title { color:{{navColor}}; }' }
        ]
    },
    navBg: {
        type: 'string',
        default: '#F5F5F5',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title {background-color: {{navBg}};}'
            }
        ]
    },
    navColorActive: {
        type: 'string',
        default: 'var(--wprig-color-1)',
        style: [
            { selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item.wprig-active .wprig-tab-title { color:{{navColorActive}}; }' }
        ]
    },
    navBgActive: {
        type: 'string',
        default: '#e5e5e5',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item.wprig-active .wprig-tab-title {background-color : {{navBgActive}};} {{WPRIG}} .wprig-block-tab.wprig-tab-style-tabs .wprig-tab-nav .wprig-tab-item.wprig-active .wprig-tab-title:after {background-color : {{navBgActive}};}'
            }
        ]
    },

    // Nav Border
    navBorder: {
        type: 'object',
        default: {
            widthType: 'global',
            unit: 'px',
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title'
            }
        ]
    },
    navBorderActive: {
        type: 'object',
        default: {
            widthType: 'global',
            unit: 'px',
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item.wprig-active .wprig-tab-title'
            }
        ]
    },

    // Underline Border
    navUnderlineBorderWidth: {
        type: 'object',
        default: {
            md: 3,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title {border-bottom: {{navUnderlineBorderWidth}} solid transparent;}'
            }
        ]
    },
    navUnderlineBorderColor: {
        type: 'string',
        default: '',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item .wprig-tab-title { border-bottom-color:{{navUnderlineBorderColor}}; }'
            }
        ]
    },
    navUnderlineBorderColorActive: {
        type: 'string',
        default: 'var(--wprig-color-1)',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-nav .wprig-tab-item.wprig-active .wprig-tab-title { border-bottom-color:{{navUnderlineBorderColorActive}}; }'
            }
        ]
    },

    // Radius
    navBorderRadiusTabs: {
        type: 'object',
        default: {
            openBorderRadius: 1,
            radiusType: 'custom',
            custom: {
                md: '4 4 0 0',
            },
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab.wprig-tab-style-tabs .wprig-tab-nav .wprig-tab-item .wprig-tab-title'
            }
        ]
    },

    navBorderRadiusPills: {
        type: 'object',
        default: {
            openBorderRadius: 1,
            radiusType: 'global',
            global: {
                md: 4,
            },
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'pills' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab.wprig-tab-style-pills .wprig-tab-nav .wprig-tab-item .wprig-tab-title'
            }
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
    bodyPadding: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: {
                md: 20
            },
            unit: 'px',
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body'
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
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body'
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
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body'
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
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body'
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
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body {border-top: {{bodySeparatorHeight}} solid transparent;}'
            }
        ]
    },
    bodySeparatorColor: {
        type: 'string',
        default: '#e5e5e5',
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '==', value: 'underline' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body { border-top-color:{{bodySeparatorColor}}; }'
            }
        ]
    },
    bodyTopSpacing: {
        type: 'object',
        default: {
            md: 20,
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'tabStyle', relation: '!=', value: 'tabs' }
                ],
                selector: '{{WPRIG}} .wprig-block-tab .wprig-tab-body {padding-top: {{bodyTopSpacing}};}'
            }
        ]
    },

    items:{
        type: 'number',
        default: 1,
    },
	slidesToScroll:{
        type: 'number',
        default: 1,
    },
	showDots:{
        type: 'boolean',
        default: false,
    },
	showArrows:{
        type: 'boolean',
        default: false,
    },
	isInfinite:{
        type: 'boolean',
        default: false,
    },
	enableFading:{
        type: 'boolean',
        default: false,
    },
	enableAutoplay:{
        type: 'boolean',
        default: false,
    },
	autoplaySpeed:{
        type: 'number',
        default: 3000,
    },
	enableAdaptiveHeight:{
        type: 'boolean',
        default: false,
    },
	speed:{
        type: 'number',
        default: 500,
    },
}
export default attributes;