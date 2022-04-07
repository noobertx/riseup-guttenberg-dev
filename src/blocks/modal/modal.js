const {
    Fragment,
    Component,
    createRef
} = wp.element;

class ModalPortal extends Component{

    createModalControls = (controls) =>{
        return {
            icon: 'fa fa-close',
            title : `Modal ${controls}`,
            isActive: this.proprs.attributes.activeControls === controls,
            onClick: () => this.props.updateActiveControls(controls)
        }
    }

    render(){
        const {
            className,
            toggleIsModalOpen,
            updateModalContent,
            updateActiveControls,
            attributes:{
                activeControls,
                instanctId,
                isModalOpen,
                modalContent,
                triggerModal
            }
        } = this.props;

        return(
        <Fragment>
            {!!!triggerModal &&
                <div className={`${className}`} onMouseDown={ event => {event.stopPropagation() }} >
                    <div className="modal" id={`modal_${instanceId}`} tabIndex="-" role="dialog" aria-labelledby={`modal_${instanceId}`} style={{display:"none"}} aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <button onClick={ ()=> toggleIsModalOpen} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">X</span>
                                </button>
                                <div className="modal-body">
                                    {
                                        activeControls === 'Preview' ?
                                        <RawHTML>{modalContent}</RawHTML> :
                                        <Fragment>
                                            <p>Enter Modal Content</p>
                                            <PlainText
                                            help="Enter Modal Content"
                                            value={modalContent}
                                            className="w-100 editor-plain-text"
                                            onChange={ (content) => updateModalContent(content) }
                                            placeholder = { __('Enter Modal Content')}
                                            />
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
        )
    }
}

class Modal extends Component{
    toggleTriggerModal = () => {
        this.props.setAttributes({
            triggerModal: !this.props.attributes.triggerModal
        })
        this.updateActiveControls('Preview');
    }

    toggleIsModalOpen = () => {
        this.props.setAttributes({
            isModalOpen: !this.props.attributes.isModalOpen
        })
    }

    updateActiveControls = (controls) => {
        this.props.setAttributes({ activeControls: controls})
    }

    updateBtnLink = (url,post) => {
        this.props.setAttributes({ modalBtnLink: url})
    }

    updateBtnText = (text) => {
        this.props.setAttributes({ modalBtnText:text})
    }

    updateBtnBackgroundColor = (color) => {
        this.props.setAttributes({btnBackgroundColor:color})
    }

    updateBtnTextColor = (color) => {
        this.props.setAttributes({btnTextColor:color})
    }

    updateModalContent = (content) =>{
        this,props.setAttributes({modalContent:content})
    }

    render(){
        const {
            className,
            isSave,
            setAttributes,
            attributes,
            attributes:{
                instanceId,
                triggerModal,
                modalBtnLink,
                modalBtnText,
                btnBackgroundColor,
                btnTextColor,
                modalContent,
                isModalOpen
            } 
        } = this.props;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Modal" initalOpen={false}>
                        <ToggleControl 
                        label={!!triggerModal ? __('Trigger Modal On' ) : __('Trigger Modal Off' ) }
                        help= {!!triggerModal ? __('Trigger to make the button a link instead.' ) : __('Toggle to make the button open a modal insead' ) }
                        checked = { !!triggerModal }
                        onChange = { () => this.toggleTriggerModal() }
                        />
                        { !triggerModal && 
                            <Fragment>
                                <BaseControl label="Button Link" >
                                    <URLInput value={modalBtnLink} autoFocus={false} onChange={(url,post)=> this.updatedBtnLink(url,post) } />                                    
                                </BaseControl>
                                <BaseControl label="Button Text" >
                                    <TextControl value = {modalBtnText} onChange={ (text)=> this.updatedBtnText(text)}/>
                                </BaseControl>
                            </Fragment>
                        }
                        {   !!triggerModal &&
                            <Fragment>
                                <BaseControl>
                                    <Button
                                    className="copmponents-button is-button is-default is-large"
                                    data-toggle="modal"
                                    data-target = {`#modal_${instanceId}`}
                                    onClick = {()=>this.toggleIsModalOpen}>Preview</Button>
                                </BaseControl>
                            </Fragment>
                            
                        }
                    </PanelBody>
                    <PanelColorSettings
                        title={__("Button Styling")}
                        initialOpen ={false}
                        colorSettings = {[
                            {
                                value: btnBackgroundColor,
                                onChange: (newColor) => this.updateBtnBackgroundColor(newColor),
                                label: __('Background Color')
                            },
                            {
                                value: btnTextColor,
                                onChange: (newColor) => this.updateBtnTextColor(newColor),
                                label: __('Text Color')
                            }
                        ]}></PanelColorSettings>
                </InspectorControls>
                <div className={`${className} wp-block-button`}>
                    <RichText
                    tagName = "button"
                    className ="btn btn-primary-btn-lg"
                    formattingControls = {['bold','italic','strikethrough']}
                    placeholder = {__('Add Text...')}
                    value ={modalBtnText}
                    onChange = {(newText)=>{ this.updateBtnText(newText)}}
                    style = {{backgroundColor:`${btnBackgroundColor}`,borderColor:`${btnBackgroundColor}`,color:`${btnTextColor}` }}
                    keepPlaceholderOnFocus
                    />
                </div>
                <ModalPortal
                    className ={className}
                    updateActiveControls = {this.updateActiveControls}
                    updateModalContent = { this.updateModalContent}
                    toggleIsModalOpen = {this.toggleIsModalOpen}
                    attributes = {attributes}
                    />
            </Fragment>
        )
    }

}