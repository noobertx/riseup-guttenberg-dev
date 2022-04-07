import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { RichText } = wp.blockEditor
const { registerBlockType } = wp.blocks
const { Component, Fragment } = wp.element;
const {
    globalSettings: { globalAttributes },
    HelperFunction: { IsInteraction, animationAttr }
} = wp.wprigComponents

const attributes = {

    uniqueId: {
        type: 'string',
        default: ''
    },
    recreateStyles: {
        type: 'boolean',
        default: true
    },
    ...globalAttributes,
    spacer: {
        type: 'object',
        default: {
            spaceTop: {
                md: '10',
                unit: "px"
            },
            spaceBottom: {
                md: '10',
                unit: "px"
            }
        },
        style: [
            { selector: '{{WPRIG}}' }
        ]
    },

    alignment: {
        type: 'object',
        default: {
            md: 'left'
        },
        style: [{
            selector: '{{WPRIG}} .wprig-block-image {text-align: {{alignment}};}'
        }]
    },

    animateOnHover: {
        type: 'boolean',
        default: true
    },

    layout: {
        type: 'string',
        default: 'simple'
    },
    imgSize: {
        type: 'string',
        default: 'full'
    },

    image: {
        type: 'object',
        default: {}
    },
    imageType: {
        type: 'string',
        default: 'local'
    },
    externalImageUrl: {
        type: 'object',
        default: {}
    },

    image2x: {
        type: 'object',
        default: {}
    },
    imageUrl: { type: 'object', default: {} },
    imageSize: {
        type: 'string',
        default: 'auto',
        style: [{
            condition: [
                { key: 'imageSize', relation: '!=', value: 'auto' },
                { key: 'imageSize', relation: '!=', value: 'custom' },
            ],
            selector: '{{WPRIG}} .wprig-image-image {width: {{imageSize}};}'
        }]
    },

    imageSizeCustom: {
        type: 'object',
        default: {
            md: 300,
            unit: 'px'
        },
        style: [{
            condition: [
                { key: 'imageSize', relation: '==', value: 'custom' },
            ],
            selector: '{{WPRIG}} .wprig-image-image {width: {{imageSizeCustom}};}'
        }]
    },

    imgAlt: {
        type: 'string',
        default: ''
    },

    imageOpacity: {
        type: 'number',
        default: 1,
        style: [{
            selector: '{{WPRIG}} .wprig-image-image {opacity: {{imageOpacity}};}'
        }]
    },

    imageBorderRadius: {
        type: 'object',
        default: {
            openBorderRadius: 0,
            radiusType: 'global',
            global: {},
            unit: 'px',

        },
        style: [{
            selector: '{{WPRIG}} .wprig-image-container'
        }]
    },

    imageBoxShadow: {
        type: 'object',
        default: {},
        style: [{
            selector: '{{WPRIG}} .wprig-image-container'
        }]
    },

    imageBoxShadowHover: {
        type: 'object',
        default: {},
        style: [{
            selector: '{{WPRIG}} .wprig-image-media:hover .wprig-image-container'
        }]
    },

    // Caption
    enableCaption: {
        type: 'boolean',
        default: false,
    },

    imageCaption: {
        type: 'string',
        default: 'Image Caption'
    },

    captionTypography: {
        type: 'object',
        default: {
            openTypography: 1,
            size: {
                md: 16,
                unit: 'px'
            }
        },
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'simple' },
                { key: 'enableCaption', relation: '==', value: 1 }
            ],
            selector: '{{WPRIG}} .wprig-image-caption'
        }]
    },
    captionColor: {
        type: 'string',
        default: '#566372',
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'simple' },
                { key: 'enableCaption', relation: '==', value: 1 }
            ],
            selector: '{{WPRIG}} .wprig-image-caption {color: {{captionColor}};}'
        }]
    },

    captionSpacing: {
        type: 'object',
        default: {
            md: 20,
            unit: 'px'
        },
        style: [{
            selector: '{{WPRIG}} .wprig-image-caption {margin-top: {{captionSpacing}};}'
        }]
    },

    // Title
    title: {
        type: 'string',
        default: 'Image Block'
    },
    titleLevel: {
        type: 'number',
        default: 3
    },
    titleTypography: {
        type: 'object',
        default: {
            openTypography: 1,
            size: {
                md: 38,
                unit: 'px'
            }
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                ],
                selector: '{{WPRIG}} .wprig-image-container .wprig-image-content .wprig-image-content-inner .wprig-image-title'
            }]
    },
    titleColor: {
        type: 'string',
        default: '#FFF',
        style: [{
            selector: '{{WPRIG}} .wprig-image-container .wprig-image-content .wprig-image-content-inner .wprig-image-title {color: {{titleColor}};}'
        }]
    },

    titleVisibleOnHover: {
        type: 'boolean',
        default: false,
    },

    // Sub Title
    enableSubTitle: {
        type: 'boolean',
        default: true,
    },
    subTitle: {
        type: 'string',
        default: 'Insert images and beautify them with wprig Image Block.'
    },
    subTitleTypography: {
        type: 'object',
        default: {
            openTypography: 1,
            size: {
                md: 21,
                unit: 'px'
            }
        },
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'blurb' },
                { key: 'enableSubTitle', relation: '==', value: 1 }
            ],
            selector: '{{WPRIG}} .wprig-image-container .wprig-image-content .wprig-image-content-inner .wprig-image-sub-title'
        }]
    },
    subTitleColor: {
        type: 'string',
        default: '#FFF',
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'blurb' },
                { key: 'enableSubTitle', relation: '==', value: 1 }
            ],
            selector: '{{WPRIG}} .wprig-image-container .wprig-image-content .wprig-image-content-inner .wprig-image-sub-title {color: {{subTitleColor}};}'
        }]
    },
    subTitleSpacing: {
        type: 'object',
        default: {
            md: 10,
            unit: 'px'
        },
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'blurb' },
                { key: 'enableSubTitle', relation: '==', value: 1 }
            ],
            selector: '{{WPRIG}} .wprig-image-sub-title {margin-top: {{subTitleSpacing}};}'
        }]
    },

    subTitleVisibleOnHover: {
        type: 'boolean',
        default: false,
    },

    // Overlay
    enableOverlay: {
        type: 'boolean',
        default: true,
    },

    overlayBg: {
        type: 'object',
        default: {
            openColor: 1,
            type: 'gradient',
            color: 'rgba(6, 80, 183, 0.7)',
            gradient: {
                color1: 'rgba(6, 80, 183, 0.7)',
                color2: 'rgba(96, 10, 255, 0.7)',
                direction: 45,
                start: 0,
                stop: 100,
                type: 'linear'
            },
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableOverlay', relation: '==', value: true }
                ],
                selector: '{{WPRIG}} .wprig-image-container:before'
            }
        ]
    },

    overlayHoverBg: {
        type: 'object',
        default: {
            type: 'gradient',
            openColor: 1,
            color: 'rgba(6, 80, 183, 0.85)',
            gradient: {
                color1: 'rgba(6, 80, 183, 0.85)',
                color2: 'rgba(96, 10, 255, 0.85)',
                direction: 45,
                start: 0,
                stop: 100,
                type: 'linear'
            }
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableOverlay', relation: '==', value: true },
                    { key: 'animateOnHover', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} .wprig-image-container:after'
            }
        ]
    },

    overlayBlend: {
        type: 'string',
        default: '',
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableOverlay', relation: '==', value: true },
                    { key: 'overlayBlend', relation: '!=', value: 'normal' }
                ],
                selector: '{{WPRIG}} .wprig-image-container:before {mix-blend-mode: {{overlayBlend}};} {{WPRIG}} .wprig-image-container:after {mix-blend-mode: {{overlayBlend}};}'
            }
        ]
    },

    // Content
    contentAnimation: {
        type: 'string',
        default: 'zoom-out'
    },

    contentPadding: {
        type: 'object',
        default: {
            openPadding: 1,
            paddingType: 'global',
            global: {
                md: 30,
            },
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                ],
                selector: '{{WPRIG}} .wprig-image-content'
            }
        ]
    },

    contentVerticalAlign: {
        type: 'string',
        default: 'center',
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentVerticalAlign', relation: '==', value: 'top' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-align: start; -ms-flex-align: start; -ms-grid-row-align: flex-start; align-items: flex-start;}'
            },
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentVerticalAlign', relation: '==', value: 'center' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-align: center; -ms-flex-align: center; -ms-grid-row-align: center; align-items: center;}'
            },
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentVerticalAlign', relation: '==', value: 'bottom' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-align: end; -ms-flex-align: end; -ms-grid-row-align: flex-end; align-items: flex-end;}'
            }
        ]
    },

    contentAlignment: {
        type: 'string',
        default: 'center',
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentAlignment', relation: '==', value: 'left' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; text-align: left;}'
            },
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentAlignment', relation: '==', value: 'center' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; text-align: center;}'
            },
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'contentAlignment', relation: '==', value: 'right' }
                ],
                selector: '{{WPRIG}} .wprig-image-content {-webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end; text-align: right;}'
            }
        ]
    },

    // Frame
    enableFrame: {
        type: 'boolean',
        default: false
    },

    frameMargin: {
        type: 'object',
        default: {
            openMargin: 1,
            marginType: 'global',
            global: { md: 30 },
            unit: 'px'
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableFrame', relation: '==', value: true }
                ],
                selector: '{{WPRIG}} .wprig-has-frame figure:after'
            }
        ]
    },
    frameBorder: {
        type: 'object',
        default: {
            openBorder: 1,
            widthType: "global",
            global: {
                md: 5
            },
            type: 'solid',
            color: '#FFF'
        },
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableFrame', relation: '==', value: true }
                ],
                selector: '{{WPRIG}} .wprig-has-frame figure:after'
            }
        ]
    },

    frameBorderRadius: {
        type: 'object',
        default: {
            openBorderRadius: 0,
            radiusType: 'global',
            global: {},
            unit: 'px',

        },
        style: [{
            condition: [
                { key: 'layout', relation: '==', value: 'blurb' },
                { key: 'enableFrame', relation: '==', value: true }
            ],
            selector: '{{WPRIG}} .wprig-has-frame figure::after'
        }]
    },

    frameSendToBack: {
        type: 'boolean',
        default: false,
        style: [
            {
                condition: [
                    { key: 'layout', relation: '==', value: 'blurb' },
                    { key: 'enableFrame', relation: '==', value: true },
                    { key: 'frameSendToBack', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} .wprig-has-frame figure::after {z-index: -1;}'
            }
        ]
    },

    frameAnimateOnHover: {
        type: 'boolean',
        default: false
    }
}

registerBlockType('wprig/image', {
    title: __('Image'),
    description: __('Insert images and beautify them with wprig Image Block.'),
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('image', 'advanced image', 'fancy image'), 'image overlay'],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {
            image: { url: 'https://wprig.io/wp-content/uploads/wprig-assets/demo/image8.jpg' },
            enableCaption: true,
            imageCaption: __('wprig is a full-fledged Gutenberg block toolkit.', 'wprig'),
        },
    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,
            save(props) {
                const {
                    attributes: {
                        uniqueId,
                        layout,
                        imageUrl,
                        animateOnHover,
                        titleVisibleOnHover,
                        subTitleVisibleOnHover,
                        title,
                        titleLevel,
                        subTitle,
                        enableSubTitle,
                        imageCaption,
                        enableCaption,
                        contentAnimation,
                        contentVerticalAlign,
                        contentAlignment,
                        enableFrame,
                        frameAnimateOnHover,
                        interaction,
                        animation }
                } = props

                const titleTagName = 'h' + titleLevel;
                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
                const renderImage = () => {
                    const { attributes: { image, image2x, imgAlt } } = props
                    return (
                        <Fragment>
                            {image.url != undefined ?
                                <Fragment>
                                    {image2x.url != undefined ?
                                        <img className="wprig-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                        :
                                        <img className="wprig-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                    }
                                </Fragment>
                                :
                                <div className="wprig-image-image wprig-image-placeholder"><i className="far fa-image" /></div>
                            }
                        </Fragment>
                    )
                }
                return (
                    <div className={`wprig-block-${uniqueId}`}>
                        <div className={`wprig-block-image ${interactionClass} wprig-image-layout-${layout}`}>
                            <div className={`wprig-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-type-' + contentAnimation : ''} wprig-vertical-alignment-${contentVerticalAlign} wprig-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' wprig-has-frame wprig-frame-animate-on-hover' : ' wprig-has-frame') : ''}`}>
                                <figure>
                                    <div className="wprig-image-container">
                                        {
                                            (imageUrl.url && layout === 'simple') ?
                                                <a href={imageUrl.url ? imageUrl.url : '#'} {...(imageUrl.target && { target: '_blank' })} {...(imageUrl.nofollow ? { rel: 'nofollow noopener noreferrer' } : { ...imageUrl.target && { rel: 'noopener noreferrer' } })}>
                                                    {renderImage()}
                                                </a>
                                                : renderImage()
                                        }

                                        {layout == 'blurb' &&
                                            <div className="wprig-image-content">
                                                <div className="wprig-image-content-inner">
                                                    <RichText.Content
                                                        tagName={titleTagName}
                                                        className={`wprig-image-title${(animateOnHover == 1 && enableSubTitle == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' wprig-visible-on-hover-enabled' : ''}${(animateOnHover == 1 && titleVisibleOnHover == 1) ? ' wprig-visible-on-hover' : ''}`}
                                                        value={title} />

                                                    {enableSubTitle == 1 &&
                                                        <RichText.Content
                                                            tagName='div'
                                                            className={`wprig-image-sub-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' wprig-visible-on-hover-enabled' : ''}${titleVisibleOnHover == 1 ? ' wprig-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' wprig-visible-on-hover' : ''}`}
                                                            value={subTitle} />
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {(layout == 'simple' && enableCaption == 1) &&
                                        <RichText.Content
                                            tagName='figcaption'
                                            className="wprig-image-caption"
                                            value={imageCaption} />
                                    }
                                </figure>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            attributes,
            save(props) {
                const {
                    attributes: {
                        uniqueId,
                        layout,
                        imageUrl,
                        image,
                        imageType,
                        image2x,
                        imgAlt,
                        externalImageUrl,
                        animateOnHover,
                        titleVisibleOnHover,
                        subTitleVisibleOnHover,
                        title,
                        titleLevel,
                        subTitle,
                        enableSubTitle,
                        imageCaption,
                        enableCaption,
                        contentAnimation,
                        contentVerticalAlign,
                        contentAlignment,
                        enableFrame,
                        frameAnimateOnHover,
                        interaction,
                        animation
                    }
                } = props

                const titleTagName = 'h' + titleLevel;
                const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
                const renderImage = () => {
                    return (
                        <Fragment>
                            {
                                (imageType === 'local' && image.url != undefined) ?
                                    <Fragment>
                                        {image2x.url != undefined ?
                                            <img className="wprig-image-image" src={image.url} srcset={image.url + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                            :
                                            <img className="wprig-image-image" src={image.url} alt={imgAlt && imgAlt} />
                                        }
                                    </Fragment>
                                    :
                                    (imageType === 'external' && externalImageUrl.url != undefined) ?
                                        <img className="wprig-image-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
                                        :
                                        <div className="wprig-image-image wprig-image-placeholder"><i className="far fa-image" /></div>
                            }
                        </Fragment>
                    )
                }
                return (

                    <div className={`wprig-block-${uniqueId}`}  {...animationAttr(animation)}>
                        <div className={`wprig-block-image ${interactionClass} wprig-image-layout-${layout}`}>
                            <div className={`wprig-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-type-' + contentAnimation : ''} wprig-vertical-alignment-${contentVerticalAlign} wprig-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' wprig-has-frame wprig-frame-animate-on-hover' : ' wprig-has-frame') : ''}`}>
                                <figure>
                                    <div className="wprig-image-container">
                                        {
                                            (imageUrl.url && layout === 'simple') ?
                                                <a href={imageUrl.url ? `//${imageUrl.url}` : '#'} {...(imageUrl.target && { target: '_blank' })} {...(imageUrl.nofollow ? { rel: 'nofollow noopener noreferrer' } : { ...imageUrl.target && { rel: 'noopener noreferrer' } })}>
                                                    {renderImage()}
                                                </a>
                                                : renderImage()
                                        }

                                        {layout == 'blurb' &&
                                            <div className="wprig-image-content">
                                                <div className="wprig-image-content-inner">
                                                    <RichText.Content
                                                        tagName={titleTagName}
                                                        className={`wprig-image-title${(animateOnHover == 1 && enableSubTitle == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' wprig-visible-on-hover-enabled' : ''}${(animateOnHover == 1 && titleVisibleOnHover == 1) ? ' wprig-visible-on-hover' : ''}`}
                                                        value={title} />

                                                    {enableSubTitle == 1 &&
                                                        <RichText.Content
                                                            tagName='div'
                                                            className={`wprig-image-sub-title${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' wprig-visible-on-hover-enabled' : ''}${titleVisibleOnHover == 1 ? ' wprig-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' wprig-visible-on-hover' : ''}`}
                                                            value={subTitle} />
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {(layout == 'simple' && enableCaption == 1) &&
                                        <RichText.Content
                                            tagName='figcaption'
                                            className="wprig-image-caption"
                                            value={imageCaption} />
                                    }
                                </figure>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    ]
});