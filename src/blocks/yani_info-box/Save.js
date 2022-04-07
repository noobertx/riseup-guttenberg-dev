const { Fragment, Component } = wp.element;
const { RichText } = wp.blockEditor
import svg from '../advance-heading/separators';
const { WPRigButtonSave } = wp.wprigComponents
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents;

class Save extends Component {
	render() {
		const {
			uniqueId,
			layout,
			mediaType,
			enableTitle,
			titleLevel,
			title,
			separatorStyle,
			separatorPosition,
			enableContent,
			content,
			iconName,
			image,
			image2x,
			imgAlt,
			imageType,
			externalImageUrl,
			number,
			enableButton,
			animation,
			subTitle,
			subTitleLevel,
			subTitleContent,
			buttonFillType,
			buttonSize,
			buttonText,
			buttonUrl,
			buttonIconName,
			buttonIconPosition,
			useMediaBg,
			interaction
		} = this.props.attributes

		const separators = {
			solid: { type: 'css', separator: 'solid', width: 300, stroke: 10 },
			double: { type: 'css', separator: 'double', width: 300, stroke: 10 },
			dotted: { type: 'css', separator: 'dotted', width: 300, stroke: 10 },
			dashed: { type: 'css', separator: 'dashed', width: 300, stroke: 10 },
			pin: { type: 'svg', separator: 'pin', svg: svg['pin'], width: 100, stroke: 0 },
			pin_filled: { type: 'svg', separator: 'pin_filled', svg: svg['pin_filled'], width: 100, stroke: 0 },
			zigzag: { type: 'svg', separator: 'zigzag', svg: svg['zigzag'], style: 'fill', width: 88, stroke: 5 },
			zigzag_large: { type: 'svg', separator: 'zigzag_large', svg: svg['zigzag_large'], style: 'fill', width: 161, stroke: 5 },
		}

		const renderSeparators = <Fragment>
			{separatorStyle &&
				<Fragment>
					{separators[separatorStyle].type == 'css' &&
						<span className={`wprig-separator-type-css wprig-separator-${separatorStyle}`} />
					}
					{separators[separatorStyle].type == 'svg' &&
						<span className={`wprig-separator-type-svg wprig-separator-${separatorStyle}`}>{separators[separatorStyle].svg}</span>
					}
				</Fragment>
			}
		</Fragment>

		const titleTagName = 'h' + titleLevel;
		const subTitleTagName = 'h' + subTitleLevel;
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';

		return (
			<div className={`wprig-block-${uniqueId}`} {...animationAttr(animation)}>
				<div className={`wprig-block-info-box ${interactionClass} wprig-info-box-layout-${layout}`}>
					{(layout != 4 && mediaType) &&
						<div className={`wprig-info-box-media${useMediaBg ? ' wprig-media-has-bg' : ''}`}>
							{(mediaType == 'icon' && iconName) &&
								<i className={"wprig-info-box-icon " + iconName} />
							}
							{(mediaType == 'image') &&
								<Fragment>
									{
										(imageType === 'local' && image.url != undefined) ?
											<img className="wprig-info-box-image" src={image.url} srcset={image2x.url != undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''} alt={imgAlt && imgAlt} />
											:
											(imageType === 'external' && externalImageUrl.url != undefined) ?
												<img className="wprig-info-box-image" src={externalImageUrl.url} alt={imgAlt && imgAlt} />
												:
												<div className="wprig-info-box-image wprig-image-placeholder"><i className="far fa-image" /></div>
									}
								</Fragment>
							}
							{(mediaType == 'number' && number) &&
								<span className="wprig-info-box-number">{number}</span>
							}
						</div>
					}

					<div className="wprig-info-box-body">
						<div className={`wprig-info-box-title-container ${separatorStyle ? 'wprig-has-separator' : ''} ${separatorPosition ? 'wprig-separator-position-' + separatorPosition : ''}`}>
							<div className="wprig-info-box-title-inner">
								{separatorStyle && (separatorPosition == 'left' || separatorPosition == 'top' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-before">{renderSeparators}</div> : ''}
								{enableTitle == 1 &&
								<RichText.Content tagName={titleTagName} className="wprig-info-box-title" value={title} />
								}
								{separatorStyle != '' && (separatorPosition == 'right' || separatorPosition == 'bottom' || separatorPosition == 'leftright') ? <div className="wprig-separator wprig-separator-after">{renderSeparators}</div> : ''}
							</div>
							{subTitle == 1 &&
								<div className="wprig-info-box-sub-title-container">
									<RichText.Content tagName={subTitleTagName} className="wprig-info-box-sub-title" value={subTitleContent} />
								</div>
							}
						</div>

						{
							enableContent &&
							<div className="wprig-info-box-content">
								<RichText.Content tagName='div' className="wprig-info-box-text" value={content} />
							</div>
						}
						{enableButton &&
							<WPRigButtonSave
								buttonFillType={buttonFillType}
								buttonSize={buttonSize}
								buttonText={buttonText}
								buttonIconName={buttonIconName}
								buttonIconPosition={buttonIconPosition}
								buttonUrl={buttonUrl}
								buttonTag='a'
							/>
						}
					</div>
				</div>
			</div>
		)
	}
}
export default Save