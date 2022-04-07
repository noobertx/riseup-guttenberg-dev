const { __ } = wp.i18n
import Range from './range'
import Device from './device'
import icons from '../../helpers/icons'
const { Fragment, Component } = wp.element;
const { Tooltip } = wp.components;
const LABEL = 'Margin'

class Margin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            defaultUnit: 'px',
            defaultMarginType: 'global'
        }
    }

    updateMargin = (type, newValue) => {
        const { onChange, value, unit, responsive, responsiveGroup, device } = this.props
        const { defaultUnit, defaultMarginType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.wprigDevice

        const [top, right, bottom, left] = responsive || responsiveGroup ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']
        let newMargin = JSON.parse(JSON.stringify(value))
        let tempMargin = type === 'global' ? `${newValue}` : `${type == 'top' ? `${newValue}` : `${top}`} ${type == 'right' ? `${newValue}` : `${right}`} ${type == 'bottom' ? `${newValue}` : `${bottom}`} ${type == 'left' ? `${newValue}` : `${left}`}`


        if (type === 'global') {
            (responsive || responsiveGroup) ? newMargin.global ? newMargin.global[responsiveDevice] = tempMargin : newMargin.global = { [responsiveDevice]: tempMargin }
                :
                newMargin.global = tempMargin

        } else {
            (responsive || responsiveGroup) ? newMargin.custom ? newMargin.custom[responsiveDevice] = tempMargin : newMargin.custom = { [responsiveDevice]: tempMargin }
                :
                newMargin.custom = tempMargin
        }

        unit && value.unit ? newMargin.unit = value.unit : newMargin.unit = defaultUnit
        newMargin.marginType = value.marginType ? value.marginType : defaultMarginType
        newMargin.openMargin = 1
        onChange(newMargin)
    }
    updateMarginType = (newType) => {
        const { onChange, value } = this.props
        let newMargin = JSON.parse(JSON.stringify(value))
        newMargin.marginType = newType
        onChange(newMargin)
    }
    updateUnit = (newUnit) => {
        const { onChange, value } = this.props
        let newMargin = JSON.parse(JSON.stringify(value))
        newMargin.unit = newUnit
        newMargin.marginType = value.marginType ? value.marginType : this.state.defaultRadiusType
        newMargin.openMargin = value.openMargin ? value.openMargin : 1
        onChange(newMargin)
    }

    render() {
        const { value, label, unit, min, max, responsive, device, onDeviceChange, responsiveGroup } = this.props
        const { defaultUnit, defaultMarginType } = this.state
        let responsiveDevice = responsive ? device ? device : this.state.device : window.wprigDevice
        const values = responsive || responsiveGroup ? value.custom && value.custom[responsiveDevice] ? value.custom[responsiveDevice].split(" ") : ['', '', '', ''] : value.custom ? value.custom.split(" ") : ['', '', '', '']

        const global = responsive || responsiveGroup ? value.global && value.global[responsiveDevice] ? value.global[responsiveDevice] : ''
            :
            value.global ? value.global : ''
        let iterator = ['top', 'right', 'bottom', 'left']
        return (
            <div className={"wprig-field-margin wprig-field" + (responsive ? ' wprig-responsive' : '')}>
                {unit &&
                    <div className="wprig-unit-btn-group wprig-d-block wprig-text-right">
                        {(typeof unit == 'object' ? unit : ['px', 'em', '%']).map(unitName => (
                            <button
                                className={(value.unit ? unitName == value.unit : unitName == defaultUnit) ? 'active' : ''}
                                onClick={() => this.updateUnit(unitName)}>
                                {unitName}
                            </button>
                        ))}
                    </div>
                }
                <div className="wprig-d-flex wprig-align-center wprig-mb-10">

                    <label htmlFor={'input'}>   {label ? label : LABEL}  </label>
                    {responsive && <Device device={responsiveDevice} commonResponsiveDevice={device} className="wprig-ml-10" onChange={val => { device ? onDeviceChange(val) : this.setState({ device: val }) }} />}

                    <div className="wprig-field-button-list wprig-ml-auto">
                        {
                            [['global', __('Global')], ['custom', __('Custom')]].map((data, index) => {
                                return (
                                    <Tooltip text={data[1]}>
                                        <button className={((value.marginType ? value.marginType == data[0] : defaultMarginType == data[0]) ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.updateMarginType(data[0])}>
                                            {data[0] == 'global' ?
                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.971 15.059v.941h-16v-16h16v15.058zm-1.882-.941v-12.235h-12.235v12.235h12.235z" className="wprig-svg-fill" /></svg>
                                                :
                                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g className="wprig-svg-fill"><path d="M2.794 0h10.353v1.882h-10.353z" /><path d="M15.97 2.824v10.353h-1.882v-10.353z" /><path d="M1.853 2.823v10.353h-1.882v-10.353z" /><path d="M2.794 14.118h10.353v1.882h-10.353z" /></g></svg>
                                            }
                                        </button>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                </div>

                {
                    (!value.marginType || value.marginType == 'global') ?
                        <div className="wprig-d-flex wprig-align-center wprig-mb-20">
                            <div className="wprig-w-100">
                                <Range
                                    value={global}
                                    onChange={val => this.updateMargin('global', val)}
                                    min={min}
                                    max={max}
                                    step={1}
                                />
                            </div>
                        </div>
                        :
                        <Fragment>
                            {
                                iterator.map((item, index) => {
                                    return (
                                        <div className="wprig-d-flex wprig-align-center wprig-mb-20">
                                            <div className="wprig-mr-15">
                                                {icons.spacing[item]}
                                            </div>
                                            <div className="wprig-w-100">
                                                <Range
                                                    value={values[index] || ''}
                                                    onChange={val => this.updateMargin(iterator[index], val)}
                                                    min={min}
                                                    max={max}
                                                    step={1}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                }
            </div>
        )
    }
}
export default Margin