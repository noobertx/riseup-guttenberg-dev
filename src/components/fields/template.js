const { __ } = wp.i18n
const { Component } = wp.element
const { Spinner } = wp.components
import '../css/template.scss'

class Templates extends Component {

    constructor() {
        super();
        this.state = {
            activeTemplate: -1
        }
    }

    handleTemplateSelection = (selectedTemplate) => {
        const { updateStyle, attributes } = this.props
        updateStyle({ ...attributes, ...selectedTemplate })
    }

    render() {
        const { label, templates } = this.props
        return (
            <div className="wprig-templates-container">
                {
                    templates ? (
                        <div className='wprig-design-templates'>
                            {
                                Object.keys(templates).map((key, _index) => {
                                    const thumbnail = templates[key].thumbnail
                                    let thumbnail_src = `${wprig_pro_admin.plugin}assets/img/templates/placeholder.svg`;
                                    if(thumbnail !== undefined){
                                        if(thumbnail.type === 'local') {
                                            if(thumbnail.src !== undefined && thumbnail.src !== ''){
                                                thumbnail_src = `${wprig_pro_admin.plugin}assets/img/templates/${thumbnail.src}`
                                            }
                                        }else{
                                            if(thumbnail.src !== undefined && thumbnail.src !== '') {
                                                thumbnail_src = thumbnail.src
                                            }
                                        }
                                    }
                                    return (
                                        <div className={'wprig-design-template ' + (this.state.activeTemplate === _index ? 'active' : '')} role='button' onClick={() => {
                                            this.setState({activeTemplate: _index})
                                            return this.handleTemplateSelection(templates[key]);
                                        }}>
                                            <img src={thumbnail_src} alt={key} height="240" width="210"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : <div className="wprig-is_loading"><Spinner /></div>
                }
            </div>
        );
    }
}
export default Templates