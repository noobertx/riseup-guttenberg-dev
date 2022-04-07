import classnames from 'classnames';
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { PanelBody } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const {
    Range,
    Alignment,
    globalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents;

const UI_PARTS = {
    hasSelectedUI: false
};

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md'
        }
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

    render() {
        const {
            block,
            clientId,
            setAttributes,
            updateBlockAttributes,
            attributes: {
                uniqueId,
                className,
                alignment,
                buttons,
                spacing,
                padding,
                interaction,
                //animation
                animation,
                //global
                globalZindex,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                hideTablet,
                hideMobile,
                globalCss
            }
        } = this.props;

        const { device } = this.state;

        const { getBlockOrder } = wp.data.select('core/block-editor'),
            hasChildBlocks = getBlockOrder(clientId).length > 0,
            classes = classnames(
                { [`wprig-block-${uniqueId}`]: uniqueId },
                className
            );
        let index = 0;
        while (index < buttons) {
            block.innerBlocks[index] && updateBlockAttributes(block.innerBlocks[index].clientId, Object.assign(block.innerBlocks[index].attributes, { parentClientId: clientId }))
            index++
        }

    
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title="" initialOpen={true}>
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} flex disableJustify responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                <Range
                                    min={0}
                                    max={300}
                                    responsive
                                    device={device}
                                    value={spacing}
                                    unit={['px', 'em', '%']}
                                    label={__('Spacing')}
                                    onChange={value => setAttributes({ spacing: value })}
                                    onDeviceChange={value => this.setState({ device: value })}
                                />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={classes}>
                    <div className={`wprig-block-button-group wprig-backend`}>
                        <InnerBlocks
                            tagName="div"
                            className=""
                            template={
                                Array(2).fill(0).map(() => ['wprig/button',
                                    {
                                        buttonGroup: true,
                                        parentClientId: clientId,
                                        enableAlignment: false,
                                        customClassName: 'wprig-group-button',
                                        spacer: {
                                            spaceTop: {
                                                md: '10',
                                                unit: "px"
                                            },
                                            spaceBottom: {
                                                md: '10',
                                                unit: "px"
                                            }
                                        }
                                    }
                                ])}
                            templateLock={false}
                            renderAppender={false}
                            __experimentalUIParts={UI_PARTS}
                            __experimentalMoverDirection="horizontal"
                            allowedBlocks={['wprig/button']}
                            renderAppender={(
                                hasChildBlocks ?
                                    undefined :
                                    () => <InnerBlocks.ButtonBlockAppender />
                            )}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default compose([
    withSelect((select, ownProps) => {
        const { clientId } = ownProps;
        const { getBlock } = select('core/block-editor');
        return {
            block: getBlock(clientId)
        };
    }),
    withDispatch((dispatch) => {
        const { updateBlockAttributes } = dispatch('core/block-editor');
        return {
            updateBlockAttributes
        }
    }),
    withCSSGenerator()
])(Edit);