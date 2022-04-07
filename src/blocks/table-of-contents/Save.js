import classnames from 'classnames';
import { TableOfContents } from './components';
import {Fragment} from 'react';
const { Component } = wp.element;
const { RichText } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        IsInteraction
    }
} = wp.wprigComponents;

class Save extends Component {

    render() {
        const {
            uniqueId,
            align,
            showTitle,
            scrollToTop,
            title,
            headerLinks,
            animation,
            interaction,
            isCollapsed,
            collapsibleAlignment,
            minimizeBox,
            collapsibleType,
            collapsibleOpen,
            collapsibleIcon,
            collapsibleClose,
            scrollOffset,
            backToTopIcon
        } = this.props.attributes


        const classes = classnames(
            `wprig-block-${uniqueId}`,
            'wprig-block-table-of-contents',
            `wprig-align-${align}`,
        );

        const tocClasses = classnames([
            'wprig-table-of-contents',
            ...(IsInteraction(interaction) ? ['qubley-block-interaction'] : []),
            ...(isCollapsed ? ['wprig-toc-collapsed'] : [])
        ]);


        const currentIconClass = {};
        switch(collapsibleIcon) {
            case 'chevron-cirlce':
                currentIconClass.open = 'fas fa-chevron-circle-up';
                currentIconClass.close = 'fas fa-chevron-circle-down';
                break;
            case 'plus':
                currentIconClass.open = 'fas fa-plus';
                currentIconClass.close = 'fas fa-minus';
                break;
            case 'plus-square':
                currentIconClass.open = 'fas fa-plus-square';
                currentIconClass.close = 'fas fa-minus-square';
                break;
            default:
                currentIconClass.open = 'fas fa-angle-up';
                currentIconClass.close = 'fas fa-angle-down';
        }

        return (
            <div className={classes} {...animationAttr(animation)}>
                <div className={tocClasses} data-scroll-offset={scrollOffset}>
                    <div className={classnames([
                        'wprig-table-of-contents-header',
                        'wprig-toc-header-frontend',
                        collapsibleAlignment
                    ])}>
                        {
                            showTitle && (
                                <div className="wprig-table-of-contents-heading">
                                    <RichText.Content
                                        tagName='div'
                                        className='title'
                                        value={title}
                                    />
                                </div>
                            )
                        }
                        {
                            minimizeBox && (
                                <div className={`wprig-table-of-contents-toggle ${isCollapsed ? 'wprig-toc-collapsed': ''}`}>
                                    {
                                        collapsibleType !== 'icon' ? (
                                            <Fragment>
                                                <a className='wprig-collapsible-text wprig-toc-close-text' href='javascript:;'>{collapsibleOpen}</a>
                                                <a className='wprig-collapsible-text wprig-toc-open-text' href='javascript:;'>{collapsibleClose}</a>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <a href="javascript:;" className={classnames([
                                                    'wprig-collapsible-icon wprig-toc-close-icon',
                                                    currentIconClass.close
                                                ])} />
                                                <a href="javascript:;" className={classnames([
                                                    'wprig-collapsible-icon wprig-toc-open-icon',
                                                    currentIconClass.open
                                                ])} />
                                            </Fragment>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div className="wprig-table-of-contents-body">
                        <TableOfContents
                            headers={headerLinks && JSON.parse(headerLinks)}
                            blockProp={this.props}
                            frontend
                        />
                    </div>
                    {
                        scrollToTop !== false && (
                            <a href="#" className={`wprig-back-to-top-button ${backToTopIcon}`} />
                        )
                    }
                </div>
            </div>
        )
    }
}
export default Save