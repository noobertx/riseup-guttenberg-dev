import classnames from 'classnames';
const { Component } = wp.element;
const { RichText } = wp.blockEditor
const { HelperFunction: { animationAttr, IsInteraction } } = wp.wprigComponents;

class Save extends Component {
	render() {
		const { uniqueId, layout, imageType, alignmentLayout3, image, image2x, externalImageUrl, name, designation, description, useInfoIcon, phone, email, website, showSociallinks, facebook, twitter, instagram, linkedin, youtube, github, flickr, pinterest, dribbble, behance, iconStyle, iconUseDefaultStyle, enableDesignation, enableDescription, animation, interaction } = this.props.attributes
		const interactionClass = IsInteraction(interaction) ? 'qubley-block-interaction' : '';
		const wrapperClasses = classnames(
			{ [`wprig-block-${uniqueId}`]: uniqueId },
			{ ['right-alignment']: alignmentLayout3 === 'right' }
		);
		return (
			<div className={wrapperClasses} {...animationAttr(animation)}>
				<div className={`wprig-block-team ${interactionClass} wprig-team-layout-${layout}`}>
					<div className="wprig-team-image-wrapper">
						{(imageType === 'local' && image.url != undefined) ?
							<img className="wprig-team-image" src={image.url} srcset={image2x.url != undefined ? image.url + ' 1x, ' + image2x.url + ' 2x' : ''} alt={name} />
							:
							(imageType === 'external' && externalImageUrl.url != undefined) ?
								<img className="wprig-team-image" src={externalImageUrl.url} alt={name} />
								:
								<div className="wprig-image-placeholder"><i className="far fa-image" /></div>
						}
					</div>
					<div className="wprig-team-content">
						<div className="wprig-team-content-inner">
							<RichText.Content tagName='span' className="wprig-team-name" value={name} />
							{enableDesignation == 1 &&
								<div className="wprig-team-designation-container">
									<RichText.Content tagName="span" className="wprig-team-designation" value={designation} />
								</div>
							}
							{enableDescription == 1 &&
								<RichText.Content tagName="div" className="wprig-team-description" value={description} />
							}
							{(phone || email || website) &&
								<div className="wprig-team-information">
									{phone &&
										<div className={`wprig-team-information-phone`}>
											{useInfoIcon &&
												<i className="wprig-info-icon fas fa-phone" aria-label={__('Phone')} />
											}
											<span>{phone}</span>
										</div>
									}
									{email &&
										<div className={`wprig-team-information-email`}>
											{useInfoIcon &&
												<i className={`wprig-info-icon fas fa-envelope`} aria-label={__('Email')} />
											}
											<span>{email}</span>
										</div>
									}
									{website &&
										<div className={`wprig-team-information-website`}>
											{useInfoIcon &&
												<i className={`wprig-info-icon fas fa-globe`} aria-label={__('Website')} />
											}
											<span><a>{website}</a></span>
										</div>
									}
								</div>
							}
							{showSociallinks && (facebook || twitter || instagram || linkedin || youtube || github || flickr || pinterest || dribbble || behance) &&
								<div className={`wprig-team-social-links wprig-team-icon-layout-${iconStyle} wprig-team-icon-style-${iconUseDefaultStyle == 1 ? 'default' : 'custom'}`}>
									{facebook &&
										<a href={facebook} className="wprig-team-social-facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
									}
									{twitter &&
										<a href={twitter} className="wprig-team-social-twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
									}
									{instagram &&
										<a href={instagram} className="wprig-team-social-instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
									}
									{linkedin &&
										<a href={linkedin} className="wprig-team-social-linkedin" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
									}
									{youtube &&
										<a href={youtube} className="wprig-team-social-youtube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
									}
									{github &&
										<a href={github} className="wprig-team-social-github" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
									}
									{flickr &&
										<a href={flickr} className="wprig-team-social-flickr" target="_blank" rel="noopener noreferrer"><i className="fab fa-flickr" /></a>
									}
									{pinterest &&
										<a href={pinterest} className="wprig-team-social-pinterest" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest" /></a>
									}
									{dribbble &&
										<a href={dribbble} className="wprig-team-social-dribbble" target="_blank" rel="noopener noreferrer"><i className="fab fa-dribbble" /></a>
									}
									{behance &&
										<a href={behance} className="wprig-team-social-behance" target="_blank" rel="noopener noreferrer"><i className="fab fa-behance" /></a>
									}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Save