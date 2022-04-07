const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Fragment, Component, createRef } = wp.element;
const {
	InspectorControls,
	BlockControls
} = wp.blockEditor;
const {
	RangeControl,
	PanelBody,
	Toolbar,
	Spinner,
	TextControl,
	SelectControl
} = wp.components;

const {
    globalSettings: {
		globalSettingsPanel,
		animationSettings
	},
	CssGenerator: { CssGenerator },
	ContextMenu: {
		ContextMenu,
		handleContextMenu
	},
	withCSSGenerator,
	InspectorTabs,
	InspectorTab
} = wp.wprigComponents;

class Edit extends Component {
    constructor() {
		super(...arguments);
		this.state = {
			device: 'md',
			spacer: true,
			categoriesList: []
		};
		this.wprigContextMenu = createRef();
	}
    componentDidMount() {
		const { setAttributes, clientId, attributes: { uniqueId } } = this.props
		this.isStillMounted = true;
		// this.fetchRequest = wp.apiFetch({
		// 	path: addQueryArgs('/wp/v2/categories', CATEGORIES_LIST_QUERY),
		// }).then(
		// 	(categoriesList) => {
		// 		if (this.isStillMounted) {
		// 			this.setState({ categoriesList });
		// 		}
		// 	}
		// ).catch(
		// 	() => {
		// 		if (this.isStillMounted) {
		// 			this.setState({ categoriesList: [] });
		// 		}
		// 	}
		// );
		const _client = clientId.substr(0, 6)
		if (!uniqueId) {
			setAttributes({ uniqueId: _client });
		} else if (uniqueId && uniqueId != _client) {
			setAttributes({ uniqueId: _client });
		}
	}
    componentWillUnmount() {
		this.isStillMounted = false;
	}
    render() {
        const {
			setAttributes,
            clientId,
            attributes: {
                uniqueId,
                className,
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
        } = this. props;

        return (
            <Fragment>
                <InspectorControls key="inspector">
					<InspectorTabs tabs={['content', 'advance']}>
						<InspectorTab key={'content'}>
                            <PanelBody title={__('Post Design')} initialOpen={true}></PanelBody>
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}
			
                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    Product Categories Menu Will Appear Here
                </div>
            </Fragment>
        );
    }
}

export default compose([
	withSelect((select, props) => {
		const { getEntityRecords } = select('core')
		const { attributes: {  } } = props
        console.log("How is is executed")
		return {
        
        };
	}),
	withCSSGenerator()
])(Edit)


