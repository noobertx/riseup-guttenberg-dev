const { Component } = wp.element;
const { InnerBlocks, RichText } = wp.blockEditor;
const { HelperFunction: { animationAttr } } = wp.wprigComponents
class Save extends Component {
    render() {
        const { uniqueId, itemNumber, heading, panelIcon, iconPosition, fillType, animation, openFirstItem, richSnippet = undefined } = this.props.attributes;
        const className = `wprig-accordion-item wprig-type-${fillType} ${openFirstItem && itemNumber == 0 && 'wprig-accordion-active'}`;

        const mainEntryProp = richSnippet ? {
            itemscope: true,
            itemprop: "mainEntity",
            itemtype: "https://schema.org/Question"
        } : {}

        const itemPropName = richSnippet ? {
            itemprop: "name"
        } : {}

        const itemPropAnswer = richSnippet ? {
            itemscope: true,
            itemprop: "acceptedAnswer",
            itemtype: "https://schema.org/Answer"
        } : {}

        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div
                    {...(typeof richSnippet !== 'undefined' && mainEntryProp)}
                    className={className}>
                    <div className={`wprig-accordion-panel ${panelIcon && 'wprig-icon-position-' + iconPosition}`}>
                        <span className="wprig-accordion-panel-handler" role="button">
                            {(panelIcon && iconPosition == 'left') && <span className={`wprig-accordion-icon ${panelIcon}`} />}
                            <RichText.Content {...(typeof richSnippet !== 'undefined' && itemPropName)} tagName="span" className="wprig-accordion-panel-handler-label" value={heading} />
                            {(panelIcon && iconPosition == 'right') && <span className={`wprig-accordion-icon ${panelIcon}`} />}
                        </span>
                    </div>
                    <div
                        {...(typeof richSnippet !== 'undefined' && itemPropAnswer)}
                        className="wprig-accordion-body"
                        style={(openFirstItem && itemNumber == 0) ? { 'display': 'block' } : {}}
                    >
                        {
                            typeof richSnippet !== 'undefined' ?
                                <div itemprop="text">
                                    <InnerBlocks.Content />
                                </div>
                                :
                                <InnerBlocks.Content />
                        }

                    </div>
                </div>
            </div>
        );
    }
}
export default Save