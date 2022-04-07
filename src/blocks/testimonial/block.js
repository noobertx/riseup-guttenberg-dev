import './style.scss'
import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.wprigComponents;


registerBlockType('wprig/testimonial', {
    title: __('Testimonial', 'wprig'),
    description: 'Display client feedbacks with wprig Testimonials.',
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    keywords: [
        __('testimonial', 'wprig'),
        __('Quote', 'wprig'),
        __('Ratings', 'wprig')
    ],
    supports: {
        align: [
            'center',
            'wide',
            'full'
        ]
    },
    example: {
        attributes: {},
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
                    }
                } = props;

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
                                <div
                                    data-wprigrating={ratings}
                                    className="wprig-testimonial-ratings"
                                    onClick={() => this.handlePanelOpenings('Ratings')}
                                />
                            }

                            {(quoteIcon && (layout == 1)) &&
                                <div className="wprig-testimonial-quote">
                                    <span className={`wprig-quote-icon ${quoteIcon}`} />
                                </div>
                            }

                            <div className="wprig-testimonial-content">{testimonialMessage}</div>

                            {(showRatings && ratings > 0 && layout == 1) &&
                                <div
                                    data-wprigrating={ratings}
                                    className="wprig-testimonial-ratings"
                                    onClick={() => this.handlePanelOpenings('Ratings')} />
                            }

                            {layout == 1 && authorInfo}

                            {(quoteIcon && (layout == 2)) &&
                                <div className="wprig-testimonial-quote wprig-position-bottom">
                                    <span className={`wprig-quote-icon ${quoteIcon}`} />
                                </div>
                            }

                        </div>
                    </div>
                );
            }
        }
    ]
});
