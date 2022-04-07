import '../css/buttongroup.scss'
import Device from './device'
const { useState } = wp.element
const { Button, ButtonGroup } = wp.components

export default function ({ label, options, value, onChange, additionalClass, responsive, device: activeDevice, onDeviceChange }) {

    const [device, setDevice] = useState('md')
    let responsiveDevice = responsive ? activeDevice ? activeDevice : device : window.wprigDevice

    const getValue = () => value ? (responsive ? (value[responsiveDevice] || '') : value) : '';
    const onButtonClick = val => onChange(responsive ? Object.assign({}, value, { [responsiveDevice]: val }) : val);

    const updateDevice = newDevice => {
        if (typeof activeDevice !== 'undefined') onChange({ ...value, device: newDevice });
        setDevice(newDevice);
    }

    return (
        <div className={'wprig-field-group-btn wprig-field ' + (responsive ? 'wprig-responsive' : 'wprig-d-flex')}>

            {responsive &&
                <div className="wprig-d-flex wprig-align-center wprig-mb-10">
                    {label && <label> {label} </label>}
                    {responsive && <Device device={responsiveDevice} commonResponsiveDevice={device} className="wprig-ml-10" onChange={val => { device && onDeviceChange ? onDeviceChange(val) : updateDevice(val) }} />}
                </div>
            }

            {!responsive && label && <label> {label} </label>}

            <ButtonGroup className="wprig-field-child wprig-d-flex">
                {options.map(([title, option]) => {
                    const activeBtn = option === getValue() ? 'qubley-active-group-btn' : ''
                    return (<Button className={`qubley-group-button ${activeBtn}${additionalClass ? ` ${additionalClass}` : ''}`} onClick={() => onButtonClick(option)}>{title}</Button>)
                })}
            </ButtonGroup>
        </div>
    )
}