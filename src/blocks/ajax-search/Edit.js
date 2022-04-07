import icons from '../../helpers/icons';
import classnames from 'classnames';
const { __ } = wp.i18n;
const {
    Fragment,
    Component,
    createRef
} = wp.element;

const { compose  } = wp.compose;

const {
    withSelect,
    withDispatch
} = wp.data;

const {
    PanelBody,
    Toolbar,
    TextControl,
    ToggleControl ,
    Tooltip
} = wp.components;

const {
    RichText,
    BlockControls,
    InspectorControls
} = wp.blockEditor;

const {
    Url,
    Tab,
    Tabs,
    Color,
    Range,
    Border,
    Select,
    Styles,
    Padding,
    IconList,
    Separator,
    Alignment,
    BoxShadow,
    Typography,
    BorderRadius,
    InspectorTab,
    InspectorTabs,
    RadioAdvanced,
    ColorAdvanced,
    withCSSGenerator,
    InspectorSections,
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
            spacer: true,
            hasFixedBackground: false,
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
                recreateStyles,
                placeholder,
                label,
                labelPosition,
                uniqueId,
                className,
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

        const { device, currentTab,hasFixedBackground } = this.state;

        const classNames = classnames(
            { [`wprig-block-${uniqueId}`]: uniqueId },
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
                <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key='style'>
                            <PanelBody title={__('')} opened={true}>
                            <ToggleControl
                                label="Fixed Background"
                                help={
                                    hasFixedBackground
                                        ? 'Has fixed background.'
                                        : 'No fixed background.'
                                }
                                checked={ hasFixedBackground }
                                onChange={ () =>
                                    setState( ( state ) => ( {
                                        hasFixedBackground: ! state.hasFixedBackground,
                                    } ) )
                                }
                            />
                            <TextControl label={__('Label')} value={label} onChange={value => { setAttributes({ label: value }) }} />
                            <TextControl label={__('Placeholder')} value={placeholder} onChange={value => { setAttributes({ placeholder: value }) }} />



                                    <Select
                                            label={__('Label Position')}
                                            options={['top','bottom','left', 'right']}
                                            value={labelPosition}
                                            onChange={(value) => setAttributes({ labelPosition: value })} />
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key='advance'>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}


                <div className={classNames}>
                    <div className="wprig-block-btn-wrapper" onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}>
                        <div className={`wprig-block-search label--${labelPosition}` }>
                            <label>{label}</label>
                            <input type='text' class ="wprig-search-field" placeholder={placeholder} />
                        </div>

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
