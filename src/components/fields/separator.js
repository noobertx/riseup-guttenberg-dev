import '../css/separator.scss'
const { Component } = wp.element;
class Separator extends Component {
    render() {
        const { label, customClassName } = this.props
        return (
            <div className={`wprig-field-separator wprig-field ${ label != '' ? 'wprig-has-label' : '' } ${customClassName ? customClassName : ''}`}>
                {label &&
                    <label>{label}</label>
                }
            </div>
        )
    }
}

export default Separator;