const { __ } = wp.i18n
const { Component } = wp.element
import icons from '../../helpers/icons';

class Headings extends Component {
	render() {
		const { selectedLevel, onChange } = this.props;
		return (
			<div className="wprig-field wprig-field-headings">
				{this.props.label &&
					<label>{this.props.label}</label>
				}
				<div className="wprig-field-button-list wprig-field-button-list-fluid">
					{
						[1, 2, 3, 4, 5, 6].map((data, index) => {
							return (
								<button className={(selectedLevel == data ? 'active' : '') + ' wprig-button'} onClick={() => onChange(data)}>
									{icons['h' + data]}
								</button>
							)
						})
					}
				</div>
			</div>
		);
	}
}
export default Headings