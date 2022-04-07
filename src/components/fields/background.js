import Url from "./url";
import Media from './media';
import Color from "./color";
import Select from './select';
import Gradient from './gradient';
import ButtonGroup from "./buttongroup";
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Tooltip, TextControl, Dropdown } = wp.components;

// console.log(wprig_admin.plugin);

const control = {
    position: [['default', __('Default')], ['left top', __('Left Top')], ['left center', __('Left Center')], ['left bottom', __('Left Bottom')], ['right top', __('Right Top')], ['right center', __('Right Center')], ['right bottom', __('Right Bottom')], ['center top', __('Center Top')], ['center center', __('Center Center')], ['center bottom', __('Center Bottom')]],
    attachment: [['default', __('Default')], ['scroll', __('Scroll')], ['fixed', __('Fixed')]],
    repeat: [['default', __('Default')], ['no-repeat', __('No Repeat')], ['repeat', __('Repeat')], ['repeat-x', __('Repeat X')], ['repeat-y', __('Repeat Y')]],
    size: [['default', __('Default')], ['auto', __('Auto')], ['cover', __('Cover')], ['contain', __('Contain')]],
    parallax: [['none', __('None')], ['fixed', __('Fixed')], ['animated', __('Animated')]]
}

const defaultData = {
    openBg: 0,
    bgType: 'color',
    videoSource: 'local',
    bgDefaultColor: '',
    bgGradient: {},
};

class Background extends Component {

    componentWillMount() {
        const { value } = this.props
        this.props.onChange(Object.assign({}, defaultData, (value || {})));
    }

    setSettings(val, type) {
        const { value, onChange } = this.props
        if ('bgimgParallax' == type) {
            onChange(Object.assign({}, value, { bgimgAttachment: (val == 'fixed' ? val : (val == 'animated') ? 'fixed' : 'scroll'), [type]: val }));
        } else {
            onChange(Object.assign({}, value, { openBg: 1 }, { [type]: val }));
        }
    }

    localImagePicker = () => {
        const { value } = this.props
        return (
            <Media
                panel={true}
                multiple={false}
                type={['image']}
                value={value.bgImage}
                label={__('Background Image')}
                onChange={(val) => this.setSettings(val, 'bgImage')}
            />
        );
    }

    render() {
        const {
            value,
            label,
            externalImage = false,
        } = this.props
        const fieldLabel = label ? label : __('Background');

        return (
            <div className="wprig-field-background wprig-field-color-advanced wprig-field">
                <Color label={fieldLabel + ' ' + __('Color')} value={value.bgDefaultColor} onChange={(val) => this.setSettings(val, 'bgDefaultColor')} />
                <div className="wprig-mb-20 wprig-d-flex wprig-align-center">
                    <div>{__('Type')}</div>
                    <div className="wprig-field-button-list ml-auto">
                        <div class="btn-group" role="group" aria-label="Basic example">
                        {
                            this.props.sources.map((data, index) => {
                                return (
                                    <button className={((value.bgType == data && value.openBg) ? 'active' : '') + ' btn btn-outline-dark'} onClick={() => this.setSettings(data, 'bgType')}>
                                        {data == 'image' &&
                                            <Tooltip text={__('Image')}>
                                                <svg>
                                                    <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#image"}></use>
                                                </svg>
                                            </Tooltip>
                                        }
                                        {data == 'gradient' &&
                                            <Tooltip text={__('Gradient')}>
                                                <svg>
                                                    <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#paint-brush"}></use>
                                                </svg>
                                            </Tooltip>
                                        }
                                        {data == 'video' &&
                                            <Tooltip text={__('Video')}>
                                                <svg>
                                                    <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#video"}></use>
                                                </svg>
                                            </Tooltip>
                                        }
                                    </button>
                                )
                            })
                        }
                        </div>
                    </div>
                    {(value && (value.openBg == 1 && value.bgType != 'color')) &&
                        <div className="wprig-ml-10">
                            <Tooltip text={__('Clear')}>
                                <span className="wprig-border-clear" onClick={() => this.setSettings('color', 'bgType')} role="button">
                                    <svg>
                                        <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#undo"}></use>
                                    </svg>
                                </span>
                            </Tooltip>
                        </div>
                    }
                </div>

                {(value && value.openBg == 1) && (value.bgType === 'image') &&
                    <div className="wprig-background-inner">
                        {
                            externalImage ?
                                <Fragment>
                                    <ButtonGroup
                                        value={typeof value.bgimageSource !== 'undefined' ? value.bgimageSource : 'local'}
                                        label={__('Image Type')}
                                        options={
                                            [
                                                [__('Local'), 'local'],
                                                [__('External'), 'external']
                                            ]
                                        }
                                        onChange={value => this.setSettings(value, 'bgimageSource')}
                                    />
                                    {
                                        (value.bgimageSource === 'local' || typeof value.bgimageSource === 'undefined') ?
                                            this.localImagePicker()
                                            :
                                            <Url label={__('Image Source')} disableAdvanced value={typeof value.externalImageUrl !== 'undefined' ? value.externalImageUrl : {}} onChange={newUrl => this.setSettings(newUrl, 'externalImageUrl')} />
                                    }
                                </Fragment>
                                :
                                this.localImagePicker()
                        }

                        {(value.bgImage && value.bgImage.url) &&
                            <Fragment>
                                {this.props.parallax &&
                                    <div className="wprig-field wprig-d-flex wprig-align-center">
                                        <div>
                                            {__('Parallax')}
                                        </div>
                                        <div className="wprig-field-button-list wprig-ml-auto">
                                            {
                                                control.parallax.map((data, index) => {
                                                    return (
                                                        <Tooltip text={data[1]}>
                                                            <button className={(value.bgimgParallax == data[0] ? 'active' : '') + ' wprig-button'} key={index} onClick={() => this.setSettings(data[0], 'bgimgParallax')}>
                                                                {data[0] == 'none' ?
                                                                    <i className="fas fa-ban" />
                                                                    :
                                                                    data[1]
                                                                }
                                                            </button>
                                                        </Tooltip>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }

                                <Dropdown
                                    className="wprig-field"
                                    renderToggle={({ isOpen, onToggle }) => (
                                        <div className="wprig-d-flex wprig-align-center">
                                            <label>{__('Advanced')} {fieldLabel}</label>
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
                                            <Fragment>
                                                {!this.props.position &&
                                                    <Select label={fieldLabel + ' ' + __('Position')} value={value.bgimgPosition} options={control.position} onChange={(val) => this.setSettings(val, 'bgimgPosition')} />
                                                }
                                                {!this.props.parallax &&
                                                    <Select label={fieldLabel + ' ' + __('Attachment')} value={value.bgimgAttachment} options={control.attachment} onChange={(val) => this.setSettings(val, 'bgimgAttachment')} />
                                                }
                                            </Fragment>
                                            {(!this.props.size || !this.props.repeat) &&
                                                <Fragment>
                                                    {!this.props.repeat &&
                                                        <Select label={fieldLabel + ' ' + __('Repeat')} value={value.bgimgRepeat} options={control.repeat} onChange={(val) => this.setSettings(val, 'bgimgRepeat')} />
                                                    }
                                                    {!this.props.size &&
                                                        <Select label={fieldLabel + ' ' + __('Size')} value={value.bgimgSize} options={control.size} onChange={(val) => this.setSettings(val, 'bgimgSize')} />
                                                    }
                                                </Fragment>
                                            }
                                        </div>
                                    )}
                                />
                            </Fragment>
                        }
                    </div>
                }

                {(value && value.openBg == 1) && (value.bgType === "gradient") &&
                    <div className="wprig-background-inner">
                        <Gradient
                            inline
                            label={__('Gradient')}
                            value={value.bgGradient}
                            onChange={val => this.setSettings(val, 'bgGradient')}
                        />
                    </div>
                }

                {(value && value.openBg == 1) && (value.bgType == 'video') &&
                    <div className="wprig-background-inner">
                        <Select label={__('Video Source')} value={value.videoSource} options={[['local', __('Local')], ['external', __('External')]]} onChange={(val) => this.setSettings(val, 'videoSource')} />
                        {value.videoSource === 'external' ?
                            <TextControl
                                label={__('Video URL')}
                                value={value.bgExternalVideo || ""}
                                onChange={val => this.setSettings(val, 'bgExternalVideo')}
                            />
                            :
                            <Media label={__('Video')} multiple={false} type={['video']} panel={true} value={value.bgVideo} onChange={(val) => this.setSettings(val, 'bgVideo')} />
                        }
                        <Media label={__('Fallback Image (Poster)')} multiple={false} type={['image']} panel={true} value={value.bgVideoFallback} onChange={(val) => this.setSettings(val, 'bgVideoFallback')} />
                    </div>
                }
            </div>
        )
    }
}
export default Background