const { Component } = wp.element
const { RichText } = wp.blockEditor;
class Save extends Component {
	render() {
		const { attributes } = this.props;
		const alignmentClass = (attributes.textAlignment != null) ? 'has-text-align-' + attributes.textAlignment : '';
		
		return (
			<div>
				<RichText.Content 
					tagName="h2"
					value={attributes.myRichHeading}
				/>
				<RichText.Content 
					tagName="p"
					value={attributes.myRichText}
				/>
				{attributes.activateLasers && 
					<div className="lasers">Lasers activated</div>
				}
			</div>
		);
	}
}
export default Save