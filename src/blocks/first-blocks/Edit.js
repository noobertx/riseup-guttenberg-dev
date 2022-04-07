
const { Component , Fragment} = wp.element;
const { select, withDispatch } = wp.data
const { compose } = wp.compose;
const { RichText, InspectorControls, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl,Toolbar, ColorPicker,IconButton,Placeholder, Disabled  } = wp.components;
const {withCSSGenerator} = wp.wprigComponents


class Edit extends Component {
 	constructor(props) {
		super(props);
		this.state = {
			editMode: true
		}
	}

 	getInspectorControls = () => {
		const { attributes, setAttributes } = this.props;
 
		return (
			<InspectorControls>
					<PanelBody
						title="Most awesome settings ever"
						initialOpen={true}
					>
						<PanelRow>
							<ToggleControl
								label="Toggle me"
								checked={attributes.toggle}
								onChange={(newval) => setAttributes({ toggle: newval })}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="What's your favorite animal?"
								value={attributes.favoriteAnimal}
								options={[
									{label: "Dogs", value: 'dogs'},
									{label: "Cats", value: 'cats'},
									{label: "Something else", value: 'weird_one'},
								]}
								onChange={(newval) => setAttributes({ favoriteAnimal: newval })}
							/>
						</PanelRow>
						<PanelRow>
							<ColorPicker
								color={attributes.favoriteColor}
								onChangeComplete={(newval) => setAttributes({ favoriteColor: newval.hex })}
								disableAlpha
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label="Activate lasers?"
								checked={attributes.activateLasers}
								onChange={(newval) => setAttributes({ activateLasers: newval })}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
		);
	}
 
	getBlockControls = () => {
		const { attributes, setAttributes } = this.props;
 
		return (
			<BlockControls>
				<AlignmentToolbar
					value={attributes.textAlignment}
					onChange={(newalign) => setAttributes({ textAlignment: newalign })}
				/>
				<Toolbar>
				<IconButton
					label={ this.state.editMode ? "Preview" : "Edit" }
					icon={ this.state.editMode ? "format-image" : "edit" }
					onClick={() => this.setState({ editMode: !this.state.editMode })}
				/>
			</Toolbar>
			</BlockControls>
		);
	}
 
	render() {
		const { attributes, setAttributes } = this.props;
		
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
 
		return ([
		this.getInspectorControls(),
		this.getBlockControls(),
		<div className={alignmentClass}>
			{this.state.editMode && 
				<Fragment>
					<RichText 
						tagName="h2"
						placeholder="Write your heading here"
						value={attributes.myRichHeading}
						onChange={(newtext) => setAttributes({ myRichHeading: newtext })}
					/>
					<RichText
						tagName="p"
						placeholder="Write your paragraph here"
						value={attributes.myRichText}
						onChange={(newtext) => setAttributes({ myRichText: newtext })}
					/>
				</Fragment>
			}
			{!this.state.editMode && 
				<Placeholder isColumnLayout={true}>
					<Disabled>
						<RichText.Content 
							tagName="h2"
							value={attributes.myRichHeading}
						/>
						<RichText.Content
							tagName="p"
							value={attributes.myRichText}
						/>
					</Disabled>
				</Placeholder>
			}
		</div>
	]);
	}
}


export default compose([
    withDispatch((dispatch) => {
        const {
            removeBlock,
        } = dispatch('core/block-editor');

        return {
            removeBlock,
        };
    }),
    withCSSGenerator()
])(Edit);