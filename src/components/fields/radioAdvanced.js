const { Component } = wp.element
const { Tooltip } = wp.components

class RadioAdvanced extends Component {

    setSettings(val){
        this.props.onChange( val )
    }

    render() {
        const { value, label, options } = this.props;
        return (
            <div className="wprig-field wprig-field-radio-advanced wprig-d-flex wprig-align-center">
                { label &&
                    <span>{label}</span>
                }
                <div className={`wprig-field-button-list${label && ' wprig-ml-auto'}`}>
                    {
                        options.map((data, index) => {
                            return (
                                <Tooltip text={ data.title || data.value }>
                                    <button className={(value == data.value ? 'active' : '') + ' wprig-button'} key={index} onClick={ () => this.setSettings(data.value) }>
                                        {data.icon ? (<i className={ data.icon } />)
                                        : data.svg ? (<span className='wprig-option-svg'>{data.svg}</span>)
                                        : data.label}
                                    </button>
                                </Tooltip>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default RadioAdvanced