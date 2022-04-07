const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor
import svg from './separators';
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents

class Save extends Component {

    renderSeparators = () => {
        const { attributes: { separatorStyle } } = this.props
        const separators = {
            solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
            double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
            dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
            dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
            pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
            pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
            zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
            zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
        }
        return (
            <Fragment>
                {separators[separatorStyle].type == 'css' &&
                    <span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`}/>
                }
                {separators[separatorStyle].type == 'svg' &&
                    <span className={`wprig-separator-type-svg wprig-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
                }
            </Fragment>
        )
    }
    rendeSubHeading = () => {
        const { subHeading, subHeadingLevel, subHeadingContent } = this.props.attributes

        if (subHeading) {
            const subSubTagName = 'h' + subHeadingLevel;
            return (
                <RichText.Content
                    tagName={subSubTagName}
                    className="wprig-sub-heading-selector"
                    value={subHeadingContent} />
            )
        } else return null
    }


    render() {
        const { uniqueId, content, selector, separatorStyle, separatorPosition, subHeadingPosition, animation, interaction } = this.props.attributes
        const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
        return (
            <div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)} >
                <div className={`wprig-block-heading ${interactionClass} ${separatorStyle ? 'wprig-has-separator wprig-separator-position-' + separatorPosition : ''}`}>
                    {subHeadingPosition == 'before_title' && this.rendeSubHeading()}
                    <div className="wprig-heading-container">
                        {(separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright')) && <div className="wprig-separator wprig-separator-before">{this.renderSeparators()}</div>}
                        <RichText.Content tagName={selector} className="wprig-heading-selector" value={content} />
                        {(separatorStyle && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright')) && <div className="wprig-separator wprig-separator-after">{this.renderSeparators()}</div>}
                    </div>
                    {subHeadingPosition == 'after_title' && this.rendeSubHeading()}
                </div>
            </div>
        )
    }
}
export default Save