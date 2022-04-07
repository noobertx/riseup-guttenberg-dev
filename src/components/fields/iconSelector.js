const { Component } = wp.element

class IconSelector extends Component {

    constructor(props) {
        super(props)
        this.state = { filterText: '' }
    }

    render() {
        const { value, label, icons, enableSearch, onChange } = this.props
        const { filterText } = this.state
        let finalData = []
        if (enableSearch && filterText.length >= 2) {
            finalData = icons.filter(item =>
                item.name.toLowerCase().search(filterText.toLowerCase()) !== -1
            )
        } else {
            finalData = icons
        }
        return (
            <div className="wprig-field wprig-field-icon-list wprig-field-icon-list-selector">

                {label && <label>{label}</label>}

                <div className="wprig-icon-list-wrapper">

                    {enableSearch && <input type="text" value={filterText} placeholder="Search..." onChange={e => this.setState({ filterText: e.target.value })} autoComplete="off" />}

                    <div className="wprig-icon-list-icons">
                        {finalData.map(item => {
                            return (
                                <span className={value == item ? 'wprig-active' : ''} onClick={() => onChange(item)}>
                                    <span className={item.value} />
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default IconSelector