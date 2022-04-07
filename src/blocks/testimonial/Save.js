const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.wprigComponents;

class Save extends Component {
    render() {
        const {
            uniqueId,
            layout,
            animation,
            message,
            name,
            designation,
            showAvatar,
            avatar,
            avatar2x,
            avatarAlt,
            avatarLayout,
            quoteIcon,
            showRatings,
            ratings,
            interaction
        } = this.props.attributes;
        
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        const testimonialTitle = <RichText.Content tagName="span" value={name} />
        const testimonialDesignation = <RichText.Content tagName="span" value={designation} />
        const testimonialMessage = <RichText.Content tagName="div" value={message} />

        const authorInfo = <Fragment>
            <div className={`wprig-testimonial-author`}>
                <div className={showAvatar ? `wprig-testimonial-avatar-layout-${avatarLayout}` : ``}>
                    {showAvatar && (avatarLayout == 'left' || avatarLayout == 'top') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="wprig-testimonial-avatar" src={avatar.url} srcset={avatar2x.url != undefined ? avatar.url + ' 1x, ' + avatar2x.url + ' 2x' : ''} alt={avatarAlt} />
                                :
                                <div className="wprig-image-placeholder wprig-testimonial-avatar"><i className="far fa-user" /></div>
                            }
                        </Fragment>
                    }

                    <div className="wprig-testimonial-author-info">
                        <div className="wprig-testimonial-author-name">{testimonialTitle}</div>
                        <div className="wprig-testimonial-author-designation">{testimonialDesignation}</div>
                    </div>

                    {showAvatar && (avatarLayout == 'right' || avatarLayout == 'bottom') &&
                        <Fragment>
                            {avatar.url != undefined ?
                                <img className="wprig-testimonial-avatar" src={avatar.url} srcset={avatar2x.url != undefined ? avatar.url + ' 1x, ' + avatar2x.url + ' 2x' : ''} alt={avatarAlt} />
                                :
                                <div className="wprig-image-placeholder wprig-testimonial-avatar"><i className="far fa-user" /></div>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>

        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-testimonial ${interactionClass}`}>

                    {layout == 2 && authorInfo}

                    {(showRatings && ratings > 0 && layout == 2) &&
                        <div className="wprig-testimonial-ratings" style={{ '--wprig-testimonial-rating': `${ratings * 20}%` }}></div>
                    }

                    {(quoteIcon && (layout == 1)) &&
                        <div className="wprig-testimonial-quote">
                            <span className={`wprig-quote-icon ${quoteIcon}`} />
                        </div>
                    }

                    <div className="wprig-testimonial-content">
                        {testimonialMessage}
                    </div>

                    {(showRatings && ratings > 0 && layout == 1) &&
                        <div className="wprig-testimonial-ratings" style={{ '--wprig-testimonial-rating': `${ratings * 20}%` }}></div>
                    }

                    {layout == 1 && authorInfo}

                    {(quoteIcon && (layout == 2)) &&
                        <div className="wprig-testimonial-quote wprig-position-bottom">
                            <span className={`wprig-quote-icon ${quoteIcon}`} />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export default Save;