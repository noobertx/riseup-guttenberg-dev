import '../css/styles.scss'
const { __ } = wp.i18n
const { Component } = wp.element

class Styles extends Component {
    render() {
        const { label, value, options, columns = 2, proUpgradation, onChange } = this.props

        return (
            <div className="wprig-field wprig-field-styles">
                {label && <label>{label}</label>}
                <div className={`wprig-field-style-list wprig-field-style-columns-${columns}`}>
                    {options.map(data =>
                        (
                            <div
                                role="button" tabindex="0" aria-label={data.label ? data.label : ''}
                                {...(!data.pro && { onClick: () => onChange(data.value) })}
                                className={`${value == data.value ? 'wprig-active' : ''}${data.pro ? ' wprig-pro-layout' : ''}`}
                            >
                                {data.icon && <span className="wprig-layout-style wprig-field-style-icon">{data.icon}</span>}
                                {data.svg && <span className="wprig-layout-style wprig-field-style-svg">{data.svg}</span>}
                                {data.img && <span className="wprig-layout-style wprig-field-style-img">{data.img}</span>}
                                {data.label && <span className="wprig-field-style-label">{data.label}</span>}
                            </div>
                        )
                    )}
                </div>
                {
                    proUpgradation &&
                    <div className='wprig-field-pro-upgrade'>
                        <div className='wprig-logo'>
                            <img src={wprig_admin.plugin + 'assets/img/wprig-Q.svg'} alt={__('wprig-Q')} />
                        </div>
                        <div className='wprig-upgrade-message'>
                            <span className='wprig-upgrade-message-title'>{__('Upgrade to Pro')}</span>
                            <span className='wprig-upgrade-message-description'>{__('Get all features of post grid at your disposal by upgrading to pro version')}</span>
                        </div>
                        <a className='wprig-upgrade-button' href={'https://www.themeum.com/product/wprig'} target='_blank' >{__('Upgrade Now')}</a>
                    </div>
                }

            </div>
        )
    }
}
export default Styles