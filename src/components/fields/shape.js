import '../css/shape.scss';
import Range from './range';
import Color from './color';
import Toggle from './toggle';
import icons from '../../helpers/icons';
const { __ } = wp.i18n;
const {
    Component,
    Fragment
} = wp.element;
const {
    Tooltip,
    Dropdown,
    CheckboxControl,
} = wp.components;

class Shape extends Component {
        constructor(props) {
        super(props);
        this.state = {
            showShapeOptions: false
        }
    }

    setSettings(type, val) {
        const { value, onChange, shapeType } = this.props
        const styleVal = type == 'style' && val == '' ? { openShape: 0 } : { openShape: 1 }
        onChange(Object.assign({}, value, styleVal, { shapeType }, { [type]: val }))
    }

    renderShapeOptions = () => {
        const { value } = this.props
        let shapes = ['clouds-flat', 'clouds-opacity', 'paper-torn', 'pointy-wave', 'rocky-mountain', 'single-wave', 'slope-opacity', 'slope', 'waves3-opacity', 'drip', 'turning-slope', 'hill-wave', 'hill', 'line-wave', 'swirl', 'wavy-opacity', 'zigzag-shark']

        if (value.style) {
            shapes = shapes.filter(item => item.toLowerCase().search(value.style.toLowerCase()) == -1)
            shapes = [value.style, ...shapes]
        }
        console.log(wprig_admin );
        return (
            <ul className="wprig-shape-picker-options">
                {shapes.map(item => <li className={`wprig-shape-picker-option`} onClick={() => this.setSettings('style', item)} dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[item] }} style={value.style == item ? { fill: value.color } : {}} />)}
            </ul>
        )
    }
    render() {
        const { value } = this.props;
        const { showShapeOptions } = this.state;
        return (
            <div className="wprig-field-shape wprig-field">
                <div className="wprig-field-child">
                    <div className="wprig-field wprig-shape-picker-wrapper">
                        <Dropdown
                            className={`wprig-field-child wprig-shape-picker ${value.style ? 'has-value' : ''}`}
                            contentClassName="wprig-shape-picker-content"
                            position="bottom center"
                            renderToggle={({ isOpen, onToggle }) =>
                            <div className="shape-divider-options">
                                    <button isPrimary onClick={onToggle} aria-expanded={isOpen} >
                                        {
                                            value.style ?
                                                <div className="wprig-field-shape-value" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[value.style] }} />
                                                :
                                                <div className="wprig-field-shape-placeholder">
                                                    <span>Select Shape</span>
                                                    <span className="wprig-icon">{showShapeOptions ? icons.arrow_up : icons.arrow_down}  </span>
                                                </div>
                                        }
                                    </button>
                                </div>
                            }
                            renderContent={() => this.renderShapeOptions()}
                        />
                        {
                            value.style &&
                            <Tooltip text={__('Clear')}>
                                <div className="wprig-ml-10">
                                    <span className="wprig-shape-clear" onClick={() => this.setSettings('style', '')} role="button"><i className="fas fa-undo" /></span>
                                </div>
                            </Tooltip>
                        }

                    </div>

                    {value.openShape == 1 &&
                        <Fragment>
                            <Color
                                label={__('Color')}
                                value={value && value.color}
                                onChange={val => this.setSettings('color', val)}
                            />
                            <Range
                                min={100}
                                max={1000}
                                responsive
                                step={1}
                                allowReset
                                value={value.width}
                                beforeIcon="leftright"
                                label={__('Shape Width')}
                                unit={['px', 'em', '%']}
                                onChange={val => this.setSettings('width', val)}
                            />
                            <Range
                                min={0}
                                max={500}
                                responsive
                                step={1}
                                allowReset
                                beforeIcon="sort"
                                value={value.height}
                                unit={['px', 'em', '%']}
                                label={__('Shape Height')}
                                onChange={val => this.setSettings('height', val)}
                            />
                            <Toggle
                                value={value.flipShapeDivider}
                                label={__('Flip Divider')}
                                onChange={newValue => this.setSettings('flipShapeDivider', newValue)}
                            />
                            <CheckboxControl
                                label={__('Bring to front')}
                                isChecked={value.front == 1 ? true : false}
                                onChange={val => this.setSettings('front', val ? 1 : 0)}
                            />
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}
export default Shape