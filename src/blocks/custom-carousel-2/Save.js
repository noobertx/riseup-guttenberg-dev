const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.wprigComponents;

class Save extends Component {

    render() {
        const {
            attributes: {
                uniqueId,
                tabStyle,
                tabTitles,
                iconPosition,
                navAlignment,
                items,
				slidesToScroll,
				showDots,
				showArrows,
				isInfinite,
				enableFading,
				enableAutoplay,
				autoplaySpeed,
				enableAdaptiveHeight,
                speed,
                animation,
                interaction
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        const slideOptions = {
            slidesToShow: items,
            slidesToScroll: slidesToScroll,
            dots: showDots,
            arrows: showArrows,
            infinite: isInfinite,
            autoplay: enableAutoplay,
            autoplaySpeed: autoplaySpeed,
            fade: enableFading,
            adaptiveHeight: enableAdaptiveHeight,
            speed:speed
        };

        const renderTabTitles = () => {
            return tabTitles.map((title, index) =>
                <span className={`wprig-tab-item ${(index == 0) ? 'wprig-active' : ''}`}>
                    <span class={`wprig-tab-title ${title.iconName ? 'wprig-has-icon-' + iconPosition : ''}`} role="button">
                        {title.iconName && (iconPosition == 'top' || iconPosition == 'left') && (<i className={`wprig-tab-icon ${title.iconName}`} />)}
                        {title.title}
                        {title.iconName && (iconPosition == 'right') && (<i className={`wprig-tab-icon ${title.iconName}`} />)}
                    </span>
                </span>
            );
        }
        return (
            <div className={`wprig-slick wprig-block-${uniqueId}`} {...animationAttr(animation)} data-slick={JSON.stringify(slideOptions)} style="opacity:0;">                 
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;