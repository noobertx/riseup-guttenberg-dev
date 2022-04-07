const { __ } = wp.i18n
import '../css/border.scss'
import Range from './range'
import Separator from './separator'
import Color from './color'
import Device from './device'
import icons from '../../helpers/icons'
const { Component, Fragment } = wp.element
const { Tooltip } = wp.components;

class Border extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            defaultUnit: 'px',
            defaultWidthType: 'global'
        }
    }
    setWidth(type, value) {
        this.props.onChange(Object.assign({}, this.props.value, { width: Object.assign({}, this.props.value.width, { [type]: value }) }));
    }

    updateBorder = (type, newValue) => {
        const { onChange, value, unit, responsive, device, responsiveGroup } = this.props
        const { defaultUnit, defaultWidthType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.wprigDevice
        const [top, right, bottom, left] = responsive || responsiveGroup ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']
        let newBorder = JSON.parse(JSON.stringify(value))
        let tempBorder = type === 'global' ? `${newValue}` : `${type == 'top' ? `${newValue}` : `${top}`} ${type == 'right' ? `${newValue}` : `${right}`} ${type == 'bottom' ? `${newValue}` : `${bottom}`} ${type == 'left' ? `${newValue}` : `${left}`}`

        if (type === 'global') {
            (responsive || responsiveGroup) ? newBorder.global ? newBorder.global[responsiveDevice] = tempBorder : newBorder.global = { [responsiveDevice]: tempBorder }
                :
                newBorder.global = tempBorder

        } else {
            (responsive || responsiveGroup) ? newBorder.custom ? newBorder.custom[responsiveDevice] = tempBorder : newBorder.custom = { [responsiveDevice]: tempBorder }
                :
                newBorder.custom = tempBorder
        }

        unit && value.unit ? newBorder.unit = value.unit : newBorder.unit = defaultUnit
        newBorder.widthType = value.widthType ? value.widthType : defaultWidthType
        newBorder.openBorder = 1
        onChange(newBorder)
    }
    setSettings(type, newValue) {
        const { onChange, value, responsive, device } = this.props
        let responsiveDevice = responsive ? device ? device : this.state.device : window.wprigDevice

        let widthType = value.widthType ? value.widthType : 'global'
        let customDefaultValues = responsive ? {
            [widthType]: value[widthType] ? value[widthType] : [widthType] == 'global' ? { [responsiveDevice]: '1' } : { [responsiveDevice]: '1 1 1 1' },
            unit: value.unit ? value.unit : 'px',
            widthType: widthType,
        }
            : {
                [widthType]: value[widthType] ? value[[widthType]] : [widthType] == 'global' ? '1' : '1 1 1 1',
                unit: value.unit ? value.unit : 'px',
                widthType: widthType,
            }

        onChange(Object.assign({}, value, { openBorder: (type == 'type' && newValue == '') ? 0 : 1 }, { [type]: newValue }, type == 'type' ? customDefaultValues : type == 'widthType' ? { openBorder: !value[newValue] ? 0 : value.openBorder } : {}))
    }
    updateUnit = (newUnit) => {
        const { onChange, value } = this.props
        let newBorder = JSON.parse(JSON.stringify(value))
        newBorder.unit = newUnit
        newBorder.widthType = value.widthType ? value.widthType : this.state.defaultWidthType
        newBorder.openBorder = value.openBorder ? value.openBorder : 1
        onChange(newBorder)
    }

    render() {
        const { value, unit, label, min, max, responsive, device, onDeviceChange, responsiveGroup } = this.props
        const { defaultUnit, defaultWidthType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.wprigDevice
        const values = responsive || responsiveGroup ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']

        const global = responsive || responsiveGroup ? value.global && value.global[responsiveDevice] ? value.global[responsiveDevice] : ''
            :
            value.global ? value.global : ''
        let iterator = ['top', 'right', 'bottom', 'left']
        return (
            <div className="wprig-field-border wprig-field">

                <div className="wprig-field wprig-field-border wprig-d-flex wprig-align-center">
                    <div>
                        {this.props.label ? this.props.label : __('Border')}
                    </div>
                    <div className="wprig-field-button-list wprig-ml-auto">
                        {
                            [['solid', __('Solid')], ['dotted', __('Dotted')], ['dashed', __('Dashed')], ['double', __('Double')]].map((data, index) => {
                                return (
                                    <Tooltip text={data[1]}>
                                        <button className={(value.type == data[0] ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.setSettings('type', data[0])}>
                                            <span className={`wprig-field-border-type wprig-field-border-type-${data[0]}`} />
                                        </button>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                    {(value.type) &&
                        <Tooltip text={__('Clear')}>
                            <div className="wprig-ml-10">
                                <span className="wprig-border-clear" onClick={() => this.setSettings('type', '')} role="button"><i className="fas fa-undo"/></span>
                            </div>
                        </Tooltip>
                    }
                </div>

                {value.type &&
                    <Fragment>
                        <Color
                            label={this.props.label ? this.props.label + __(' Color') : __('Border Color')}
                            value={value.color}
                            onChange={val => this.setSettings('color', val)}
                        />

                        {unit &&
                            <div className="wprig-unit-btn-group wprig-d-block wprig-text-right">
                                {(typeof unit == 'object' ? unit : ['px', 'em']).map(unitName => (
                                    <button className={(value.unit ? unitName == value.unit : unitName == defaultUnit) ? 'active' : ''}
                                        onClick={() => this.updateUnit(unitName)}>
                                        {unitName}</button>
                                ))}
                            </div>
                        }
                        <div className="wprig-field wprig-field-border wprig-d-flex wprig-align-center">
                            <div>
                                {this.props.label ? this.props.label + __(' Width') : __('Border Width')}
                            </div>
                            {responsive && <Device device={responsiveDevice} commonResponsiveDevice={device} className="wprig-ml-10" onChange={val => { device ? onDeviceChange(val) : this.setState({ device: val }) }} />}
                            <div className="wprig-field-button-list wprig-ml-auto">
                                {
                                    ['global', 'custom'].map((data, index) => {
                                        return (
                                            <button className={(value.widthType == data ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.setSettings('widthType', data)}>
                                                {data == 'global' ?
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.971 15.059v.941h-16v-16h16v15.058zm-1.882-.941v-12.235h-12.235v12.235h12.235z" className="wprig-svg-fill" /></svg>
                                                    :
                                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g className="wprig-svg-fill"><path d="M2.794 0h10.353v1.882h-10.353z" /><path d="M15.97 2.824v10.353h-1.882v-10.353z" /><path d="M1.853 2.823v10.353h-1.882v-10.353z" /><path d="M2.794 14.118h10.353v1.882h-10.353z" /></g></svg>
                                                }
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {(!value.widthType || value.widthType == 'global') ?
                            <div className="wprig-d-flex wprig-align-center wprig-field">
                                <div className="wprig-w-100">
                                    <Range
                                        value={global}
                                        onChange={val => this.updateBorder('global', val)}
                                        min={min || 0}
                                        max={max || 10}
                                        step={1}
                                    />
                                </div>
                            </div>
                            :
                            <Fragment>
                                {
                                    iterator.map((item, index) => {
                                        return (
                                            <div className="wprig-d-flex wprig-align-center wprig-field">
                                                <div className="wprig-mr-15">
                                                    {icons.border[item]}
                                                </div>
                                                <div className="wprig-w-100">
                                                    <Range
                                                        value={values[index] || ''}
                                                        onChange={val => this.updateBorder(iterator[index], val)}
                                                        min={min || 0}
                                                        max={max || 10}
                                                        step={1}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Fragment>
                        }

                        {this.props.separator &&
                            <Separator />
                        }
                    </Fragment>
                }
            </div>
        )
    }
}
export default Border 
