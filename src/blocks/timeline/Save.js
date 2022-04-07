const { Component } = wp.element
const { RichText } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents
class Save extends Component {

  renderTimeline = () => {
	const { attributes: { timelineContents, enableContentBorder, headingLevel, enableDateTime, enableImage, connectorIcon } } = this.props

	const titleTagName = 'h' + headingLevel;

    return (timelineContents.map(({ title, date, description, image }, index) => {
      	return (
			<div key={index} className={`wprig-timeline-item wprig-timeline-${index % 2 ? 'right' : 'left'}`}>
				<div className="wprig-timeline-connector">
					{connectorIcon != '' &&
						<span className={'wprig-timeline-connector-icon ' + connectorIcon} />
					}
				</div>
				<div className={`wprig-timeline-content${enableContentBorder == 1 ? ' wprig-content-has-border' : ''}`}>
					{(enableImage == 1 && (image != undefined && image.url != undefined)) &&
						<div className={`wprig-timeline-image-container`}>
							<img src={image.url} alt={title}/>
						</div>
					}
					<div className="wprig-timeline-description">
						<RichText.Content tagName={titleTagName} className="wprig-timeline-title" value={title} />
						<RichText.Content tagName='div' className="wprig-timeline-description" value={description} />
					</div>
					<span className="wprig-timeline-indicator" />
				</div>
				{enableDateTime == 1 &&
					<div className="wprig-timeline-date-container">
						<RichText.Content tagName='div' className="wprig-timeline-date" value={date} />
					</div>
				}
			</div>
    	)
    }))
  }

  render() {
	const { attributes: { uniqueId, orientation, animation, interaction } } = this.props
	const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
    return (
      	<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
        	<div className={`wprig-block-timeline ${interactionClass} wprig-timeline-layout-vertical wprig-timeline-orientation-${orientation}`}>
				<div className={`wprig-timeline-items`}>
					{this.renderTimeline()}
				</div >
        	</div >
    	</div>
    )}
}

export default Save