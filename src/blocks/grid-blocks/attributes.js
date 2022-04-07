const {
    globalSettings: {
        globalAttributes,
    }
} = wp.wprigComponents;

const attributes = {
    uniqueId: {
        type: 'string',
        default: ''
    },
    ...globalAttributes,  // Global Settings
    columns: {
        type: 'number',
        default: ''
    },
    childRow: {
        type: 'boolean',
        default: false
    },
    elRow:{
        type: 'number',
        default: 2,
        style: [
            { selector: '{{WPRIG}}.wprig-grids-editor > .block-editor-inner-blocks > .block-editor-block-list__layout{ grid-template-rows: repeat({{elRow}},1fr); }' +  '{{WPRIG}} .wprig-grids-editor { grid-template-rows: repeat({{elRow}},1fr); }' },
        ]
    },
    elRowGap:{
        type: 'object',
        default: { md: 10, sm: 10, xs: 10, unit: 'px' },
        style: [
            { selector: '{{WPRIG}}.wprig-grids-editor > .block-editor-inner-blocks > .block-editor-block-list__layout{ row-gap: {{elRowGap}}; }' +  '{{WPRIG}} .wprig-grids { row-gap: {{elRowGap}}; }' },
        ]
    },
    elColumn:{
        type: 'number',
        default: 3,
        style: [
            { selector: '{{WPRIG}}.wprig-grids-editor > .block-editor-inner-blocks > .block-editor-block-list__layout{ grid-template-columns: repeat({{elColumn}},1fr); }' + '{{WPRIG}} .wprig-grids{ grid-template-columns: repeat({{elColumn}},1fr); }'   },
        ]
    },
    elColumnGap:{
        type: 'object',
        default: { md: 10, sm: 10, xs: 10, unit: 'px' },
        style: [
            { selector: '{{WPRIG}}.wprig-grids-editor > .block-editor-inner-blocks > .block-editor-block-list__layout{ column-gap: {{elColumnGap}}; }' + '{{WPRIG}} .wprig-grids{ column-gap: {{elColumnGap}}; }'   ,
            unit: 'px'},
        ]
    },

    evenColumnHeight: {
        type: 'boolean',
        default: false,
        style: [
            { selector: '{{WPRIG}}.wprig-section .wprig-row .wprig-column>.wprig-column-inner {height: 100%;}' },
        ]
    },
    // Dimension
    padding: {
        type: 'object',
        default: {
            md: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            unit: 'px',
        },
        style: [{ selector: '{{WPRIG}}.wprig-section {padding: {{padding}};}' }]
    },

    marginTop: { type: 'object', default: { md: 0, unit: 'px' }, style: [{ selector: '{{WPRIG}}.wprig-section{ margin-top:  {{marginTop}}; }' }] },
    marginBottom: { type: 'object', default: { md: 0, unit: 'px' }, style: [{ selector: '{{WPRIG}}.wprig-section{ margin-bottom:  {{marginBottom}}; }' }] },

    rowGutter: {
        type: 'object', default: { md: 30, sm: 30, xs: 30, unit: 'px' }, style: [{
            selector:
                '{{WPRIG}} .wprig-container {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '{{WPRIG}} .wprig-row {margin-left: calc(-{{rowGutter}}/2); margin-right: calc(-{{rowGutter}}/2);}' +
                '{{WPRIG}} .wprig-row > .wprig-column {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '{{WPRIG}} .wprig-row * > [data-type="wprig/column"] {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                '.components-resizable-box__container.wprig-column-resizer.is-selected-column > span > .components-resizable-box__handle, ' +
                'div[data-type="wprig/row"].is-selected .components-resizable-box__container.wprig-column-resizer > span > .components-resizable-box__handle,' +
                'div[data-type="wprig/row"].is-resizing .components-resizable-box__container.wprig-column-resizer > span > .components-resizable-box__handle {right: calc(-{{rowGutter}}/2);}'
        }]
    },

    rowContainerWidth: {
        type: 'string',
        default: 'boxed'
    },

    rowContainer: {
        type: 'number',
        default: 0,
        style: [
            {
                condition: [
                    { key: 'align', relation: '==', value: 'full' },
                    { key: 'rowContainerWidth', relation: '==', value: 'boxed' },
                    { key: 'rowContainer', relation: '!=', value: 0 },
                ],
                selector: '@media (min-width: 1200px) {{{WPRIG}} .wprig-container {max-width: {{rowContainer}}px !important;}}'
            }
        ]
    },
    position: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} .wprig-row, {{WPRIG}} .wprig-row .block-editor-block-list__layout {-webkit-box-align: {{position}}; -ms-flex-align: {{position}}; align-items: {{position}}; }' }] },

    // Background
    rowBg: {
        type: 'object',
        default: {
            bgimgPosition: 'center center',
            bgimgSize: 'cover',
            bgimgRepeat: 'no-repeat',
            bgDefaultColor: '#f5f5f5',
            bgimageSource: 'local',
            externalImageUrl: {}
        },
        style: [{ selector: '{{WPRIG}}.wprig-section' }]
    },
    heightOptions: { type: 'string', default: 'auto' },
    rowHeight: {
        type: 'object', default: {},
        style: [
            {
                condition: [
                    { key: 'heightOptions', relation: '==', value: 'custom' },
                ],
                selector: '{{WPRIG}} .wprig-row {min-height: {{rowHeight}};}'
            }
        ]
    },

    borderRadius: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}}.wprig-section, {{WPRIG}}.wprig-section .wprig-video-bg-wrap, {{WPRIG}}.wprig-section .wprig-row-overlay'
            }
        ]
    },

    rowShadow: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}}.wprig-section' }] },
    border: {
        type: 'object', default: {},
        style: [
            {
                selector: '{{WPRIG}}.wprig-section'
            }
        ]
    },

    // Overlay
    enableRowOverlay: { type: 'boolean', default: false },
    rowOverlay: {
        type: 'object',
        default: {},
        style: [
            {
                condition: [
                    { key: 'enableRowOverlay', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} >.wprig-row-overlay'
            }
        ]
    },
    rowBlend: { type: 'string', default: '', style: [{ selector: '{{WPRIG}} >.wprig-row-overlay { mix-blend-mode: {{rowBlend}}; }' }] },
    rowOpacity: { type: 'number', default: '.8', style: [{ selector: '{{WPRIG}} >.wprig-row-overlay {opacity: {{rowOpacity}}; }' }] },

    // Divider
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

    // Responsive
    hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{WPRIG}}.wprig-section{ display:none; }' }] },
    hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{WPRIG}}.wprig-section{ display:none; }' }] },

    // Advanced Settings
    rowId: { type: 'string', default: '' },
    rowZindex: { type: 'number', default: '', style: [{ selector: '{{WPRIG}}.wprig-section{z-index:{{rowZindex}};}' }] },
    rowReverse: {
        type: 'object',
        default: { openRowReverse: false, values: {} },
        style: [{ selector: '{{WPRIG}}.wprig-section >.wprig-container >.wprig-row,{{WPRIG}}.wprig-section >.wprig-container-fluid >.wprig-row, {{WPRIG}} >.wprig-container-fluid >.wprig-row > .block-editor-inner-blocks > .block-editor-block-list__layout, {{WPRIG}} >.wprig-container >.wprig-row > .block-editor-inner-blocks > .block-editor-block-list__layout' }]
    },

    rowCss: { type: 'string', default: '', style: [{ selector: '' }] }
};

export default attributes;