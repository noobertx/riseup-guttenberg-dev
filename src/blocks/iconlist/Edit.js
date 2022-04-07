const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Tooltip, Popover,SelectControl  } = wp.components;
const {
    Alignment,
    Styles,
    IconList,
    RadioAdvanced,
    globalSettings: {
        globalSettingsPanel,
        animationSettings,
        interactionSettings
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    withCSSGenerator,
    InspectorTabs,
    InspectorTab
} = wp.wprigComponents

import icons from '../../helpers/icons'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: 'md',
            currentListItemIndex: 0,
            openIconPopUp: false,
            removeItemViaBackSpace: -1,
            focusedItem: this.props.attributes.listItems.length - 1
        };
        this.textInput = React.createRef();
        this.wprigContextMenu = createRef();
    }
    componentDidMount() {
        const {
            setAttributes,
            clientId,
            attributes: {
                uniqueId
            }
        } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
        this.placeCaretAtEnd(document.querySelector(`.yani-block-${uniqueId} .yani-list-item-text-${this.state.focusedItem}`))
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.attributes.listItems.length > prevProps.attributes.listItems.length) {
            let focusedListItem = document.querySelector(`.yani-block-${prevProps.attributes.uniqueId} .yani-list-item-text-${this.state.focusedItem}`)
            focusedListItem.focus();
        } else if (this.props.attributes.listItems.length < prevProps.attributes.listItems.length) {
            const { focusedItem } = this.state
            let focusedListItem = document.querySelector(`.yani-block-${prevProps.attributes.uniqueId} .yani-list-item-text-${focusedItem}`)
            if (this.props.isSelected && focusedListItem) {
                this.placeCaretAtEnd(focusedListItem)
            }
        }
    }
    modifySpecificItem = (value, index) => {
        const { attributes: { listItems }, setAttributes } = this.props;
        const modifiedListItems = listItems.map((listItem, currentIndex) => {
            if (index === currentIndex) {
                listItem = { ...listItem, ...value }
            }
            return listItem
        })
        setAttributes({ listItems: modifiedListItems })
    }
    updateListItems = (index, operation) => {
        const { attributes: { listItems }, setAttributes } = this.props
        let newList = JSON.parse(JSON.stringify(listItems))
        operation == 'add' ? newList.splice(index + 1, 0, { icon: 'fas fa-arrow-right', text: '' }) : newList.splice(index, 1)
        this.setState({ openIconPopUp: false })
        setAttributes({ listItems: newList })
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
    renderListItems = () => {
        const { isSelected, attributes: { iconPosition, listItems , textFieldColor , iconColor } } = this.props
        const { focusedItem, removeItemViaBackSpace, currentListItemIndex, openIconPopUp } = this.state
        return listItems.map((item, index) => {
            return (
                <li className={`yani-list-li yani-list-li-editor `} >
                    <div ref="avoidOnClick" className={`yani-list-item yani-list-item-${index}`} onClick={() => this.setState({ currentListItemIndex: index })}>
                        {iconPosition == 'left' && <span className={`yani-list-item-icon  ${iconColor} ${item.icon} fa-fw`} onClick={() => this.setState({ openIconPopUp: openIconPopUp ? (currentListItemIndex == index) ? false : true : true })} />}
                        <div
                            className={`yani-list-item-text-${index} ${textFieldColor}`}
                            id={`yani-list-item-text-${index}`}
                            contenteditable="true"
                            placeholder="Enter new list item"
                            onBlur={(event) => this.modifySpecificItem({ text: event.target.innerText }, index)}
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
                                        this.setState({ focusedItem: index > 0 ? index - 1 : index, removeItemViaBackSpace: -1 })
                                    }
                                }
                            }}
                            onClick={() => this.setState({ focusedItem: index })}>
                            {item.text}
                        </div>
                        {iconPosition == 'right' && <span className={`yani-list-item-icon ${iconColor} ${item.icon} fa-fw`} onClick={() => this.setState({ openIconPopUp: openIconPopUp ? (currentListItemIndex == index) ? false : true : true })} />}
                        {
                            item.text.length > 0 &&
                            <Tooltip text={__('Delete this item')}>
                                <span className="yani-action-remove" role="button"
                                    onClick={() => {
                                        this.updateListItems(index, 'delete')
                                        index == focusedItem ? this.setState({ focusedItem: index > 0 ? index - 1 : index })
                                            :
                                            this.setState({ focusedItem: focusedItem > 0 ? focusedItem - 1 : focusedItem })

                                    }}>
                                    <i className="fas fa-times" />
                                </span>
                            </Tooltip>
                        }
                        {(currentListItemIndex == index && openIconPopUp && isSelected) &&

                            <Popover
                                position={`bottom ${iconPosition}`}
                                className="yani-iconlist-icons-popover"
                            >
                                <IconList
                                    disableToggle={true}
                                    value={listItems.length > 0 && listItems[index].icon}
                                    onChange={(value) => this.modifySpecificItem({ icon: value }, index)} />
                            </Popover>
                        }
                    </div>
                </li>
            )
        })

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
                layout,
                iconPosition,
                listItems,
                alignment,
                iconColor,
                textFieldColor,
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
        } = this.props;

        const { device } = this.state;

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Alignment')} initialOpen={true}>
                                <Styles value={layout} onChange={val => setAttributes({ layout: val })}
                                    options={[
                                        { value: 'fill', svg: icons.list_fill, label: __('Fill') },
                                        { value: 'classic', svg: icons.list_classic, label: __('Classic') }
                                    ]}
                                />
                                <Alignment label={__('Alignment')} value={alignment} alignmentType="content" onChange={val => setAttributes({ alignment: val })} disableJustify  />
                            </PanelBody>



                            <PanelBody title={__('Design')} initialOpen={false}>                               
                                <RadioAdvanced label={__('Position')} value={iconPosition} onChange={val => setAttributes({ iconPosition: val })}
                                    options={[
                                        { label: 'Left', value: 'left', title: __('Left') },
                                        { label: 'Right', value: 'right', title: __('Right') }
                                    ]}
                                />   
                                <SelectControl
                                            label="Icon Color"
                                            value={iconColor}
                                            options={[
                                                { label: 'None', value: '' },
                                                { label: 'Primary', value: 'primary' },
                                                { label: 'Secondary', value: 'secondary' },
                                                { label: 'Accent', value: 'accent' },
                                                { label: 'Light', value: 'light' },
                                                { label: 'Dark', value: 'dark' },
                                                { label: 'Info', value: 'info' },
                                                { label: 'Success', value: 'success' },
                                                { label: 'Warning', value: 'warning' },
                                                { label: 'Danger', value: 'danger' },
                                            ]}
                                            onChange={val => setAttributes({ iconColor: val })}
                                        />   

                                <SelectControl
                                            label="Text Color"
                                            value={textFieldColor}
                                            options={[
                                                { label: 'None', value: '' },
                                                { label: 'Primary', value: 'primary' },
                                                { label: 'Secondary', value: 'secondary' },
                                                { label: 'Accent', value: 'accent' },
                                                { label: 'Light', value: 'light' },
                                                { label: 'Dark', value: 'dark' },
                                                { label: 'Info', value: 'info' },
                                                { label: 'Success', value: 'success' },
                                                { label: 'Warning', value: 'warning' },
                                                { label: 'Danger', value: 'danger' },
                                            ]}
                                            onChange={val => setAttributes({ textFieldColor: val })}
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

                <div className={`yani-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div
                        className="yani-block-icon-list"
                        onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}
                    >
                        <ul className={`yani-list text-${alignment}`}>
                            {this.renderListItems()}
                        </ul>
                        <button onClick={() => {
                            this.setState({ currentListItemIndex: listItems.length, focusedItem: listItems.length })
                            this.updateListItems(listItems.length, 'add')
                        }} className="button is-default yani-action-button" role="button">
                            <i className="fas fa-plus" /> {__('Add New')}
                        </button>
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
        );
    }
}

export default withCSSGenerator()(Edit);
