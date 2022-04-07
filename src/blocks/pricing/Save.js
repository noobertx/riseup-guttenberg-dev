const { Component, Fragment } = wp.element
const { RichText } = wp.blockEditor
const { wprigButtonSave, wprigIconListSave } = wp.wprigComponents
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

class Save extends Component {


    renderPricingTitle = () => {
        const { attributes: { title } } = this.props
        return (
            <Fragment>
                <span className="wprig-pricing-title-wrapper">
                    <RichText.Content className="wprig-pricing-title" tagName="div" value={title} />
                </span>
            </Fragment>
        )
    }

    renderPricingSubTitle = () => {
        const { attributes: { subTitle } } = this.props
        return (
            <div className="wprig-sub-title-wrapper" >
                <RichText.Content className="wprig-sub-title" tagName="div" value={subTitle} />
            </div>
        )
    }

    renderPricingPrice = () => {
        const { attributes: { currencyPosition, discount, discountPrice, price, enableDuration, durationPosition } } = this.props
        return (
            <div className="wprig-pricing-wrapper" >
                {currencyPosition == 'before' && this.renderCurrencyContent()}
                <span className="wprig-pricing-price">
                    {discount && <strike>{discountPrice}</strike>}
                    {price}
                </span>
                {currencyPosition == 'after' && this.renderCurrencyContent()}
                {enableDuration && durationPosition == 'side' && this.renderDuration()}
            </div>
        )
    }


    renderDuration = () => {
        const { attributes: { duration } } = this.props
        return (
            <span className="wprig-pricing-duration">
                <RichText.Content className="wprig-product-duration" tagName="div" value={duration} />
            </span>
        )
    }
    renderCurrencyContent = () => {
        const { attributes: { currency, currencyCustom } } = this.props
        return (<span className="wprig-pricing-currency">{currency == 'custom' ? currencyCustom : currency}</span>)
    }


    renderPricingButton = () => {
        const { attributes: { enableButton, buttonUrl, buttonFillType, buttonSize, buttonText, buttonIconName, buttonIconPosition, buttonTag, enablePostButtonText, postButtonText } } = this.props

        return (
            <div className={`wprig-pricing-button`} >
                <wprigButtonSave
                    buttonFillType={buttonFillType}
                    buttonSize={buttonSize}
                    buttonText={buttonText}
                    buttonIconName={buttonIconName}
                    buttonIconPosition={buttonIconPosition}
                    buttonTag='a'
                    buttonUrl={buttonUrl}
                />
                {
                    enablePostButtonText &&
                    <div className="wprig-pricing-postbutton-text">
                        <span className="wprig-pricing-post-button-text">{postButtonText} </span>
                    </div>
                }
            </div>
        )
    }
    renderPricingContent = () => {
        const { attributes: { currencyPosition, discount, discountPrice, price, enableDuration, durationPosition } } = this.props
        return (
            <div className="wprig-pricing-wrapper" >
                {currencyPosition == 'before' && this.renderCurrencyContent()}
                <span className="wprig-pricing-price" >
                    {discount && <strike>{discountPrice}</strike>}
                    {price}
                </span>
                {currencyPosition == 'after' && this.renderCurrencyContent()}
                {enableDuration && durationPosition == 'side' && this.renderDuration()}
            </div>
        )
    }

    render() {
        const { uniqueId, listAlignment, listItems, layout, iconColor, enableListIcons, enableDuration, durationPosition, enableFeatures, iconPosition, enableBadge, badge, badgeStyle, badgeSize, animation, interaction } = this.props.attributes

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-pricing ${interactionClass}`}>
                    {enableBadge && <span className={`wprig-pricing-badge wprig-badge-style-${badgeStyle} wprig-badge-size-${badgeSize}`}><span>{badge}</span></span>}
                    <div className="wprig-block-pricing-content">
                        <div className="wprig-block-pricing-header">
                            {this.renderPricingTitle()}

                            {(layout == 3 || layout == 4) &&
                                this.renderPricingSubTitle()
                            }

                            {this.renderPricingPrice()}
                            {enableDuration && durationPosition == 'bottom' && this.renderDuration()}

                            {(layout == 2) &&
                                this.renderPricingSubTitle()
                            }
                        </div>

                        {(layout == 4) &&
                            this.renderPricingButton()
                        }

                        {
                            enableFeatures &&
                            <div className={`wprig-pricing-features wprig-alignment-${listAlignment}`} >
                                <wprigIconListSave
                                    listItems={listItems}
                                    enableListIcons={enableListIcons}
                                    iconColor={iconColor}
                                    iconPosition={iconPosition}
                                    listWrapperClassName={`wprig-list icon-position-${iconPosition}`}
                                />
                            </div>
                        }

                        {(layout == 1 || layout == 2 || layout == 3 || layout == 5) &&
                            this.renderPricingButton()
                        }

                    </div>
                </div>
            </div>
        )
    }
}
export default Save