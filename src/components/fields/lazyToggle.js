import '../css/toggle.scss'
import Device from './device'
const { Component, Fragment } = wp.element
const { ToggleControl } = wp.components

class LazyToggle extends Component {
    constructor(props) {
        super(props)
        this.state = { current: this._filterValue() }
    }

    _filterValue() {
        return this.props.value ? (this.props.responsive ? (this.props.value[window.wprigDevice] || '') : this.props.value) : ''
    }

    setSettings(val) {
        const { value, responsive, onChange } = this.props
        let final = responsive ? Object.assign({}, value, { [window.wprigDevice]: val }) : val
        onChange(final)
        this.setState({ current: val })
    }

    render() {
        const { label, customClassName, responsive, device, onDeviceChange } = this.props
        return (
            <div className={'wprig-field-toggle wprig-field' + (this.props.responsive ? ' wprig-responsive' : '') + (customClassName ? ` ${customClassName}` : '')}>
                <label>
                    {label && label}
                    {responsive &&
                        <Fragment>
                            {
                                device ?
                                    <Device device={device} commonResponsiveDevice={device} className="wprig-ml-10" onChange={val => onDeviceChange(val)} />
                                    :
                                    <Device onChange={val => this.setState({ current: val })} />
                            }

                        </Fragment>
                    }
                </label>
                <ToggleControl
                    checked={this._filterValue()}
                    onChange={(val) => this.setSettings(val)}
                />
            </div>
        )
    }
}
export default LazyToggle