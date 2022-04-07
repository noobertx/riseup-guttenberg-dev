import icons from '../../helpers/icons';
import classnames from 'classnames';
const { __ } = wp.i18n;
const {
    Fragment,
    Component,
    createRef
} = wp.element;

const { compose } = wp.compose;

const {
    withSelect,
    withDispatch
} = wp.data;

const {
    PanelBody,
    Toolbar,
    Tooltip
} = wp.components;

const {
    RichText,
    BlockControls,
    InspectorControls
} = wp.blockEditor;

const {
    Range,
    Select,
    IconList,
    Toggle,
    InspectorTab,
    InspectorTabs,
    withCSSGenerator,
    Inline: {
        InlineToolbar
    },
    globalSettings: {
        animationSettings,
        interactionSettings,
        globalSettingsPanel,
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    }
} = wp.wprigComponents;


class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            device: 'md',
            spacer: true
        };
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const {
            clientId,
            setAttributes,
            attributes: {
                uniqueId
            }
        } = this.props;

        const _client = clientId.substr(0, 6);
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }
    renderSeparator = () => {
        const {
			attributes: {
                separatorNumbers
			}
		} = this.props;
        return (
            Array(separatorNumbers).fill(0).map((title, index) => {
                return (<div className={`yani-divider-item`}></div>)
            })
        )
    }
    render() {

        const {
            name,
            clientId,
            attributes,
            removeBlock,
            setAttributes,
            updateBlockAttributes,
            buttonGroupAttributes,
            attributes: {
                
                iconName,
                uniqueId,
                separatorNumbers,
                enableLeftSeparator,
                enableRightSeparator,
                separatorStyle,
                textField,
                alignment,
                className,
                buttonSize,
                iconPosition,
                mainColor ,
                recreateStyles,
                parentClientId,
                iconGap,
                animation,
                interaction,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss,
            }
        } = this.props;

        const { device, currentTab } = this.state;

        const classNames = classnames(
            { [`yani-block-${uniqueId}`]: uniqueId },
            className
        );

        return (
            <Fragment>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key='style'>
                            <PanelBody title={__('Content')} initialOpen={false}>
                                <Range label={__('Number of Items')} value={separatorNumbers} onChange={value => setAttributes({ separatorNumbers: parseInt(value) })} min={1} max={3} />
                                <Toggle label={__('Show Separator Left')} value={enableLeftSeparator} onChange={value => setAttributes({ enableLeftSeparator: value })} />
                                <Toggle label={__('Show Separator Right')} value={enableRightSeparator} onChange={value => setAttributes({ enableRightSeparator: value })} />
                                <Select
                                    label={__('Separator Style')}
                                    options={[
                                        ['none','None'],
                                        ['style-1','Style 1'],
                                        ['style-2','Style 2'],
                                        ['style-3','Style 3'],
                                        ['style-4','Style 4'],
                                        ['style-5','Style 5'],
                                        ['style-6','Style 6'],
                                        ['style-7','Style 7'],
                                    ]}
                                    value={separatorStyle}
                                    onChange={(value) => setAttributes({ separatorStyle: value })} /> 
                            </PanelBody>
                            <PanelBody title={__('Design')} initialOpen={false}>
                                <Select
                                    label={__('mainColor')}
                                    options={[
                                        ['primary','Primary'],
                                        ['secondary','Secondary'],
                                        ['accent','Accent'],
                                        ['light dark','Light'],
                                        ['dark','Dark'],
                                        ['info','Info'],
                                        ['success','Success'],
                                        ['warning','Warning'],
                                        ['danger','Danger'],
                                    ]}
                                    value={mainColor}
                                    onChange={(value) => setAttributes({ mainColor: value })} /> 
                            </PanelBody>
                        
                            <PanelBody title={__('Icon')} initialOpen={false}>
                                <IconList
                                    label={__('Icon')}
                                    value={iconName}
                                    onChange={(value) => this.props.setAttributes({ iconName: value })} />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key='advance'>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}


                <div className={`${classNames} ` } >
                    <div className={`yani-divider-wrapper  yani-divider-wrapper--${alignment.md} `} onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}>
                        
                        <div className={`yani-divider yani-divider--${separatorStyle} ${mainColor}`}>
                            {enableLeftSeparator && 
                                <Fragment>
                                    <div className={`yani-divider-item-wrap yani-divider-item-wrap--left`}>
                                        {this.renderSeparator()}
                                    </div>
                                </Fragment>
                            }
                            <div classname={`yani-divider-content`}>
                            <i className={`yani-btn-icon ${iconName}`} />
                            <RichText
                                tagName='div'
                                keepPlaceholderOnFocus
                                className="yani-button-text"
                                placeholder={__('Add Text...')}
                                value={textField}
                                onChange={value => setAttributes({ textField: value })}
                            />
                            </div>
                            {enableRightSeparator && 
                                <Fragment>
                                    <div className={`yani-divider-item-wrap yani-divider-item-wrap--right`}>
                                        {this.renderSeparator()}
                                    </div>
                                </Fragment>
                            }
                        </div>

                        <div
                            ref={this.wprigContextMenu}
                            className={`yani-context-menu-wraper`}
                        >
                            <ContextMenu
                                name={name}
                                clientId={clientId}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                wprigContextMenu={this.wprigContextMenu.current}
                            />
                        </div>

                    </div>
                </div>

            </Fragment>
        )
    }
}
export default compose([
    withSelect((select, ownProps) => {
        const { parentClientId } = ownProps.attributes
        const { getBlockAttributes } = select('core/block-editor');
        return { buttonGroupAttributes: getBlockAttributes(parentClientId) }
    }),
    withDispatch((dispatch) => {
        const { removeBlock, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            removeBlock,
            updateBlockAttributes
        }
    }),
    withCSSGenerator()
])(Edit)
