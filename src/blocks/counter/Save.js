const { Component, Fragment } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
        const { uniqueId, counterLimit, counterDuration, postfix, prefix,color_scheme , animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>   
                <div className={`wprig-block-counter ${interactionClass}`}>
                    <div className={`wprig-block-counter-content ${color_scheme}`}>
                        {counterLimit > 0 &&
                            <Fragment>
                                {prefix &&
                                    <span className="wprig-block-counter-prefix">{prefix}</span>
                                }
                                <span className="wprig-block-counter-number" data-limit={counterLimit} data-start={0} data-counterDuration={counterDuration}>{0}</span>
                                {postfix &&
                                    <span className="wprig-block-counter-postfix">{postfix}</span>
                                }
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Save