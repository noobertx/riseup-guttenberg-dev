const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Toolbar, Tooltip, Dropdown } = wp.components;
const {
    Alignment,
    ContextMenu: { ContextMenu, handleContextMenu },
    globalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Inline: { InlineToolbar },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents

import icons from './icon'
const dividerOptions = ['fill', 'dot', 'dash', 'branch', 'dashes', 'leaf', 'line1', 'line2', 'line3', 'line4', 'line5', 'line6', 'line7', 'line8', 'line9', 'line10', 'line11', 'line12', 'line13', 'liner', 'mustache', 'shadow', 'slash', 'spring', 'valla', 'wave1', 'wave2', 'wave3']
class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            isOpen: false,
            spacer: true
        };
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }
    renderDividerOptions = () => {
        const { setAttributes } = this.props
        return (
            <div className="wprig-divider-picker-options">
                <ul>
                    {dividerOptions.map((item, index) => (
                        <li
                            className={`wprig-divider-picker-option ${index}`}
                            onClick={() => { setAttributes({ style: item }) }}>
                            {icons[item]}
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }

    render() {
        const {
            name,
            clientId,
            attributes,
            isSelected,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                alignment,
                style,
                animation,
                globalZindex,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                hideTablet,
                hideMobile,
                globalCss,
                interaction
            }
        } = this.props

        const { device } = this.state;
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Divider Options')} initialOpen={true}>
                                <Dropdown
                                    className={"wprig-divider-picker"}
                                    contentClassName={"wprig-divider-picker-content"}
                                    position="bottom center"
                                    renderToggle={({ isOpen, onToggle }) =>
                                        <div className="shape-divider-options">
                                            <button onClick={onToggle} aria-expanded={isOpen}>
                                                <Tooltip text={isOpen ? __('Close options') : __('Find more options')}>
                                                    {icons[style]}
                                                </Tooltip>
                                            </button>
                                        </div>
                                    }
                                    renderContent={() => this.renderDividerOptions()}
                                />
                                <Alignment
                                    label={__('Alignment')}
                                    alignmentType="content"
                                    disableJustify
                                    value={alignment}
                                    onChange={val => setAttributes({ alignment: val })}
                                    responsive
                                    device={device}
                                    onDeviceChange={value => this.setState({ device: value })} />
                            </PanelBody >                           
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls >

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div
                    className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}
                    onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                >
                    <Dropdown
                        className={"wprig-divider-picker backend"}
                        contentClassName={"wprig-divider-picker-content"}
                        position="bottom center"
                        renderToggle={({ isOpen, onToggle }) =>
                            <div className={`wprig-block-divider`} onClick={onToggle} aria-expanded={isOpen}>
                                {((style == 'fill') || (style == 'dot') || (style == 'dash')) ?
                                    <div className={`wprig-block-divider-style-${style}`} />
                                    :
                                    icons[style]
                                }
                            </div>
                        }
                        renderContent={() => this.renderDividerOptions()}
                    />
                    <div
                        ref={this.wprigContextMenu}
                        className={`wprig-context-menu-wraper`}
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
            </Fragment >
        );
    }
}

export default withCSSGenerator()(Edit);