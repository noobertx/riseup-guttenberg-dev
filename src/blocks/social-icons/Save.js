const { Component } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {
    render() {
        const { uniqueId, socialIcons, iconLabel, layout, useDefaultStyle, animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-social-icons ${interactionClass} wprig-layout-${layout} wprig-style-${useDefaultStyle ? 'default' : 'custom'}`}>
                    <ul className="wprig-ul">
                        {socialIcons.map((item, index) =>
                            <li key={index} className={`wprig-li wprig-social-item wprig-social-${item.id}`} arealabel={item.label}>
                                <a href={item.url || "#"} target="_blank" rel="nofollow noopener noreferrer">
                                    <i className={"wprig-social-icon " + item.icon} />
                                    {(iconLabel && item.label) && <span className="wprig-social-label">{item.label}</span>}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default Save;