const {
    globalSettings: {
        globalAttributes
    },
    wprigButton: {
        buttonAttributes
    }
} = wp.wprigComponents;

const attributes = {
    uniqueId: { type: 'string', default: '' },
    // Global
    ...globalAttributes,
    ...buttonAttributes,
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    layout: { type: 'number', default: 1 },
    alignment: {
        type: 'string', default: 'left'
    },
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{WPRIG}}' }] },
    mediaType: { type: 'string', default: 'icon' },
    enableButton: { type: 'boolean', default: false },
    buttonToggleOption: { type: 'boolean', default: true },

    // Icon
    iconName: { type: 'string', default: 'fas fa-rocket' },
    style: { type: 'string', default: 'style-1' },
    // Image
    image: { type: 'object', default: {} },
    image2x: { type: 'object', default: {} },
    imgAlt: { type: 'string', default: '' },
    imageType: {
        type: 'string',
        default: 'local'
    },
    externalImageUrl: {
        type: 'object',
        default: {}
    },

    // Number
    number: { type: 'number', default: 1 },


    // Media background
    useMediaBg: { type: 'boolean', default: 1 },
    

    // Title
    enableTitle: { type: 'boolean', default: 1 },
    title: {
        type: 'string',
        source: 'html',
        selector: '.wprig-info-box-title',
        default: 'This is an infobox'
    },
    titleLevel: { type: 'number', default: 2 },

    
    subTitle: { type: 'boolean', default: 0 },
    subTitleLevel: { type: 'number', default: 3 },
    subTitleContent: {
        type: 'string',
        source: 'html',
        selector: '.wprig-info-box-sub-title',
        default: 'Sub Title'
    },
    
    
    

    // Title separator
    separatorStyle: {
        type: 'string', default: '',
        style: [
            {
                condition: [
                    { key: 'separatorStyle', relation: '!=', value: '' }
                ],
                selector: '{{WPRIG}} .wprig-block-info-box .wprig-separator-type-css {border-top-style: {{separatorStyle}};}'
            },
        ]
    },
    separatorPosition: { type: 'string', default: 'top' },

    //Content
    enableContent: { type: 'boolean', default: true },
    content: {
        type: 'string',
        source: 'html',
        selector: '.wprig-info-box-text',
        default: 'wprig blocks are added to the Gutenberg editor as soon as you install the plugin. You can start using it as any other Gutenberg block.'
    },

    // Body

  

    sourceOfCopiedStyle: { type: 'boolean', default: false }
}

export default attributes;