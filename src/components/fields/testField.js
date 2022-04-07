const { __ } = wp.i18n
import '../css/media.scss'
const { Component } = wp.element;
const { MediaUpload } = wp.blockEditor;
export const { Tooltip, Dashicon } = wp.components;

class TestField extends Component {

	setSettings(media) {
		const { multiple, onChange, value } = this.props
		if (multiple) {
			let medias = [];
			media.forEach(single => {
				// console.log(single)
				if (single && single.url) {
					medias.push({ 
						url: single.url,
						id: single.id ,
						thumbnail: single.sizes.thumbnail.url,
						caption:single.caption,
						description:single.description
					});
				}
			});
			// console.log(JSON.stringify(medias))
			onChange(value ? value.concat(medias) : medias);
		} else {
			if (media && media.url) {
				// console.log(media)
				onChange({ 
					url: media.url,
					id: media.id ,
					thumbnail: media.sizes.thumbnail.url,
					medium: media.sizes.medium.url,
					caption:media.caption,
					description:media.description
				});
			}
		}
	}

	removeImage(id) {
		const { multiple, onChange } = this.props
		if (multiple) {
			let value = (this.props.value).slice()
			value.splice(id, 1)
			onChange(value)
		} else {
			onChange({})
		}
	}

	isUrl(url) {
		if (['wbm', 'jpg', 'jpeg', 'gif', 'png', 'svg'].indexOf(url.split('.').pop().toLowerCase()) != -1) {
			return url;
		} else {
			return wprig_admin.plugin + 'assets/img/wprig-medium.jpg';
		}
	}


	render() {
		const { type, multiple, value, panel, video } = this.props;
		return (
			<div className='wprig-media'>
				{this.props.label &&
					<label>{this.props.label}</label>
				}
				<MediaUpload
					onSelect={val => this.setSettings(val)}
					allowedTypes={type.length ? [...type] : ['image']}
					multiple={multiple || false}
					value={value}
					render={({ open }) => (
						<div className="wprig-single-img">
							<div>
								{multiple ?
									<div>
										{(value.length > 0) &&
											value.map((v, index) => {
												return (
													<span className="wprig-media-image-parent">
														<img src={this.isUrl(v.url)} alt={__('image')} width="20" height="20"/>
														{panel &&
															<div className="wprig-media-actions wprig-field-button-list">
																<Tooltip text={__('Edit')}>
																	<button className="wprig-button" aria-label={__('Edit')} onClick={open} role="button">
																		<span aria-label={__('Edit')} className="fas fa-pencil-alt fa-fw" />
																	</button>
																</Tooltip>
																<Tooltip text={__('Remove')}>
																	<button className="wprig-button" aria-label={__('Remove')} onClick={() => this.removeImage(index)} role="button">
																		<span aria-label={__('Close')} className="far fa-trash-alt fa-fw" />
																	</button>
																</Tooltip>
															</div>
														}
													</span>
												)
											})
										}
										<div onClick={open} className={"wprig-placeholder-image"}><Dashicon icon="insert" /><span>{__('Insert')}</span></div>
									</div>
									:
									((value && value.url) ?
										<span className="wprig-media-image-parent">
											{
												video ?
													<video controls autoPlay loop src={value.url} />
													:
													<img src={this.isUrl(value.url)} alt={__('image')} />
											}

											{panel &&
												<div className="wprig-media-actions wprig-field-button-list">
													<Tooltip text={__('Edit')}>
														<button className="wprig-button" aria-label={__('Edit')} onClick={open} role="button">
															<span aria-label={__('Edit')} className="fas fa-pencil-alt fa-fw" />
														</button>
													</Tooltip>
													<Tooltip text={__('Remove')}>
														<button className="wprig-button" aria-label={__('Remove')} onClick={() => this.removeImage(value.id)} role="button">
															<span aria-label={__('Close')} className="far fa-trash-alt fa-fw" />
														</button>
													</Tooltip>
												</div>
											}
										</span>
										:
										<div onClick={open} className={"wprig-placeholder-image"}><Dashicon icon="insert" /><span>{__('Insert')}</span></div>
									)
								}
							</div>
						</div>
					)}
				/>
                
			</div>
		);
	}
}
export default TestField;