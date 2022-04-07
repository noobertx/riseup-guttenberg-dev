const { __ } = wp.i18n
import '../css/alignment.scss'
import Device from './device'
const { Fragment, Component } = wp.element;
const { Tooltip } = wp.components;

class Alignment extends Component {
    constructor(props) {
        super(props)
        this.state = { current: this._filterValue() }
    }
    _filterValue() {
        const { value, responsive, responsiveGroup } = this.props
        return value ? ((responsive || responsiveGroup) ? (value[window.wprigDevice] || '') : value) : ''
    }
    setSettings(val) {

        const { value, onChange, responsive, responsiveGroup, disableToggle } = this.props
        if (val == '' && disableToggle) {
            return
        }
        const final = (responsive || responsiveGroup) ? Object.assign({}, value, { [window.wprigDevice]: val }) : val
        onChange(final)
        this.setState({ current: final })
    }
    render() {
        const {
            label,
            responsive,
            flex,
            disableJustify,
            disableCenter,
            device,
            onDeviceChange
        } = this.props;
        
        const defData = flex ? ['flex-start', 'center', 'flex-end'] : disableJustify ? (disableCenter ? ['left', 'right'] : ['left', 'center', 'right']) : ['left', 'center', 'right', 'justify'];

        return (
            <div className={'wprig-field-alignment wprig-field ' + (this.props.responsive ? 'wprig-responsive' : '')} >
                <div className="wprig-d-flex wprig-align-center wprig-mb-10">
                    {label && <label>{label}</label>}
                    {responsive &&
                        <div className="wprig-ml-auto">
                            {
                                device ?
                                    <Device device={device} commonResponsiveDevice={device} className="wprig-ml-10" onChange={(val) => onDeviceChange(val)} />
                                    :
                                    <Device onChange={(val) => this.setState({ current: val })} />
                            }

                        </div>
                    }
                </div>

                <div className="wprig-field-button-list wprig-field-button-list-fluid">
                    {defData.map((data, index) => {
                        return (<button className={(this._filterValue() == data ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.setSettings(this._filterValue() == data ? '' : data)}>
                            {this.props.alignmentType == 'content' ?
                                <Fragment>
                                    {(data == 'left' || data == 'flex-start') &&
                                        <Tooltip text={__('Left')}>
                                            <svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-29 -4) translate(29 4)" fill="none"><path d="M1 .708v15.851" className="wprig-svg-stroke" stroke-linecap="square" /><rect className="wprig-svg-fill" x="5" y="5" width="16" height="7" rx="1" /></g></svg>
                                        </Tooltip>
                                    }
                                    {data == 'center' &&
                                        <Tooltip text={__('Middle')}>
                                            <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-115 -4) translate(115 4)" fill="none"><path d="M8 .708v15.851" className="wprig-svg-stroke" stroke-linecap="square" /><rect className="wprig-svg-fill" y="5" width="16" height="7" rx="1" /></g></svg>
                                        </Tooltip>
                                    }
                                    {(data == 'right' || data == 'flex-end') &&
                                        <Tooltip text={__('Right')}>
                                            <svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1) rotate(-180 10.5 8.5)" fill="none"><path d="M1 .708v15.851" className="wprig-svg-stroke" stroke-linecap="square" /><rect className="wprig-svg-fill" fill-rule="nonzero" x="5" y="5" width="16" height="7" rx="1" /></g></svg>
                                        </Tooltip>
                                    }
                                </Fragment>
                                :
                                <i className={'fa fa-align-' + data} />
                            }
                        </button>)
                    })}
                </div>
            </div>
        )
    }
}
export default Alignment