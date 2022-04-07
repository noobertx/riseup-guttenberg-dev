import icons from './icon';
const { Component } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

class Save extends Component {
    render() {
        const { uniqueId, style, animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'wprig-block-interaction' : '';
        return (
            <div className= {`wprig-block-${uniqueId}`} {...animationAttr(animation)}>   
                <div className= {`wprig-block-divider ${interactionClass}`}>
                    { ((style == 'fill') || (style == 'dot') || (style == 'dash')) ?
                        <div className= { `wprig-block-divider-style-${style}` } />
                        :
                        icons[style]
                    }
                </div>
            </div>
        )
    }
}
export default Save