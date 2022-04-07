import icons from '../../helpers/icons';
import classnames from 'classnames';
import { textColor } from '@wordpress/icons/build-types';
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
    TextControl ,
    Tooltip,
} = wp.components;

const {
    RichText,
    BlockControls,
    InspectorControls
} = wp.blockEditor;

const {
    Alignment ,
    ButtonGroup ,
    Media ,
    TestField,
    Url ,
    Select,
    RadioAdvanced ,
    Headings ,
    Toggle,
    InspectorTab,
    InspectorTabs,
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
            spacer: true,
            openPanelSetting: ''
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
    handlePanelOpenings = (panelName) => {
        this.setState({ ...this.state, openPanelSetting: panelName })
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
                
                uniqueId,
                layout,
                alignment,
                imageType,
                image,
                image2x,
                externalImageUrl,
                imageUrl,
                imgAlt,
                enableTitle,
                enableSubtitle,
                enableCaption,
                contentVerticalAlign,
                contentAlignment,

                contentAnimation,

                title,
                titleLevel,
                titleColor,

                subtitle,
                subTitleColor,

                caption,
                captionColor,

                enableOverlay,
                enableFrame,
                animateOnHover,
                titleVisibleOnHover,
                subTitleVisibleOnHover,
                frameAnimateOnHover,
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

        const { device, currentTab } = this.state;
        const titleTagName = 'h' + titleLevel;
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
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key='style'>      
                            <PanelBody title={__('Content')} initialOpen={true}>
                                <Select
                                    label={__('Layout')}
                                    options={[
                                        ['simple','Simple'],
                                        ['blurb','Blurb'],
                                    ]}
                                    value={layout}
                                    onChange={(value) => setAttributes({ layout: value })} /> 
                                
                                <ButtonGroup
                                    label={__('Image Type')}
                                    options={
                                        [
                                            [__('Local'), 'local'],
                                            [__('External'), 'external']
                                        ]
                                    }
                                    value={imageType}
                                    onChange={value => setAttributes({ imageType: value })}
                                />
                                {
                                    imageType === 'local' ?
                                        <Fragment>
                                            <TestField label={__('Image')} multiple={false} type={['image']} panel={true} value={image} onChange={val => setAttributes({ image: val })} />
                                            <Media label={__('Retina Image (@2x)')} multiple={false} type={['image']} panel={true} value={image2x} onChange={val => setAttributes({ image2x: val })} />
                                        </Fragment>
                                        :
                                        <Url label={__('Image Source')} disableAdvanced value={externalImageUrl} onChange={newUrl => setAttributes({ externalImageUrl: newUrl })} />
                                }
                                <Url label={__('URL')} value={imageUrl} onChange={(value) => setAttributes({ imageUrl: value })} />

                                <TextControl label={__('Alt Text')} value={imgAlt} onChange={val => setAttributes({ imgAlt: val })} />

                                <Toggle label={__('Enable Title')} value={enableTitle} onChange={value => setAttributes({ enableTitle: value })} />                               
                                <Toggle label={__('Enable SubTitle')} value={enableSubtitle} onChange={value => setAttributes({ enableSubtitle: value })} />                               
                                <Toggle label={__('Enable Caption')} value={enableCaption} onChange={value => setAttributes({ enableCaption: value })} />   
                                <Toggle label={__('Enable animateOnHover')} value={frameAnimateOnHover} onChange={value => setAttributes({ frameAnimateOnHover: value })} />                              
                                
                                <RadioAdvanced label={__('Vertical Align')} value={contentVerticalAlign} onChange={(value) => setAttributes({ contentVerticalAlign: value })}
                                            options={[
                                                { label: __('Top'), value: 'top', title: __('Top') },
                                                { label: __('Middle'), value: 'center', title: __('Middle') },
                                                { label: __('Bottom'), value: 'bottom', title: __('Bottom') },
                                            ]}
                                        />
                                <Alignment label={__('Horizontal Alignment')} value={contentAlignment} alignmentType="content" onChange={val => setAttributes({ contentAlignment: val })} alignmentType="content" disableJustify />
                                    

                                <Select label={__('Animation')} options={[['none', __('No Animation')], ['slide-top', __('Slide From Top')], ['slide-right', __('Slide From Right')], ['slide-bottom', __('Slide From Bottom')], ['slide-left', __('Slide From Left')], ['zoom-in', __('Zoom In')], ['zoom-out', __('Zoom Out')], ['scale', __('Scale')]]} value={contentAnimation} onChange={val => setAttributes({ contentAnimation: val })} />
                            </PanelBody>                       
                            <PanelBody title={__('Title')} initialOpen={false}>
                                <Headings label={__('Title Tag')} selectedLevel={titleLevel} onChange={(value) => setAttributes({ titleLevel: value })} />
                                
                                <Select
                                    label={__('Title Color')}
                                    options={[
                                        ['primary','Primary'],
                                        ['secondary','Secondary'],
                                        ['accent','Accent'],
                                        ['light dark','Light'],
                                        ['dark','Dark'],
                                        ['info','Info'],
                                        ['success','Success'],
                                        ['warning','Warning'],
                                        ['danger','Danger'],
                                    ]}
                                    value={titleColor}
                                    onChange={(value) => setAttributes({ titleColor: value })} /> 
                            </PanelBody>   
                            <PanelBody title={__('Sub Title')} initialOpen={false}>
                                <Select
                                    label={__('Sub Title Color')}
                                    options={[
                                        ['primary','Primary'],
                                        ['secondary','Secondary'],
                                        ['accent','Accent'],
                                        ['light dark','Light'],
                                        ['dark','Dark'],
                                        ['info','Info'],
                                        ['success','Success'],
                                        ['warning','Warning'],
                                        ['danger','Danger'],
                                    ]}
                                    value={subTitleColor}
                                    onChange={(value) => setAttributes({ subTitleColor: value })} /> 
                            </PanelBody>     
                            <PanelBody title={__('Caption')} initialOpen={false}>
                                <Select
                                    label={__('Caption Color')}
                                    options={[
                                        ['primary','Primary'],
                                        ['secondary','Secondary'],
                                        ['accent','Accent'],
                                        ['light dark','Light'],
                                        ['dark','Dark'],
                                        ['info','Info'],
                                        ['success','Success'],
                                        ['warning','Warning'],
                                        ['danger','Danger'],
                                    ]}
                                    value={captionColor}
                                    onChange={(value) => setAttributes({ captionColor: value })} /> 
                            </PanelBody>      
                            <PanelBody title={__('Overlay')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={enableOverlay} onChange={val => setAttributes({ enableOverlay: val })} />
                            </PanelBody>
                            <PanelBody title={__('Frame')} initialOpen={false}>
                                <Toggle label={__('Enable')} value={enableFrame} onChange={val => setAttributes({ enableFrame: val })} />
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
                    <div className={`yani-image-wrapper  yani-image-layout--${layout} `} onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}>
                        
                        <div className={`yani-image-media${(layout == 'blurb' && animateOnHover == 1) ? ' yani-hover-animation-on' : ''}${(layout == 'blurb' && animateOnHover == 1) ? ' yani-hover-animation-type-' + contentAnimation : ''} yani-vertical-alignment-${contentVerticalAlign} yani-horizontal-alignment-${contentAlignment} ${enableFrame == 1 ? ((animateOnHover == 1 && frameAnimateOnHover == 1) ? ' yani-has-frame yani-frame-animate-on-hover' : ' yani-has-frame') : ''}`} onClick={() => this.handlePanelOpenings('Media')}>
                            <figure>
                                <div className="yani-image-container">
                                    {
                                        (imageType === 'local' && image.url != undefined) ?
                                            <Fragment>
                                                {image2x.url != undefined ?
                                                    <img className="yani-image-image" src={image.thumbnail} srcset={image.thumbnail + ' 1x, ' + image2x.url + ' 2x'} alt={imgAlt && imgAlt} />
                                                    :
                                                    <img className="yani-image-image" src={image.thumbnail} alt={imgAlt && imgAlt} />
                                                }
                                            </Fragment>
                                            :
                                            (imageType === 'external' && externalImageUrl.url != undefined) ?
                                                <img className="yani-image-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
                                                :
                                                <div className="yani-image-image yani-image-placeholder"><i className="far fa-image" /></div>
                                    }
                                    {layout == 'blurb' &&
                                        <div className={`yani-image-content yani-image-content--align-${alignment}`} >
                                            <div className="yani-image-content-inner">
                                                <RichText alignment
                                                    className={`yani-image-title  ${titleColor} ${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' yani-visible-on-hover-enabled' : ''}${(animateOnHover == 1 && titleVisibleOnHover == 1) ? ' yani-visible-on-hover' : ''}`}
                                                    tagName={titleTagName}
                                                    value={title}
                                                    onChange={(value) => setAttributes({ title: value })}
                                                    placeholder={__('Add Title…')}
                                                />

                                                {enableSubtitle == 1 &&
                                                    <RichText
                                                        className={`yani-image-sub-title ${subTitleColor} ${(animateOnHover == 1 && subTitleVisibleOnHover == 1 && titleVisibleOnHover != 1) ? ' yani-visible-on-hover-enabled' : ''}${titleVisibleOnHover == 1 ? ' yani-visible-on-hover' : (animateOnHover == 1 && subTitleVisibleOnHover == 1) ? ' yani-visible-on-hover' : ''}`}
                                                        tagName='div'
                                                        value={subtitle}
                                                        onChange={(value) => setAttributes({ subtitle: value })}
                                                        placeholder={__('Add Sub Title…')}
                                                    />
                                                }


                                            </div>
                                        </div>
                                    }
                                    {(layout == 'simple' && enableCaption == 1) &&
                                    <RichText
                                        key="editable"
                                        tagName='figcaption'
                                        className= {`yani-image-caption  ${captionColor}`}
                                        keepPlaceholderOnFocus
                                        placeholder={__('Add Caption...')}
                                        onChange={value => setAttributes({ caption: value })}
                                        value={caption}
                                    />
                                }
                                </div>
                            </figure>
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
