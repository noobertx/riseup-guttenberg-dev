const { __ } = wp.i18n
const { RichText } = wp.blockEditor
const { useState, useEffect, useRef } = wp.element
import '../css/dropdown.scss'
import icons from '../../helpers/icons'

export default function ({ label, enableSearch, defaultOptionsLabel, value, options, onChange }) {
    const [filteredText, setFilteredText] = useState('')
    const [showOptions, toggleOptions] = useState(false)
    const wprigSelectedOptions = useRef(null);
    const wprigOptionsWraper = useRef(null);
    const filterOut = (option) => {
        let flag = true, index = 0
        while (index < value.length) {
            if (value[index].value === option) {
                flag = false
                break
            }
            index++
        }
        return flag
    }

    // const [avaiableOptions, setOptions] = useState(options.filter(option => filterOut(option.value)))

    const getAvaiableOptions = () => {
        return options.filter(option => filterOut(option.value))
    }

    const handleClickOutside = (event) => {
        if (showOptions) {
            if (!(wprigOptionsWraper.current.contains(event.target) || wprigSelectedOptions.current.contains(event.target))) {
                toggleOptions(false)
            }
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    // useEffect(() => {
    //     setOptions(options.filter(option => filterOut(option.value)))
    // }, [options]);

    const findArrayIndex = (value) => {
        let index = 0
        while (index < options.length) {
            if (options[index].value == value) {
                break
            }
            index++
        }
        return index
    }

    const renderSelectedOptions = () => {
        return (value.map(({ label }, index) => {
            return (
                <span className="wprig-dropdown-selected-value">
                    <span className="wprig-selected-value-label" role="option" aria-selected="true">   {label}  </span>
                    <span className="wprig-selected-value-icon" aria-hidden="true"
                        onClick={() => {
                            let newTaxonomies = JSON.parse(JSON.stringify(value))
                            newTaxonomies.splice(index, 1)
                            onChange(newTaxonomies)
                        }}
                    > X</span>
                </span>
            )
        }))
    }

    return (
        <div className="wprig-field wprig-field-dropdown">

            <label>{__(label)}</label>
            <div
                className="wprig-dropdown"
                ref={wprigSelectedOptions}
                onClick={() => !showOptions && toggleOptions(true)}
            >

                <span className="wprig-dropdown-selected-options-wrapper">
                    {
                        value.length ? renderSelectedOptions() : <span className="wprig-selected-value-label" role="option" aria-selected="true">{__(defaultOptionsLabel) || __('Default')}</span>
                    }
                    {
                        (enableSearch && showOptions) &&
                        <input
                            type="text"
                            className={`wprig-dropdown-options-search`}
                            placeholder={__('Search...')}
                            value={filteredText}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    toggleOptions(false)
                                    setFilteredText('')
                                    onChange([...value, options[findArrayIndex(getAvaiableOptions().filter(option => !event.target.value ? true : option.label.toLowerCase().search(event.target.value.toLowerCase()) !== -1)[0].value)]])
                                }
                            }}
                            onChange={event => setFilteredText(event.target.value)}
                        />

                    }
                </span>
                <span className="wprig-dropdown-icon" onClick={() => showOptions && toggleOptions(false)}> {showOptions ? icons.arrow_up : icons.arrow_down}  </span>
            </div>
            {
                showOptions && <div className="wprig-dropdown-options-wrapper" ref={wprigOptionsWraper}>
                    <div className="wprig-dropdown-options" >
                        {options.length > 0 ?
                            getAvaiableOptions().filter(option => !filteredText ? true : option.label.toLowerCase().search(filteredText.toLowerCase()) !== -1).map((option, index) => {
                                return (
                                    <div className={`wprig-dropdown-option`}
                                        id={`wprig-dropdown-option-${index + 1}`}
                                        onClick={() => {
                                            toggleOptions(false)
                                            setFilteredText('')
                                            onChange([...value, option])
                                        }}
                                    >
                                        {option.label}
                                    </div>
                                )
                            })
                            :
                            <div className={`wprig-dropdown-option no-match`} onClick={() => toggleOptions(false)}  >  No matched Option  </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}


