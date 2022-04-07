import classnames from 'classnames';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { IconButton } = wp.components;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { createBlock } = wp.blocks;
const { globalSettings: { globalSettingsPanel, animationSettings, interactionSettings } } = wp.wprigComponents
import { accordionItemSettings } from './innerItem';

class AccordionBlock extends Component{
    constructor(props) {
		super(props)
		this.state = {
			spacer: true,
			device: 'md',
			activeTab: 1,
			showIconPicker: false,
		}
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

    insertAccordionItem() {
        let newBlockAttributes;
        const { clientId, insertBlock, block } = this.props;
        if (block.innerBlocks && block.innerBlocks.length) {
            const lastBlockAttributes = block.innerBlocks[block.innerBlocks.length - 1].attributes;
            const itemNumber = lastBlockAttributes.itemNumber + 1;
            const heading = accordionItemSettings.heading;
            newBlockAttributes = Object.assign({}, lastBlockAttributes, { itemNumber, heading, active: false, defaultText: '' });
        } else {
            newBlockAttributes = accordionItemSettings;
        }
        insertBlock(createBlock('wprig/ct-item', newBlockAttributes), undefined, clientId);
    }

    getAccordionTemplate = (attributes) => {
        const defaultItems = attributes.defaultItems

        return Array(defaultItems).fill(0).map((_, tabIndex) => (
			// console.log(this.state.activeTab, tabIndex)
            ['wprig/ct-item',
                {
                    id: tabIndex + 1,
                    itemNumber: tabIndex, defaultText: ""  ,
                    ...(this.state.activeTab === tabIndex && { customClassName: 'wprig-active' })
                }
            ])
        )
    }

    renderTabTitles = (items) => {
        const {
			activeTab,
			showIconPicker
		} = this.state;

        return(
            Array(items).fill(0).map((_,index)=>{
                let isActiveTab = false;
				if (activeTab === index + 1) {
					isActiveTab = true;
                }
                
				const wrapperClasses = classnames(
					'wprig-tab-item',
					{ ['wprig-active']: isActiveTab }
                )
                
                const changeActiveTab = (index) => {
                    this.setState({
                        initialRender: false,
                        activeTab: index + 1,
                        showIconPicker: !showIconPicker
                    });
                }

                return (
					<div className={wrapperClasses}>
						<div
							role="button"
							
							onClick={() => changeActiveTab(index)}
						>							
                            <div>{index+1}</div>
						</div>
					</div>
				)

            })    
        )
            
    }

    render (){
        const { name, attributes, isSelectedBlockInRoot, setAttributes, attributes: { uniqueId, defaultItems,className, animation, enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, interaction } } = this.props;
        
        console.log(isSelectedBlockInRoot);
        return(
            <Fragment>
                <InspectorControls>
                    {animationSettings(uniqueId, animation, setAttributes)}
                    {interactionSettings(uniqueId, interaction, setAttributes)}
                </InspectorControls >

                
                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
                {/* <div className={`wprig-block-accordion wprig-block-${uniqueId}${className ? ` ${className}` : ''</div>}`}> */}

                <div className={`wprig-tab-nav wprig-alignment-left`}>

							{this.renderTabTitles(defaultItems)}

							{/* <Tooltip text={__('Add new item')}>
								<span
									role="button"
									areaLabel={__('Add new item')}
									className="wprig-add-new-tab"
									onClick={() => addNewTab()}
								>
									<i className="fas fa-plus-circle" />
								</span>
							</Tooltip> */}
						</div>

                <div className={`wprig-tab-body wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <InnerBlocks
                        template={this.getAccordionTemplate(attributes)}
                        allowedBlocks={['wprig/ct-item']}
                    />
                </div>

                {
                    isSelectedBlockInRoot && (
                        <div className="wprig-accordion-add-item" >
                            <IconButton
                                icon={'insert'}
                                onClick={() => {
                                    this.insertAccordionItem();
                                }}
                            >
                                {__('Add Carousel Item')}
                            </IconButton>
                        </div>
                    )
                }
            </Fragment>
        )
    }
}

export default compose([
    withSelect((select, ownProps) => {
        const { clientId } = ownProps;
        const { getBlock, isBlockSelected, hasSelectedInnerBlock } = select('core/block-editor');
        return {
            block: getBlock(clientId),
            isSelectedBlockInRoot: isBlockSelected(clientId) || hasSelectedInnerBlock(clientId, true),
        };
    }),
    withDispatch((dispatch) => {
        const { insertBlock, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            insertBlock,
            updateBlockAttributes
        };
    }),
])(AccordionBlock)
