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
                animation,
                interaction
            }
        } = this.props;

        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

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
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-tab ${interactionClass} wprig-tab-style-${tabStyle}`}>
                    <div className={`wprig-tab-nav wprig-alignment-${navAlignment}`}>
                        {renderTabTitles()}
                    </div>
                    <div className={`wprig-tab-body`}>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );
    }
}
export default Save;