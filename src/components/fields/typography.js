import '../css/typography.scss';
const { __ } = wp.i18n;
import Range from './range';
import Toggle from './toggle';
import classnames from 'classnames';
import icons from '../../helpers/icons';
import ButtonGroup from './buttongroup';
import FontList from "./assets/fontList";
const { Component, Fragment } = wp.element;
const { Dropdown, Tooltip, SelectControl ,ColorPicker} = wp.components;
const { createHigherOrderComponent } = wp.compose;

import Color from './color'

class Typography extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFontFamily: false,
            filterText: '',
            changeType: '',
            showFontFamiles: false,
            showFontWeights: false,
        }

        // console.log(props)
    }
    async  componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (event) => {
        const { showFontFamiles, showFontWeights } = this.state
        if (showFontFamiles) {
            const wprigFontFamilyWrapper = this.refs.wprigFontFamilyWrapper
            const wprigSelectedFontFamily = this.refs.wprigSelectedFontFamily
            if (wprigFontFamilyWrapper && !wprigFontFamilyWrapper.contains(event.target)) {
                wprigSelectedFontFamily && !wprigSelectedFontFamily.contains(event.target) && this.setState({ showFontFamiles: false })
            }
        } else if (showFontWeights) {
            const wprigFontWeightWrapper = this.refs.wprigFontWeightWrapper
            const wprigSelectedFontWeight = this.refs.wprigSelectedFontWeight
            if (wprigFontWeightWrapper && !wprigFontWeightWrapper.contains(event.target)) {
                wprigSelectedFontWeight && !wprigSelectedFontWeight.contains(event.target) && this.setState({ showFontWeights: false })
            }
        }

    }

    _getWeight() {
        const { value } = this.props
        if (value && value.family) {
            return FontList.filter(o => { return o.n == value.family })[0].v
        } else {
            return [100, 200, 300, 400, 500, 600, 700, 800, 900];
        }
    }

    setSettings(type, val) {
        let prevValue = this.props.value
        if (val == 'default' || val == 'Default') {
            if (type == 'family') {
                delete prevValue.family
                delete prevValue.type
            } else if (type == 'weight') {
                delete prevValue.weight
            }
            this.props.onChange(Object.assign({}, prevValue))
        } else {
            if (type == 'family' && val) {
                val = { [type]: val, type: (FontList.filter(o => { return o.n == val })[0].f) }
            } else {
                val = {
                    [type]: val,
                    ...(type === 'globalSource' && { activeSource: 'global' })
                }                
            }
            this.props.onChange(Object.assign({}, prevValue, val))
        }


    }
    findArrayIndex = (font) => {
        let index = 0
        let wprigFonts = JSON.parse(localStorage.getItem('wprigFonts'))
        while (index < 10) {
            if (wprigFonts[index].n == font) {
                break
            }
            index++
        }
        return index
    }
    handleColorChange(val) {
        // console.log(val);
        this.setSettings('color', val) 

    }
    handleTypographyChange(val) {
        this.setSettings('family', val)

        let wprigFonts = JSON.parse(localStorage.getItem('wprigFonts'))
        let selectedFont = FontList.filter(font => font.n == val)

        if (wprigFonts) {
            let oldFont = wprigFonts.filter(font => font.n == val).length > 0
            if (oldFont) {
                let index = this.findArrayIndex(val)
                wprigFonts.splice(index, 1)
                wprigFonts.unshift(...selectedFont)
            } else {
                wprigFonts.unshift(...selectedFont)
                wprigFonts.length > 10 && wprigFonts.pop()
            }

        } else {
            wprigFonts = [...selectedFont]
        }

        localStorage.setItem('wprigFonts', JSON.stringify(wprigFonts))
    }
    render() {
        const {
            value,
            label,
            device,
            color,
            globalSource,
            globalSettings,
            onDeviceChange,
            globalTypoOptions,
            globalTypoValues,             
        } = this.props;

        const {
            filterText,
            showFontFamiles,
            showFontWeights,
        } = this.state;

        let wprigFonts = JSON.parse(localStorage.getItem('wprigFonts'));
        let filteredFontList = [], newFontList = FontList;
        if (wprigFonts) {
            filteredFontList = FontList.filter(font => !wprigFonts.filter(wprigFont => wprigFont.n == font.n || font.n == 'Default').length > 0)
            newFontList = [
                { n: 'Default', f: 'default', v: [] },
                ...wprigFonts,
                ...filteredFontList
            ]
        }
        if (filterText.length >= 2) {
            newFontList = newFontList.filter(item =>
                item.n.toLowerCase().search(filterText.toLowerCase()) !== -1
            )
        }
        return (
            <div className="wprig-field wprig-field-typography">
                {
                    !globalSettings && <Toggle
                        value={value.openTypography}
                        label={label || __('Typography')}
                        onChange={val => this.setSettings('openTypography', val)}
                    />
                }

                {

       
                    ((value && value.openTypography == 1) || globalSettings) &&
                    <Fragment>
       
                        {
                            !globalSettings &&
                            <ButtonGroup
                                label={__('Source')}
                                options={
                                    [
                                        [__('Global'), 'global'],
                                        [__('Custom'), 'custom']
                                    ]
                                }
                                value={typeof value.activeSource !== 'undefined' ? value.activeSource : 'custom'}
                                onChange={newSource => {
                                    if (newSource === 'custom') {
                                        if (typeof value.globalSource === 'undefined' || typeof value.activeSource === 'undefined') {
                                            this.props.onChange(
                                                {
                                                    ...value,
                                                    activeSource: newSource,
                                                }
                                            );
                                        } else if (typeof value.globalSource !== 'undefined' && value.globalSource !== 'none') {
                                            this.props.onChange(
                                                {
                                                    ...globalTypoValues[value.globalSource - 1],
                                                    activeSource: newSource,
                                                    globalSource: value.globalSource,
                                                    blockDefaultValues: value.blockDefaultValues
                                                }
                                            );
                                        } else if (typeof value.globalSource !== 'undefined' && value.globalSource === 'none') {
                                            this.props.onChange(
                                                {
                                                    openTypography: true,
                                                    globalSource: 'none',
                                                    activeSource: 'custom',
                                                    ...value.blockDefaultValues,
                                                    blockDefaultValues: value.blockDefaultValues
                                                }
                                            );
                                        }
                                    } else {
                                        let tempBlockDefaults;
                                        const newValue = {
                                            openTypography: true,
                                            activeSource: 'global',
                                            globalSource: typeof value.globalSource === 'undefined' ? 'none' : value.globalSource,
                                            blockDefaultValues: value.blockDefaultValues
                                        }

                                        if ((typeof value.activeSource === 'undefined' || value.activeSource === 'custom') && (value.globalSource === 'none' || typeof value.globalSource === 'undefined')) {
                                            tempBlockDefaults = JSON.parse(JSON.stringify(value));
                                            delete tempBlockDefaults.activeSource;
                                            delete tempBlockDefaults.globalSource;
                                            delete tempBlockDefaults.blockDefaultValues;
                                            newValue.blockDefaultValues = tempBlockDefaults;
                                        }
                                        this.props.onChange(newValue);
                                    }
                                }
                                }
                            />
                        }

                        {
                            ((value.activeSource === 'global') && !globalSettings) ?
                                <SelectControl
                                    label="Size"
                                    value={typeof value.globalSource !== 'undefined' ? value.globalSource : 'none'}
                                    options={globalTypoOptions}
                                    onChange={newValue => {
                                        
                                        if (newValue === 'none' && value.globalSource !== 'none') {
                                            const temp = {
                                                openTypography: true,
                                                activeSource: 'global',
                                                globalSource: newValue,
                                                blockDefaultValues: value.blockDefaultValues
                                            }
                                            this.props.onChange(temp);
                                        } else {
                                            this.setSettings('globalSource', newValue);
                                        }
                                    }}
                                />
                                :
                                <Fragment>
                                    <Range
                                        unit
                                        step={1}
                                        min={8}
                                        max={200}
                                        responsive
                                        device={device}
                                        label={__('Font Size')}
                                        value={value && value.size}
                                        onChange={val => this.setSettings('size', val)}
                                        onDeviceChange={value => onDeviceChange(value)}
                                    />

                                    <div className="wprig-field-group wprig-65-35">
                                        <div className="wprig-field wprig-field-font-family">
                                            <label>{__('Font Family')}</label>
                                            <div className="wprig-font-family-picker" ref="wprigSelectedFontFamily"
                                                onClick={() => {
                                                    this.setState({ showFontFamiles: !showFontFamiles })
                                                }}>
                                                <span className="wprig-font-family-search-wrapper">
                                                    <input
                                                        type="text"
                                                        className={`wprig-font-family-search${!showFontFamiles ? ' selected-font-family' : ''}`}
                                                        placeholder={__(showFontFamiles ? 'Search' : value && value.family || 'Select')}
                                                        value={filterText}
                                                        onChange={e => this.setState({ filterText: e.target.value })} />
                                                    <span className="wprig-font-select-icon">   {showFontFamiles ? icons.arrow_up : icons.arrow_down}  </span>
                                                </span>
                                            </div>
                                        </div>
                                        {
                                            showFontFamiles && <div className="wprig-font-family-option-wrapper" ref="wprigFontFamilyWrapper">
                                                <div className="wprig-font-family-options" >
                                                    {newFontList.length > 0 ?
                                                        newFontList.map((font, index) => {
                                                            let isActiveFont = false;
                                                            if (value && (font.n == value.family)) {
                                                                isActiveFont = true;
                                                            }
                                                            let fontClasses = classnames(
                                                                { ['wprig-font-family-option']: !isActiveFont },
                                                                { ['wprig-active-font-family']: isActiveFont }
                                                            )
                                                            return (
                                                                <div className={fontClasses}
                                                                    id={`wprig-font-family-${index}`}
                                                                    onClick={() => {
                                                                        this.setState({ showFontFamiles: false, filterText: '' });
                                                                        font.n == 'Default' ? this.setSettings('family', 'default') : this.handleTypographyChange(font.n)
                                                                    }}
                                                                >
                                                                    {font.n}
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <div className={`wprig-font-family-option no-match`} onClick={() => this.setState({ showFontFamiles: false, filterText: '' })}  >  No matched font  </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <div className="wprig-field wprig-field-font-weight">
                                            <label>{__('Weight')}</label>
                                            <div className="wprig-font-weight-picker-wrapper" ref="wprigSelectedFontWeight" onClick={() => this.setState({ showFontWeights: !showFontWeights })}>
                                                <div className="wprig-font-weight-picker" >  {value && value.weight || 'Select'}   </div>
                                                <span className="wprig-font-select-icon">   {showFontWeights ? icons.arrow_up : icons.arrow_down}  </span>
                                            </div>
                                        </div>
                                        {
                                            showFontWeights && <div className="wprig-font-weight-wrapper" ref="wprigFontWeightWrapper">
                                                <div className="wprig-font-family-weights" >
                                                    {
                                                        ['Default', ...this._getWeight()].map(font => {
                                                            return (
                                                                <div className={`${font == value.weight ? 'wprig-active-font-weight' : 'wprig-font-weight-option'}`}
                                                                    onClick={() => { this.setState({ showFontWeights: false }); this.setSettings('weight', font) }}
                                                                >
                                                                    {font}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <div className="wprig-field wprig-field-font-color">

                                         <Color label={__('Text Color')} value={value.color} onChange={(value) => {this.handleColorChange(value);  }} />
                          

                                        </div>
                                    </div>

                                    <Dropdown
                                        className="wprig-field"
                                        renderToggle={({ isOpen, onToggle }) => (
                                            <div className="wprig-d-flex wprig-align-center">
                                                <label>{__('Advanced Typography')}</label>
                                                <div className="wprig-field-button-list wprig-ml-auto">
                                                    <button className={(isOpen == 1 ? 'active' : '') + ' wprig-button wprig-button-rounded'} onClick={onToggle} aria-expanded={isOpen}>
                                                        <svg>
                                                            <use xlinkHref={wprig_admin.plugin +"assets/img/admin/font-awesome/solid.svg#cog"}></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        renderContent={() => (
                                            <div style={{ padding: '15px' }}>
                                                {!this.props.disableLineHeight &&
                                                    <Range
                                                        label={__('Line Height')}
                                                        value={value && value.height}
                                                        onChange={val => this.setSettings('height', val)}
                                                        min={8}
                                                        max={200}
                                                        step={1}
                                                        unit
                                                        responsive
                                                        device={device}
                                                        onDeviceChange={value => onDeviceChange(value)}
                                                    />
                                                }
                                                <Range
                                                    label={__('Letter Spacing')}
                                                    value={value && value.spacing}
                                                    onChange={val => this.setSettings('spacing', val)}
                                                    min={-10}
                                                    max={30}
                                                    step={1}
                                                    unit
                                                    responsive
                                                    device={device}
                                                    onDeviceChange={value => onDeviceChange(value)}
                                                />
                                                <div className="wprig-field wprig-d-flex wprig-align-center">
                                                    <div>
                                                        {__('Text Transform')}
                                                    </div>
                                                    <div className="wprig-field-button-list wprig-ml-auto">
                                                        {
                                                            ['none', 'capitalize', 'uppercase', 'lowercase'].map((data, index) => {
                                                                return (
                                                                    <Tooltip text={data.charAt(0).toUpperCase() + data.slice(1)}>
                                                                        <button className={(value.transform == data ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.setSettings('transform', data)}>
                                                                            {data == 'none' &&
                                                                                <svg>
                                                        <use xlinkHref={wprig_admin.plugin +"assets/img/admin/font-awesome/solid.svg#ban"}></use>
                                                    </svg>
                                                                            }
                                                                            {data == 'capitalize' &&
                                                                                <span>Aa</span>
                                                                            }
                                                                            {data == 'uppercase' &&
                                                                                <span>AA</span>
                                                                            }
                                                                            {data == 'lowercase' &&
                                                                                <span>aa</span>
                                                                            }
                                                                        </button>
                                                                    </Tooltip>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    />

                                </Fragment>
                        }
                    </Fragment>
                }


            </div>
        )
    }
}

function withGLobalTypography(initialState = {}) {
    return createHigherOrderComponent((OriginalComponent) => {
        return class WrappedComponent extends Component {
            constructor() {
                super(...arguments);

                this.setState = this.setState.bind(this);

                this.state = initialState;
            }
            componentDidMount() {
                this.getGlobalSettings();


            }
            getGlobalSettings = async () => {
                let wprigGlobalSettings = await JSON.parse(localStorage.getItem('wprig-global-settings'));
                const { typography } = wprigGlobalSettings;
                let options = [], values = [];
                if (typeof typography !== 'undefined') {
                    typography.forEach(({ name, value }, index) => {
                        options.push({ label: name, value: index + 1 });
                        values.push(value);
                    });
                    this.setState({
                        typography: typography,
                        globalTypoOptions: [{ label: 'Default', value: 'none' }, ...options],
                        globalTypoValues: values
                    });
                }
            }

            render() {
                return (
                    <OriginalComponent
                        {...this.props}
                        {...this.state}
                        setState={this.setState}
                    />
                );
            }
        };
    }, 'withGLobalTypography');
}

export default withGLobalTypography()(Typography);
