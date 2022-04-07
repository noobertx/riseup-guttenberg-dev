const { Component } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { IsInteraction, animationAttr } } = wp.wprigComponents

class Save extends Component {

    renderListItems = () => {
        const { attributes: { listItems, iconPosition } } = this.props
        return listItems.map((item, index) => {
            return (
                <li className={`wprig-list-li`}>
                    {iconPosition == 'left' && <span className={`wprig-list-item-icon ${item.icon} fa-fw`} />}
                    <RichText.Content tagName="span" value={item.text} />
                    {iconPosition == 'right' && <span className={`wprig-list-item-icon ${item.icon} fa-fw`} />}
                </li>
            )
        })

    }

    render() {
        const { attributes: { uniqueId, interaction, animation } } = this.props
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-icon-list wprig-block-icon-list-connector ${interactionClass}`}>
                    <ul className="wprig-list">
                        {this.renderListItems()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Save;