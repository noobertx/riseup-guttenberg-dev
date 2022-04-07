import icons from '../../helpers/icons';
const { __ } = wp.i18n;
const {
    InspectorControls,
    BlockControls
} = wp.blockEditor;

const {
    Component,
    Fragment,
    createRef
} = wp.element;

const {
    PanelBody,
    Toolbar,
    Tooltip
} = wp.components;

const {
    Typography,
    Alignment,
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    globalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    Styles,
    Range,
    Tabs,
    Tab,
    Border,
    Inline: {
        InlineToolbar
    },
    RadioAdvanced,
    Color,
    BoxShadow,
    Toggle,
    Separator,
    IconSelector,
    BorderRadius,
    Padding,
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents;

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            spacer: true,
            removeItemViaBackSpace: 999,
            focusedItem: this.props.attributes.listItems.length - 1
        };
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const {
            clientId,
            isSelected,
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
        isSelected && this.placeCaretAtEnd(document.querySelector(`.wprig-block-${uniqueId} .wprig-list-item-text-${this.state.focusedItem}`))
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.attributes.listItems.length > prevProps.attributes.listItems.length) {
            let focusedListItem = document.querySelector(`.wprig-block-${prevProps.attributes.uniqueId} .wprig-list-item-text-${this.state.focusedItem}`)
            focusedListItem.focus()
        } else if (this.props.attributes.listItems.length < prevProps.attributes.listItems.length) {
            const { focusedItem } = this.state
            let focusedListItem = document.querySelector(`.wprig-block-${prevProps.attributes.uniqueId} .wprig-list-item-text-${focusedItem}`)
            if (this.props.isSelected && focusedListItem) {
                this.placeCaretAtEnd(focusedListItem)
            }
        }
    }
    handleListItemChanges = (newValues) => {
        const { attributes: { listItems }, setAttributes } = this.props
        let newItem = newValues.length - listItems.length == 9
        let emptyItemIndex = newValues.indexOf("<li></li>")
        if (emptyItemIndex == -1) {
            setAttributes({ listItems: newValues })
        } else {
            !newItem && this.removeEmptyItem(newValues, emptyItemIndex)
        }
    }
    removeEmptyItem = (currentList, emptyItemIndex) => {
        const { setAttributes } = this.props;
        let newList = [...currentList]
        newList.splice(emptyItemIndex, 9)
        newList = newList.join('')
        setAttributes({ listItems: newList })
    }
    updateListItems = (index, operation) => {
        const { attributes: { listItems }, setAttributes } = this.props
        let newList = JSON.parse(JSON.stringify(listItems))
        operation == 'add' ? newList.splice(index + 1, 0, '') : newList.splice(index, 1)
        setAttributes({ listItems: newList })
    }
    modifySpecificItem = (value, index) => {
        const { attributes: { listItems }, setAttributes } = this.props;
        const modifiedListItems = listItems.map((listItem, currentIndex) => {
            let temp = listItem
            if (index === currentIndex) {
                temp = value
            }
            return temp
        })
        setAttributes({ listItems: modifiedListItems })
    }
    renderDeleteOption = (index, alignment) => {
        const { focusedItem } = this.state
        return (
            <Tooltip text={__('Delete this item')}>
                <span className={`wprig-action-remove alignment-${alignment == 'right' ? 'left' : 'right'}`} role="button"
                    onClick={() => {
                        this.updateListItems(index, 'delete')
                        index == focusedItem ? this.setState({ focusedItem: index > 0 ? index - 1 : index })
                            :
                            this.setState({ focusedItem: focusedItem > 0 ? focusedItem - 1 : focusedItem })

                    }}>
                    <i className="fas fa-times" />
                </span>
            </Tooltip>
        )

    }
    renderListItems = () => {
        const { attributes: { listItems, alignment, listType, bulletStyle } } = this.props
        const { focusedItem, removeItemViaBackSpace } = this.state
        const ListTag = (listType == 'ordered') ? 'ol' : 'ul'
        return (
            listItems.length > 0 ?
                <ListTag className={`wprig-list wprig-list-type-${listType} wprig-list-bullet-${bulletStyle.name}`}>
                    {listItems.map((item, index) => {
                        return (
                            <li className={`wprig-list-item`}  >
                                {item.length > 0 && alignment == 'right' && this.renderDeleteOption(index, alignment)}
                                <div
                                    className={`wprig-list-item-text-${index}`}
                                    id={`wprig-list-item-text-${index}`}
                                    contenteditable="true"
                                    placeholder="Enter new item"
                                    onClick={() => this.setState({ focusedItem: index })}
                                    onBlur={(event) => this.modifySpecificItem(event.target.innerText, index)}
                                    onKeyPress={(event) => {
                                        if (event.key == 'Enter') {
                                            event.preventDefault()
                                            this.updateListItems(index, 'add')
                                            this.setState({ focusedItem: index + 1 == listItems.length ? listItems.length : focusedItem + 1 })
                                        }
                                    }
                                    }
                                    onKeyUp={(event) => {
                                        if (event.key == 'Backspace') {
                                            event.target.innerText.length == 0 && this.setState({ removeItemViaBackSpace: index })
                                            if (removeItemViaBackSpace == index) {
                                                this.updateListItems(index, 'delete')
                                                this.setState({ focusedItem: index > 0 ? index - 1 : index })
                                            }
                                        }
                                    }}
                                >
                                    {item}
                                </div>
                                {item.length > 0 && alignment != 'right' && this.renderDeleteOption(index, alignment)}
                            </li>
                        )
                    })}
                </ListTag>
                :
                <button onClick={() => {
                    this.setState({ focusedItem: listItems.length })
                    this.updateListItems(listItems.length, 'add')
                }} className="button is-default wprig-action-button" role="button">
                    <i className="fas fa-plus" /> {__('Add List Item')}
                </button>
        )

    }

    placeCaretAtEnd = (el) => {
        el.focus()
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    render() {
        const {
            name,
            clientId,
            isSelected,
            attributes,
            setAttributes,
            attributes: {
                uniqueId,
                className,
                recreateStyles,
                alignment,
                // layout,
                listType,

                bulletStyle,
                // bulletSize,
                // bulletSizeCustom,
                // bulletColor,
                // bulletColorHover,
                // bulletSpacing,
                // numberCorner,
                // numberFontSize,
                // numberBgSize,
                // useNumberBg,
                // numberBg,
                // numberBgHover,

                animation,
                //global
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
        } = this.props;
        const { device } = this.state;

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Options')} initialOpen={true}>
                                {/* <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 'fill', svg: icons.list_fill, label: __('Fill') },
                                        { value: 'classic', svg: icons.list_classic, label: __('Classic') }
                                    ]}
                                /> */}
                                <Alignment label={__('Alignment')} alignmentType="content" value={alignment} onChange={val => setAttributes({ alignment: val })} disableJustify disableToggle />
                                <Separator />
                                {/* <Typography label={__('Typography')} value={typography} onChange={val => setAttributes({ typography: val })} device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                            </PanelBody>

                            <PanelBody title={(listType == 'unordered') ? __('Bullet') : __('Number')} initialOpen={false}>
                                {listType == 'unordered' &&
                                    <Fragment>
                                        <IconSelector
                                            label="Icon"
                                            value={bulletStyle.name}
                                            enableSearch
                                            icons={[
                                                { name: 'check', value: 'fas fa-check' },
                                                { name: 'check-square', value: 'fas fa-check-square' },
                                                { name: 'check-square-outline', value: 'far fa-check-square' },
                                                { name: 'check-double', value: 'fas fa-check-double' },
                                                { name: 'check-circle', value: 'fas fa-check-circle' },
                                                { name: 'check-circle-outline', value: 'far fa-check-circle' },
                                                { name: 'square', value: 'fas fa-square' },
                                                { name: 'square-outline', value: 'far fa-square' },
                                                { name: 'circle', value: 'fas fa-circle' },
                                                { name: 'circle-outline', value: 'far fa-circle' },
                                                { name: 'arrow-right', value: 'fas fa-arrow-right' },
                                                { name: 'arrow-left', value: 'fas fa-arrow-left' },
                                                { name: 'arrow-circle-right', value: 'fas fa-arrow-circle-right' },
                                                { name: 'arrow-circle-left', value: 'fas fa-arrow-circle-left' },
                                                { name: 'arrow-alt-circle-right', value: 'far fa-arrow-alt-circle-right' },
                                                { name: 'arrow-alt-circle-left', value: 'far fa-arrow-alt-circle-left' },
                                                { name: 'long-arrow-alt-right', value: 'fas fa-long-arrow-alt-right' },
                                                { name: 'long-arrow-alt-left', value: 'fas fa-long-arrow-alt-left' },
                                                { name: 'chevron-right', value: 'fas fa-chevron-right' },
                                                { name: 'chevron-left', value: 'fas fa-chevron-left' },
                                                { name: 'angle-right', value: 'fas fa-angle-right' },
                                                { name: 'angle-left', value: 'fas fa-angle-left' },
                                                { name: 'star', value: 'fas fa-star' },
                                                { name: 'star-outline', value: 'far fa-star' },
                                            ]}
                                            onChange={val => setAttributes({ bulletStyle: val })}
                                        />
                                        {/* <RadioAdvanced label={__('Size')} value={bulletSize} onChange={val => setAttributes({ bulletSize: val })}
                                            options={[
                                                { label: 'S', value: '12px', title: __('Small') },
                                                { label: 'M', value: '16px', title: __('Medium') },
                                                { label: 'L', value: '20px', title: __('Large') },
                                                { label: 'XL', value: '28px', title: __('Extra Large') },
                                                { icon: 'fas fa-cog', value: 'custom', title: __('Custom') }
                                            ]}
                                        />
                                        {bulletSize == 'custom' &&
                                            <Range label={__('Custom Size')} value={bulletSizeCustom} onChange={(value) => setAttributes({ bulletSizeCustom: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        } */}
                                    </Fragment>
                                }
                                {/* {listType == 'ordered' &&
                                    <Fragment>
                                        <Range label={__('Font Size')} value={numberFontSize} onChange={(value) => setAttributes({ numberFontSize: value })} min={10} max={100} />
                                        <Toggle
                                            value={useNumberBg}
                                            label={__('Use Background')}
                                            onChange={val => setAttributes({ useNumberBg: val, recreateStyles: !recreateStyles })}
                                        />
                                        {
                                            useNumberBg == 1 &&
                                            <Fragment>
                                                <Range label={__('Background Size')} value={numberBgSize} onChange={(value) => setAttributes({ numberBgSize: value })} min={1} max={15} />
                                                <Range label={__('Corner')} value={numberCorner} onChange={(value) => setAttributes({ numberCorner: value })} min={0} max={100} />
                                            </Fragment>
                                        }
                                    </Fragment>
                                } */}
                                {/* <Range label={__('Spacing')} value={bulletSpacing} onChange={val => setAttributes({ bulletSpacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                {/* <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Color')} disableAlpha value={bulletColor} onChange={val => setAttributes({ bulletColor: val })} />
                                        {(listType == 'ordered' && useNumberBg == 1) &&
                                            <Color label={__('Background Color')} value={numberBg} onChange={val => setAttributes({ numberBg: val })} />
                                        }
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Color')} disableAlpha value={bulletColorHover} onChange={val => setAttributes({ bulletColorHover: val })} />
                                        {listType == 'ordered' && useNumberBg == 1 &&
                                            <Color label={__('Background Color')} value={numberBgHover} onChange={val => setAttributes({ numberBgHover: val })} />
                                        }
                                    </Tab>
                                </Tabs> */}
                            </PanelBody>

                            <PanelBody title={__('Design')} initialOpen={false}>
                                {/* <Range label={__('Spacing')} value={spacing} onChange={val => setAttributes({ spacing: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} /> */}
                                {/* <Padding label={__('Padding')} value={backgroundSize} onChange={val => setAttributes({ backgroundSize: val })} min={0} max={60} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                {layout == 'fill' &&
                                    <Fragment>
                                        <Separator />
                                        <BorderRadius label={__('Radius')} value={borderRadius} onChange={(value) => setAttributes({ borderRadius: value })} min={0} max={100} unit={['px', 'em', '%']} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                    </Fragment>
                                } */}

                                {/* <Tabs>
                                    <Tab tabTitle={__('Normal')}>
                                        <Color label={__('Color')} value={color} onChange={val => setAttributes({ color: val })} />
                                        {layout == 'fill' &&
                                            <Color label={__('Background Color')} value={background} onChange={val => setAttributes({ background: val })} />
                                        }
                                        <Border label={__('Border')} value={border} unit={['px', 'em']} onChange={val => setAttributes({ border: val })} min={0} max={10} responsive device={device} onDeviceChange={value => this.setState({ device: value })} />
                                        {layout == 'fill' &&
                                            <BoxShadow label={__('Box-Shadow')} value={shadow} onChange={(value) => setAttributes({ shadow: value })} />
                                        }
                                    </Tab>
                                    <Tab tabTitle={__('Hover')}>
                                        <Color label={__('Color')} value={colorHover} onChange={val => setAttributes({ colorHover: val })} />
                                        {layout == 'fill' &&
                                            <Color label={__('Background Color')} value={backgroundHover} onChange={val => setAttributes({ backgroundHover: val })} />
                                        }
                                        {(border.openBorder != undefined && border.openBorder == 1) &&
                                            <Color label={__('Border Color')} value={borderColorHover} onChange={(value) => setAttributes({ borderColorHover: value })} />
                                        }
                                        {layout == 'fill' &&
                                            <BoxShadow label={__('Box-Shadow')} value={shadowHover} onChange={(value) => setAttributes({ shadowHover: value })} />
                                        }
                                    </Tab>
                                </Tabs>
                             */}
                            </PanelBody>
                       
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                    <Toolbar
                        controls={
                            [
                                {
                                    icon: 'editor-ul',
                                    title: 'Convert to unordered list',
                                    onClick: () => setAttributes({ listType: 'unordered', recreateStyles: !recreateStyles }),
                                    className: `wprig-action-change-listype ${listType == 'unordered' ? 'is-active' : ''}`,
                                },
                                {
                                    icon: 'editor-ol',
                                    title: 'Convert to ordered list',
                                    onClick: () => setAttributes({ listType: 'ordered', recreateStyles: !recreateStyles }),
                                    className: `wprig-action-change-listype ${listType == 'ordered' ? 'is-active' : ''}`,
                                }
                            ]
                        }
                    />
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className={`wprig-block-advanced-list wprig-alignment-${alignment}`}
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >
                        {this.renderListItems()}
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
        );
    }
}

export default withCSSGenerator()(Edit);