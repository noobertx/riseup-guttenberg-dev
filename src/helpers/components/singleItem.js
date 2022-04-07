const {__} = wp.i18n
const { Fragment } = wp.element;

export default (props) => {
    return (
        <div id={(props.index==0) ? 'first-single-item' : ''} className={ 'wprig-single-block-item ' + (( props.types == 'inactive' && props.data.pro == true ) ? 'inactive' : '') }>
            <div className="wprig-single-item-inner">
                <div className="wprig-default-template-image">
                    <img className="lazy" alt={__('Lazy Loading')} src={ wprig_admin.plugin+'assets/img/image-loader.gif'} data-src={props.backgroundImage(props.data.image)} />
                    { props.data.pro && <span className="wprig-pro">{__('Pro')}</span> }
                </div>{/* wprig-default-template-image */}
                <div className="wprig-tmpl-info">
                    <div className="wprig-import-button-group">
                        { props.itemType != 'comming' ?
                            <Fragment>
                                { props.data.liveurl && <a className="wprig-button" target="_blank" href={props.data.liveurl}><i className="fa fa-share"/> {__('Preview')} </a> }
                                { (props.types == 'inactive' && props.data.pro == true) ? 
                                    <a className="wprig-button-download" target="_blank" href="https://www.themeum.com/product/wprig/">
                                        <i className="fas fa-upload"/> {__('Upgrade to Pro')}
                                    </a>
                                    :    
                                    <a className="wprig-button wprig-button-download" onClick={(e) => { props.importLayoutBlock( props.data, props.data.pro ) } }> 
                                        { props.spinner == props.data.ID ? <i className="fas fa-spinner fa-pulse"/> : <i className="fas fa-download"/>}{__('Import')} 
                                    </a>
                                }
                            </Fragment>
                            :
                            <div className="wprig-coming-soon" style={{color:'#ffffff'}}>{__('Coming Soon.')}</div>
                        }
                    </div>{/* wprig-import-button-group */}
                </div>{/* wprig-tmpl-info */}
            </div>{/* wprig-single-item-inner */}
            <h4 className="wprig-tmpl-title" dangerouslySetInnerHTML={{__html:props.data.name}}/>
        </div>
    )
}