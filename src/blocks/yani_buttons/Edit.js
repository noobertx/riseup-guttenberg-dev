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
    Url,
    Range,
    Select,
    Padding,
    IconList,
    Alignment,
    InspectorTab,
    InspectorTabs,
    RadioAdvanced,
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
                url,
                iconName,
                uniqueId,
                textField,
                alignment,
                className,
                buttonSize,
                iconPosition,
                buttonColor ,
                buttonWidthType,
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
                            <PanelBody title={__('')} opened={true}>
                                <Url label={__('Button URL')} value={url} onChange={(value) => setAttributes({ url: value })} />                             
                                    <Alignment
                                        responsive
                                        disableJustify
                                        device={device}
                                        value={alignment}
                                        label={__('Alignment')}
                                        alignmentType="content"
                                        onChange={val => setAttributes({ alignment: val })}
                                        onDeviceChange={value => this.setState({ device: value })}
                                    />
                            </PanelBody>

                            <PanelBody title={__('Size')} initialOpen={false}>
                                <RadioAdvanced
                                    label={__('Button Size')}
                                    options={[
                                        { label: 'S', value: 'small', title: 'Small' },
                                        { label: 'M', value: 'medium', title: 'Medium' },
                                        { label: 'L', value: 'large', title: 'Large' },
                                        { icon: 'fas fa-cog', value: 'custom', title: 'Custom' }
                                    ]}
                                    value={buttonSize}
                                    onChange={(value) => setAttributes({ buttonSize: value })} />
                                {buttonSize == 'custom' &&
                                    <Padding
                                        label={__('Padding')}
                                        value={buttonPadding}
                                        onChange={(value) => setAttributes({ buttonPadding: value })}
                                        unit={['px', 'em', '%']}
                                        max={150}
                                        min={0}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                }
                                <RadioAdvanced
                                    label={__('Button Width')}
                                    options={[
                                        { label: __('Auto'), value: 'auto', title: __('Auto') },
                                        { label: __('Full'), value: 'block', title: __('Full') },
                                        { label: __('Fixed'), value: 'fixed', title: __('Fixed') }
                                    ]}
                                    value={buttonWidthType}
                                    onChange={(value) => setAttributes({ buttonWidthType: value, recreateStyles: !recreateStyles })} />
                                {buttonWidthType == 'fixed' &&
                                    <Range
                                        label={__('Fixed Width')}
                                        valInspectorTabue={buttonWidth}
                                        onChange={(value) => setAttributes({ buttonWidth: value })}
                                        unit={['px', 'em', '%']}
                                        min={buttonWidth.unit === '%' ? 5 : 30}
                                        max={buttonWidth.unit === '%' ? 100 : 800}
                                        responsive
                                        device={device}
                                        onDeviceChange={value => this.setState({ device: value })} />
                                }
                            </PanelBody>
                            <PanelBody title={__('Design')} initialOpen={false}>
                                <Select
                                    label={__('buttonColor')}
                                    options={[
                                        ['bg-primary white','Primary'],
                                        ['bg-secondary white','Secondary'],
                                        ['bg-accent white','Accent'],
                                        ['bg-light dark','Light'],
                                        ['bg-dark white','Dark'],
                                        ['bg-info white','Info'],
                                        ['bg-success white','Success'],
                                        ['bg-warning white','Warning'],
                                        ['bg-danger white','Danger'],
                                    ]}
                                    value={buttonColor}
                                    onChange={(value) => setAttributes({ buttonColor: value })} /> 
                            </PanelBody>
                        
                            <PanelBody title={__('Icon')} initialOpen={false}>
                                <IconList
                                    label={__('Icon')}
                                    value={iconName}
                                    onChange={(value) => this.props.setAttributes({ iconName: value })} />
                                {iconName &&
                                    <Fragment>
                                        <Select
                                            label={__('Position')}
                                            options={['left', 'right']}
                                            value={iconPosition}
                                            onChange={(value) => setAttributes({ iconPosition: value })} />                                       
                                    </Fragment>
                                }
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
                    <div className={`yani-btn-wrapper  yani-btn-wrapper--${alignment.md} `} onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}>
                        <div className={`yani-btn yani-btn--${buttonSize} ${buttonColor} yani-btn--${buttonWidthType}`}>
                            {(iconName.trim() != "") && (iconPosition == 'left') && (<i className={`yani-btn-icon ${iconName}`} />)}
                            <RichText
                                tagName='div'
                                keepPlaceholderOnFocus
                                className="yani-button-text"
                                placeholder={__('Add Text...')}
                                value={textField}
                                onChange={value => setAttributes({ textField: value })}
                            />
                            {(iconName.trim() != "") && (iconPosition == 'right') && (<i className={`yani-btn-icon ${iconName}`} />)}
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
