const { __ } = wp.i18n;

const { registerBlockType, createBlock } = wp.blocks;
const {
	RichText,
	InspectorControls,
	ColorPalette,
	AlignmentToolbar,
	BlockControls,
} = wp.blockEditor || wp.editor;
const { IconButton, Dropdown, PanelBody, TextControl,SelectControl,ToggleControl } = wp.components;
const { withState, compose } = wp.compose;
const { withSelect } = wp.data;

import { dashesToCamelcase } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import icon from "./icon";

import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, fab);

const allIcons = Object.assign(fas, fab);

function renderDismissable(is_dismissable){
    if(!is_dismissable){
        return null;
    }
    return(
        <div className = "wprig-alert__control" >
            <i className="fa fa-times"></i>
        </div>
    )
}


registerBlockType("wprig/alert", {
	title: __("Alert"),
	icon: 'universal-access-alt',
	category: "wprig-blocks",
	attributes: {
		blockID: {
			type: "string",
			default: "",
		},
		list: {
			type: "text",
			default: [...Array(3).keys()]
				.map((i) => `<li>${__(`Item ${i + 1}`)}</li>`)
				.join(),
		},
		//retained for reverse compatibility
		listItem: {
			type: "array",
			default: Array(3).fill({
				text: "",
				selectedIcon: "fas fa-check",
				indent: 0,
			}),
		},
		selectedIcon: {
			type: "string",
			default: "fas fa-check",
        },
        notify_type: {
			type: "string",
			default: "bg-info",
        },
        notify_size: {
			type: "string",
			default: "",
        }, 
        message: {
			type: "string",
			default: "Info Message Here",
        },       
		alignment: {
			type: "string",
			default: "left",
		},
		iconColor: {
			type: "string",
			default: "#000000",
		},
		iconSize: {
			type: "number",
			default: 5,
		},
		itemSpacing: {
			type: "number",
			default: 0, //in pixels
		},
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: "core/list",
				transform: (attributes) =>
					createBlock("ub/styled-list", { list: attributes.values }),
			},
		],
	},
	keywords: [__("List"), __("Styled List"), __("Ultimate Blocks")],
	edit: compose([
		withState({
			availableIcons: [],
			iconSearchTerm: "",
			recentSelection: "",
			edits: 0,
		}),
		withSelect((select, ownProps) => {
			const { getBlock, getClientIdsWithDescendants } =
				select("core/block-editor") || select("core/editor");

			return {
				block: getBlock(ownProps.clientId),
				getBlock,
				getClientIdsWithDescendants,
			};
		}),
	])(function (props) {
		const {
			block,
			getBlock,
			getClientIdsWithDescendants,
			isSelected,
			setAttributes,
			setState,
			availableIcons,
			iconSearchTerm,
			edits,
			attributes: {
                list,
                message,
                is_dismissable,
                notify_size,
                notify_type,
				listItem,
				alignment,
				selectedIcon,
				blockID,
			},
		} = props;

		if (availableIcons.length === 0) {
			const iconList = Object.keys(allIcons).sort();
			setState({ availableIcons: iconList.map((name) => allIcons[name]) });
		}

		if (
			blockID === "" ||
			getClientIdsWithDescendants().some(
				(ID) =>
					"blockID" in getBlock(ID).attributes &&
					getBlock(ID).attributes.blockID === props.attributes.blockID
			)
		) {
			setAttributes({ blockID: block.clientId });
		}

		if (
			JSON.stringify(listItem) !==
			`[${Array(3)
				.fill('{"text":"","selectedIcon":"check","indent":0}')
				.join(",")}]`
		) {
			let newList = "";

			listItem.forEach((item, i) => {
				let insertionPoint = newList.length;

				for (let j = 0; j < item.indent; j++) {
					let ulPosition = newList.lastIndexOf("</ul>", insertionPoint - 1);
					if (ulPosition > -1 && newList.lastIndexOf("<li>") < ulPosition) {
						insertionPoint = ulPosition;
					} else {
						insertionPoint -= 5;
						break;
					}
				}

				let insertedItem =
					i === 0 || item.indent <= listItem[i - 1].indent
						? `<li>${item.text}</li>`
						: `<ul class="fa-ul"><li>${item.text}</li></ul>`;

				newList = [
					newList.slice(0, insertionPoint),
					insertedItem,
					newList.slice(insertionPoint),
				].join("");
			});

			setAttributes({
				selectedIcon: listItem[0].selectedIcon,
				list: newList,
				listItem: Array(3).fill({
					text: "",
					selectedIcon: "check",
					indent: 0,
				}),
			});
		}

		return [
			isSelected && (
				<InspectorControls>
					<PanelBody title={__("Icon Options")}>
						<div
							
						>
							<p>{__("Selected icon")}</p>
							{listItem.length > 0 && (
								<Dropdown
									position="bottom right"
									renderToggle={({ isOpen, onToggle }) => (
										<IconButton
											icon={
												<FontAwesomeIcon
													icon={
														Object.keys(fas)
															.filter(
																(iconName) => fas[iconName].prefix === "fas"
															)
															.includes(`fa${dashesToCamelcase(selectedIcon)}`)
															? selectedIcon
															: ["fab", selectedIcon]
													}
													color="#000000"
													size="lg"
												/>
											}
											label={__("Select icon for list")}
											onClick={onToggle}
											aria-expanded={isOpen}
										/>
									)}
									renderContent={() => (
										<div>
											<input
												type="text"
												value={iconSearchTerm}
												onChange={(e) =>
													setState({
														iconSearchTerm: e.target.value,
													})
												}
											/>
											<br />
											{availableIcons.length > 0 &&
												availableIcons
													.filter((i) => i.iconName.includes(iconSearchTerm))
													.map((i) => (
														<IconButton
															className="ub-styled-list-available-icon"
															icon={<FontAwesomeIcon icon={i} size="lg" />}
															label={i.iconName}
															onClick={() => {
																setState({
																	recentSelection: i.iconName,
																	edits: edits + 1,
																});

																setAttributes({
																	selectedIcon: i.prefix +" fa-"+i.iconName,
                                                                });
                                                                
                                                                console.log(i);
															}}
														/>
													))}
										</div>
									)}
								/>
							)}
                            <TextControl label={"Message"} 
                        value = {props.attributes.message} 
                        onChange={ (val)=>{
                        props.setAttributes({message:val})
                    }}></TextControl>

                    <SelectControl 
                        label={"Info Type"} 
                        value = {props.attributes.notify_type} 
                        onChange={ (val)=>{
                        props.setAttributes({notify_type:val})
                    }} options = {[
                        {value:'bg-primary',label:'Primary'},
                        {value:'bg-info',label:'Info'},
                        {value:'bg-success',label:'Success'},
                        {value:'bg-warning',label:'Warning'},
                        {value:'bg-danger',label:'Danger'},
                        {value:'bg-secondary',label:'Secondary'},
                        {value:'bg-accent',label:'Accent'},
                        {value:'bg-dark',label:'Dark'},
                        {value:'bg-light',label:'Light'},
                        {value:'bg-white',label:'White'},
                    ]} ></SelectControl>

                    <SelectControl 
                        label={"Size"} 
                        value = {props.attributes.notify_size} 
                        onChange={ (val)=>{
                        props.setAttributes({notify_size:val})
                    }} options = {[
                        {value:'',label:'Medium'},
                        {value:'wprig-alert--lg ',label:'Large'}
                    ]} ></SelectControl>

                    <ToggleControl
                        label={"Dismissable"}
                        checked={ props.attributes.is_dismissable }
                        onChange={ (val) =>{
                            props.setAttributes({is_dismissable:val})
                        }}
                    />
						</div>
					</PanelBody>
				</InspectorControls>
			),

				<div className={"wprig-alert "+props.attributes.notify_size+" "+props.attributes.notify_type}>
                <div className="wprig-alert__icon"><i className={props.attributes.selectedIcon}></i></div>
                <div className="wprig-alert__content">{props.attributes.message}</div>                
                    {renderDismissable(props.attributes.is_dismissable)}                        
                </div>
		];
	}),

	save: (props) => {
        const {
			block,
			getBlock,
			getClientIdsWithDescendants,
			isSelected,
			setAttributes,
			setState,
			availableIcons,
			iconSearchTerm,
			edits,
			attributes: {
                list,
                message,
                is_dismissable,
                notify_size,
                notify_type,
				listItem,
				alignment,
				selectedIcon,
				blockID,
			},
		} = props;
        return (
            <div className={"wprig-alert "+props.attributes.notify_size+" "+props.attributes.notify_type}>
                <div className="wprig-alert__icon"><i className={props.attributes.selectedIcon}></i></div>
                <div className="wprig-alert__content">{props.attributes.message}</div>                
                    {renderDismissable(props.attributes.is_dismissable)}                        
                </div>
        )
    },
});
