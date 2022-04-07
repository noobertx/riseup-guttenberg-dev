import classnames from 'classnames';

const { Fragment,Component } = wp.element
const { __ } = wp.i18n;
const {
	InnerBlocks,
	InspectorControls
} = wp.blockEditor;

const { compose } = wp.compose;


const {
	PanelBody,
	SelectControl
} = wp.components;

const {
	Color,
	InspectorTab,
	InspectorTabs,
	withCSSGenerator,
	globalSettings: {
		globalSettingsPanel,
		animationSettings,
		interactionSettings
	}
} = wp.wprigComponents

class Edit extends Component {
    constructor(props) {
		super(props)
		this.state = {
		}
	}

    componentDidMount() {
		const {
			block,
			clientId,
			setAttributes,
			updateBlockAttributes,
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
			setAttributes,
			attributes: {
                uniqueId,
				className,
				color_scheme,
                //global
                animation,
				globalCss,
				hideTablet,
				hideMobile,
				interaction,
				globalZindex,
				positionXaxis,
				positionYaxis,
				enablePosition,
				selectPosition
			}
        } = this.props;
        
        const blockWrapperClasses = classnames(
			{ [`wprig-block-${uniqueId}`]: typeof uniqueId !== 'undefined' },
			{ [className]: typeof className !== 'undefined' }
		)

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>                      
                        <InspectorTab key={'style'}>
							<PanelBody>
							<SelectControl 
									label={"Color Scheme"} 
									value = {color_scheme} 
									onChange={ (val)=>
									setAttributes({color_scheme:val})
									} options = {[
									{value:'',label:'None'},
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
							</PanelBody>
							</InspectorTab>
                        <InspectorTab key={'advance'}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
                    </InspectorTabs>
                </InspectorControls>
            {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

            <div className={`${blockWrapperClasses} wp-block-wprig-face ${color_scheme}`}>
                <InnerBlocks
                    templateLock={false}
                    templateInsertUpdatesSelection={false}
                    renderAppender={() => (
                        <InnerBlocks.ButtonBlockAppender />
                    )}
                />
            </div>
            </Fragment>
        )
    }
}
// export default Edit

export default compose([
	withCSSGenerator()
])(Edit);
