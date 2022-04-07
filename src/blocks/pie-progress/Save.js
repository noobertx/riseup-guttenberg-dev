import Progress from './Progress'
const { Fragment } = wp.element;
const { __ } = wp.i18n
const { RichText } = wp.blockEditor;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

const Save = (props) => {
    const {
        uniqueId,
        progress,
        size,
        layout,
        corner,
        enableIcon,
        iconStyle,
        iconText,
        iconName,
        image,
        image2x,
        imageAlt,
        enableHeading,
        headingPosition,
        heading,
        animation,
        interaction,
        thickness,
        thicknessBg,
        background,
        fillColor,
        circleShadow,
        progressShadow,
        circleShrink,
        speed
    } = props.attributes


    const thicknessCalc = {
        fill: (size / 2),
        outline: (size * (thickness * .5)) / 100,
        outline_fill: (size * (thickness * .5)) / 100,
    }

    const thicknessBgCalc = {
        fill: size / 2,
        outline: (size * (thicknessBg * .5)) / 100,
        outline_fill: (size * (thickness * .5)) / 100
    }

    const progressAttr = {
        size,
        layout,
        corner: layout === 'fill' ? 'unset' : corner,
        uniqueId,
        percent: progress,
        thickness: thicknessCalc[layout],
        thicknessBg: thicknessBgCalc[layout],
        emptyFill: background,
        fill: fillColor,
        circleShadow,
        progressShadow,
        circleShrink: ((size - thickness) * .5) * circleShrink / 100,
        isSaveMode: parseInt(speed) > 0,
        duration: speed
    }
    const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
    return (
        <div className={`wprig-block-${uniqueId} wprig-block-pie-progress ${interactionClass}`} {...animationAttr(animation)}>
            <div className="wprig-progress-parent">
                <Progress {...progressAttr} />
                {(enableIcon || enableHeading) && (
                    <div className="wprig-progress-inner-text">
                        {
                            enableIcon && (
                                <Fragment>
                                    {iconStyle === 'text' && (
                                        <RichText.Content
                                            tagName="div"
                                            value={iconText}
                                        />
                                    )}
                                    {iconStyle === 'percent' && (
                                        <div>
                                            <span className='wprig-pie-counter'>{progress}</span>%
                                        </div>
                                    )}
                                    {iconStyle === 'icon' && (
                                        <span className={`wprig-pie-icon ${iconName}`} />
                                    )}
                                    {iconStyle === 'image' && (
                                        <div className={'icon-image ' + (image.url === undefined && 'pie-placeholder')}>
                                            {
                                                image.url !== undefined ? (
                                                    <img
                                                        className="wprig-pie-image"
                                                        src={image.url}
                                                        alt={imageAlt && imageAlt}
                                                        srcSet={image2x.url !== undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''}
                                                    />
                                                ) : (
                                                    <span className="wprig-pie-placeholder far fa-image" />
                                                )
                                            }
                                        </div>
                                    )}
                                </Fragment>
                            )
                        }

                        {(enableHeading && headingPosition === 'inside') && (
                            <RichText.Content
                                tagName="div"
                                value={heading}
                                className="wprig-pie-progress-heading"
                            />
                        )}
                    </div>
                )}
            </div>


            {(enableHeading && headingPosition === 'outside') && (
                <RichText.Content
                    tagName="div"
                    value={heading}
                    className="wprig-pie-progress-heading wprig-outside"
                />
            )}
        </div>
    )
}

export default Save
