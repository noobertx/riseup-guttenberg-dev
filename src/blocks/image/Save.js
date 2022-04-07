const { Component, Fragment } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.wprigComponents

class Save extends Component {

    renderImage = () => {
        const { attributes: { image, imageType, image2x, imgAlt, externalImageUrl } } = this.props
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

    render() {
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
                animation
            }
        } = this.props

        const titleTagName = 'h' + titleLevel;
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        let ContainerTag = 'div';
        if (layout === 'blurb') {
            ContainerTag = 'a';
        }
        return (
            <div className={`wprig-block-${uniqueId}`}  {...animationAttr(animation)}>
                <div className={`wprig-block-image ${interactionClass} wprig-image-layout-${layout}`}>
                    <div className={`wprig-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' wprig-hover-animation-type-' + contentAnimation : ''} wprig-vertical-alignment-${contentVerticalAlign} wprig-horizontal-alignment-${contentAlignment}${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' wprig-has-frame wprig-frame-animate-on-hover' : ' wprig-has-frame') : ''}`}>
                        <figure>
                            <ContainerTag
                                className="wprig-image-container"
                                {...(layout === 'blurb') && {
                                    href: imageUrl.url ? `${imageUrl.url}` : '#',
                                    ...(imageUrl.target && { target: '_blank' }),
                                    ...(imageUrl.nofollow ?
                                        { rel: 'nofollow noopener noreferrer' }
                                        :
                                        { ...imageUrl.target && { rel: 'noopener noreferrer' } })
                                }}
                            >
                                {
                                    (imageUrl.url && layout === 'simple') ?
                                        <a href={imageUrl.url ? `${imageUrl.url}` : '#'} {...(imageUrl.target && { target: '_blank' })} {...(imageUrl.nofollow ? { rel: 'nofollow noopener noreferrer' } : { ...imageUrl.target && { rel: 'noopener noreferrer' } })}>
                                            {this.renderImage()}
                                        </a>
                                        : this.renderImage()
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
                            </ContainerTag>

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

export default Save;