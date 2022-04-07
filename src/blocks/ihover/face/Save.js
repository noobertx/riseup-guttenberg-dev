import classnames from 'classnames';
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
class Save extends Component {
    render() {
        const {
            attributes: {
                uniqueId,
                id,
                customClassName
            }
        } = this.props;

        return (
            <div className={`wprig-block-${uniqueId} ${customClassName}` }>
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;