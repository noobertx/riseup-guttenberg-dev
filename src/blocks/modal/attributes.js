const { globalSettings: { globalAttributes } } = wp.wprigComponents

const attributes = {
    close: {
        type: 'boolean',
        source: 'attribute',
        selector: '.hayyabuild-modalbox__body__close',
        attribute: 'class',
        default: true
    },
    delay: {
        type: 'string',
        source: 'attribute',
        selector: '.wp-block-hayyabuild-modalbox',
        attribute: 'data-delay',
        default: '5'
    },
    remember: {
        type: 'string',
        source: 'attribute',
        selector: '.wp-block-hayyabuild-modalbox',
        attribute: 'data-remember',
        default: '1'
    },
    size: {
        type: 'string',
        source: 'attribute',
        selector: '.wp-block-hayyabuild-modalbox',
        attribute: 'data-size',
        default: 'medium'
    },
    id: {
        type: 'string'
    },
    classesList: {
        type: 'string',
        default: ''
    },
    style: {
        type: 'object',
        source: 'attribute',
        selector: 'empty',
        attribute: 'style'
    }
}

export default attributes;