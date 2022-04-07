const { Component } = wp.element;
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

class Save extends Component {
    renderListItems = () => {
        const { attributes: { listItems } } = this.props

        return listItems.map(item => <li>{item}</li>)

    }
    render() {
        const { attributes: { uniqueId, alignment, bulletStyle, listType, animation, interaction } } = this.props
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        const ListTag = listType == 'ordered' ? 'ol' : 'ul'
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
                <div className={`wprig-block-advanced-list ${interactionClass} wprig-alignment-${alignment}`}>
                    <ListTag className={`wprig-list wprig-list-type-${listType} wprig-list-bullet-${bulletStyle.name}`}>
                        {this.renderListItems()}
                    </ListTag>
                </div>
            </div>
        );
    }
}

export default Save;