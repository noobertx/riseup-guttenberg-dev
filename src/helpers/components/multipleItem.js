const {__} = wp.i18n
export default (props) => {

    return (
        <div className="wprig-multiple-template-box">
            <div className="multiple-template-view" onClick={ () => props.onClickSingleEntity( props.data.ID ) } >
                <div className="wprig-default-template-image"><img alt={__('Default template')} src={props.backgroundImage(props.data.image)} srcSet={props.backgroundImage(props.data.image)+ ' 2x'}/>
                { props.data.pro &&
                    <span className="wprig-pro"> {__('Pro')} </span>
                }</div>
                <div className="wprig-tmpl-info">
                    <h5 className="wprig-tmpl-title" dangerouslySetInnerHTML={{__html:props.data.name}}/>
                    <span className="wprig-temp-count">{ props.totalLayouts } {__('Layouts')}</span>
                </div>
            </div>
        </div>
    )
}

