import classnames from 'classnames';
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
class Save extends Component {
    render() {
        const {
            attributes: {
                uniqueId,
                id,
                color_scheme ,
                customClassName
            }
        } = this.props;

        return (
            <div className={`wprig-block-${uniqueId} ${customClassName} ${color_scheme}` }>
                <InnerBlocks.Content />
            </div>
        );
    }
}
export default Save;