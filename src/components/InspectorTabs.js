import './css/inspectorTabs.scss';
import classnames from 'classnames';
const { __ } = wp.i18n;
const { Fragment, cloneElement, Children } = wp.element;
const { Tooltip } = wp.components;

const { useState, useRef, useEffect } = wp.element,
    LAYOUT = 'layout',
    CONTENT = 'content',
    QUERY = 'query',
    STYLE = 'style',
    NORMAL = 'normal',
    HOVER = 'hover',
    ADVANCE = 'advance';


const InspectorTabs = props => {
    const { defaultTab, children, tabs } = props,
        [currentTab, setCurrentTab] = useState(defaultTab ? defaultTab : tabs[0]),
        tabContainer = useRef(),
        offset = useRef(undefined);

    let sidebarPanel;

    useEffect(() => {
        sidebarPanel = tabContainer.current.closest('.components-panel');
    });

    const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('wprig-is-sticky', e.intersectionRatio < 1), { threshold: [1] });

    // component did mount
    useEffect(() => {
        // sticky tabs menu
        const container = document.querySelector('.wprig-inspector-tabs-container');
        if (container) {
            observer.observe(container);
        }

        // component will unmount
        return () => {
            sidebarPanel && sidebarPanel.removeAttribute('data-wprig-tab');
        }
    }, []);

    useEffect(() => {

        sidebarPanel && sidebarPanel.setAttribute('data-wprig-tab', defaultTab)
    }, [defaultTab]);

    const _onTabChange = tab => {
        setCurrentTab(tab);
        sidebarPanel && sidebarPanel.setAttribute('data-wprig-tab', tab);
    };

    return (
        <Fragment>
            <div className={'wprig-inspector-tabs-container'}>
                {
                    /*
                     * The tabs is static, you must use layout, style & advance
                     */
                }
                <div ref={tabContainer} className={classnames(
                    'wprig-inspector-tabs',
                    'wprig-inspector-tabs-count-' + tabs.length,
                    currentTab
                )}>
                    {/* {
                        tabs.indexOf(LAYOUT) > -1 && (
                            <Tooltip text={__('Layout')}>
                                <button className={classnames({ 'wprig-active': currentTab === LAYOUT })} onClick={() => _onTabChange(LAYOUT)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15"><path fill="#565D66" fill-rule="nonzero" d="M14.346 0H1.654C1.017 0 .5.517.5 1.154v12.692C.5 14.483 1.017 15 1.654 15h12.692c.637 0 1.154-.517 1.154-1.154V1.154C15.5.517 14.983 0 14.346 0zm-5.77 13.846v-5.77h5.77v5.77h-5.77z" /></svg>
                                    <h5>{__('Layout')}</h5>
                                </button>
                            </Tooltip>
                        )
                    } */}
                    {
                        tabs.indexOf(NORMAL) > -1 && (
                            <Tooltip text={__('Normal')}>
                                <button className={classnames({ 'wprig-active': currentTab === NORMAL })} onClick={() => _onTabChange(NORMAL)}>
                                    
                                    <h5>{__('Normal')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }

                    {
                        tabs.indexOf(QUERY) > -1 && (
                            <Tooltip text={__('Query')}>
                                <button className={classnames({ 'wprig-active': currentTab === QUERY })} onClick={() => _onTabChange(QUERY)}>
                                    
                                    <h5>{__('Query')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }

                    {
                        tabs.indexOf(CONTENT) > -1 && (
                            <Tooltip text={__('Content')}>
                                <button className={classnames({ 'wprig-active': currentTab === CONTENT })} onClick={() => _onTabChange(CONTENT)}>
                                    
                                    <h5>{__('Content')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }
                    
                    {
                        tabs.indexOf(HOVER) > -1 && (
                            <Tooltip text={__('Hover')}>
                                <button className={classnames({ 'wprig-active': currentTab === HOVER })} onClick={() => _onTabChange(HOVER)}>
                                   
                                    <h5>{__('Hover')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }

                    {
                        tabs.indexOf(STYLE) > -1 && (
                            <Tooltip text={__('Style')}>
                                <button className={classnames({ 'wprig-active': currentTab === STYLE })} onClick={() => _onTabChange(STYLE)}>
                                   
                                    <h5>{__('Style')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }

                    {
                        tabs.indexOf(ADVANCE) > -1 && (
                            <Tooltip text={__('Advanced')}>
                                <button className={classnames({ 'wprig-active': currentTab === ADVANCE })} onClick={() => _onTabChange(ADVANCE)}>
                                    
                                    <h5>{__('Advanced')}</h5>
                                </button>
                            </Tooltip>
                        )
                    }
                </div>
            </div>
            {
                Array.isArray(children) && Children.map(children, (child, index) => {
                    if (!child.key) {
                        throw new Error('props.key not found in <InspectorTab />, you must use `key` prop');
                        return;
                    }
                    return cloneElement(child, {
                        index,
                        isActive: child.key === currentTab
                    })

                })
            }
        </Fragment>
    )
};

InspectorTabs.defaultProps = {
    defaultTab: null,
    tabs: ['layout', 'normal', 'hover', 'style', 'advance']
}

export default InspectorTabs;