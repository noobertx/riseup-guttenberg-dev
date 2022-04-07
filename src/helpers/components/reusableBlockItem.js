const {__} = wp.i18n
export default (props) => {

    return (
        <div>
            <div className="wprig-reusable-list-content">
                <span className="wprig-tmpl-title" dangerouslySetInnerHTML={ { __html:props.data.post_title } }/>
            </div>
            <div className="wprig-reusable-list-info">
                <div className="wprig-reusable-list-info-date">16 Feb 2019 </div>
                <div className="wprig-reusable-list-button">
                    <button className="wprig-builder-btn wprig-btn-success" onClick={ (e) => { props.importSavedBlock( props.data ) } }>
                        <i className="fas fa-download"/>
                    </button>
                    <button className="wprig-builder-btn wprig-btn-success" onClick={ (e) => { props.deleteSavedBlock( props.index, props.data.ID ) } }>
                        <i className="fas fa-trash"/>
                    </button>
                </div>
            </div>

        </div>
    )
}