import icons from '../../helpers/icons';
import classnames from 'classnames';
const { __ } = wp.i18n;
const {
    Fragment,
    Component,
    createRef
} = wp.element;

const { compose } = wp.compose;

const {
    withSelect,
    withDispatch
} = wp.data;

const {
    PanelBody,
    Toolbar,
    Tooltip,
    DateTimePicker,
    TextControl
} = wp.components;

const {
    RichText,
    BlockControls,
    InspectorControls
} = wp.blockEditor;
import { __experimentalGetSettings } from '@wordpress/date';
const {
    Url,
    Range,
    Select,
    Toggle,
    Padding,
    IconList,
    Alignment,
    InspectorTab,
    InspectorTabs,
    RadioAdvanced,
    withCSSGenerator,
    Inline: {
        InlineToolbar
    },
    globalSettings: {
        animationSettings,
        interactionSettings,
        globalSettingsPanel,
    },
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    }
} = wp.wprigComponents;


class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            device: 'md',
            spacer: true,
            resultDay:{}
        };
        this.wprigContextMenu = createRef();
    }

    componentDidMount() {
        const {
            clientId,
            setAttributes,
            attributes: {
                uniqueId,
                untilDate
            }
        } = this.props;

        const _client = clientId.substr(0, 6);
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }

        let setday = new Date(untilDate);
        let now = new Date();
            var d =  setday - now;
            this.setState({resultDay:{
                years: setday.getFullYear() - now.getFullYear(),
                months: setday.getMonth() - now.getMonth(),
                days: setday.getDate() - now.getDate(),
                hours: setday.getHours() - now.getHours(),
                minutes: this.computeTime(setday.getMinutes() - now.getMinutes(),"min"),
                seconds: this.computeTime(setday.getSeconds() - now.getSeconds(),"sec"),
            } })
    }

    computeTime(difference,type){
        if(type == "min" || type == "sec"){
            if(difference < 0){
                difference+= 60;
            }
        }
        if(type == "hr"){
            if(difference < 0){
                difference+= 12;
            }
        }

        if(difference < 10 ){
            difference = "0"+difference;
        }

        return difference;
    }

    render() {

        const {
            name,
            clientId,
            attributes,
            removeBlock,
            setAttributes,
            updateBlockAttributes,
            buttonGroupAttributes,
            attributes: {
                uniqueId,
                className,
                untilDate,
                displayYear,
                displayMonth,
                displayDay,
                displayHour,
                displayMinute,
                displaySeconds,
                layout,

                itemColor,
                style,
                justify,
                isInverted,

                yearLabel,
                monthLabel,
                dayLabel,
                hourLabel,
                minuteLabel,
                secondsLabel,
                animation,
                interaction,
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss,
            }
        } = this.props;

        const { device, currentTab,resultDay } = this.state;

        let dformat = "";
        dformat+= (displayYear) ? "Y" : "";
        dformat+= (displayMonth) ? "O" : "";
        dformat+= (displayDay) ? "D" : "";
        dformat+= (displayHour) ? "H" : "";
        dformat+= (displayMinute) ? "M" : "";
        dformat+= (displaySeconds) ? "S" : "";

        let dlabels = "";
        dlabels += yearLabel+"/";
        dlabels += monthLabel+"/";
        dlabels += dayLabel+"/";
        dlabels += hourLabel+"/";
        dlabels += minuteLabel+"/";
        dlabels += secondsLabel+"/";
        const classNames = classnames(
            { [`yani-block-${uniqueId}`]: uniqueId },
            className
        );

        const settings = __experimentalGetSettings();
        const is12HourTime = /a(?!\\)/i.test(
            settings.formats.time
                .toLowerCase() // Test only the lower case a
                .replace( /\\\\/g, '' ) // Replace "//" with empty strings
                .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
        );
        
        
        

        return (
            <Fragment>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state}
                        />
                    </Toolbar>
                </BlockControls>

                <InspectorControls key="inspector">
                    <InspectorTabs>
                        <InspectorTab key='style'>
                            <PanelBody title={__('Basic')} initialOpen={false}>
                            <DateTimePicker
                            currentDate={ untilDate }
                            onChange={ ( date ) => setAttributes( { untilDate :date } ) }
                            is12Hour={ true }
                            />

                            <Toggle label={__('Display Year')} value={displayYear} onChange={value => setAttributes({ displayYear: value })} />                               
                            <Toggle label={__('Display Month')} value={displayMonth} onChange={value => setAttributes({ displayMonth: value })} />                               
                            <Toggle label={__('Display Day')} value={displayDay} onChange={value => setAttributes({ displayDay: value })} />                               
                            <Toggle label={__('Display Hour')} value={displayHour} onChange={value => setAttributes({ displayHour: value })} />                               
                            <Toggle label={__('Display Minutes')} value={displayMinute} onChange={value => setAttributes({ displayMinute: value })} />                               
                            <Toggle label={__('Display Seconds')} value={displaySeconds} onChange={value => setAttributes({ displaySeconds: value })} />                               
                               
                            </PanelBody>
                            <PanelBody title={__('Labels')} initialOpen={false}>
                                <TextControl label={__('Year Label')} value={yearLabel} onChange={val => setAttributes({ yearLabel: val })} />
                                <TextControl label={__('Month Label')} value={monthLabel} onChange={val => setAttributes({ monthLabel: val })} />
                                <TextControl label={__('Day Label')} value={dayLabel} onChange={val => setAttributes({ dayLabel: val })} />

                                <TextControl label={__('Hour Label')} value={hourLabel} onChange={val => setAttributes({ hourLabel: val })} />
                                <TextControl label={__('Minute Label')} value={minuteLabel} onChange={val => setAttributes({ minuteLabel: val })} />
                                <TextControl label={__('Seconds Label')} value={secondsLabel} onChange={val => setAttributes({ secondsLabel: val })} />
                                
                            </PanelBody>
                            <PanelBody title={__('Design')} initialOpen={false}>
                                <Select
                                    label={__('Style')}
                                    options={[
                                        ['style-1','Style 1'],
                                        ['style-2','Style 2'],
                                        ['style-3','Style 3'],
                                        ['style-4','Style 4'],
                                        ['style-5','Style 5'],
                                    ]}
                                    value={style}
                                    onChange={(value) => setAttributes({ style: value })} /> 

                                <Toggle label={__('Invert Color')} value={isInverted} onChange={value => setAttributes({ isInverted: value })} />  

                                <Select
                                    label={__('itemColor')}
                                    options={[
                                        ['','None'],
                                        ['bg-primary white','Primary'],
                                        ['bg-secondary white','Secondary'],
                                        ['bg-accent white','Accent'],
                                        ['bg-light dark','Light'],
                                        ['bg-dark white','Dark'],
                                        ['bg-info white','Info'],
                                        ['bg-success white','Success'],
                                        ['bg-warning white','Warning'],
                                        ['bg-danger white','Danger'],
                                    ]}
                                    value={itemColor}
                                    onChange={(value) => setAttributes({ itemColor: value })} /> 
                            </PanelBody>
                        </InspectorTab>
                        <InspectorTab key='advance'>
                            {animationSettings(uniqueId, animation, setAttributes)}
                            {interactionSettings(uniqueId, interaction, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`${classNames} ` } >
                    <div className={`yani-countdown-wrapper  `} onContextMenu={event => handleContextMenu(event, this.wprigContextMenu.current)}>
                        <div className={`yani-countdown yani-countdown-${uniqueId} yani-countdown-${style}`}>
                            <div className={`yani-countdown__content ${justify}`} data-until={`${untilDate}`} data-format={`${dformat}`} data-labels={`${dlabels}`} data-layout={`${layout}`} >
                                {displayYear && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.years}</h4>
                                    <span className={`yani-countdown__label`}>{yearLabel}</span>
                                </div>
                                }
                                {displayMonth && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.months}</h4>
                                    <span className={`yani-countdown__label`}>{monthLabel}</span>
                                </div>
                                }
                                {displayDay && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.days}</h4>
                                    <span className={`yani-countdown__label`}>{dayLabel}</span>
                                </div>
                                }
                                {displayHour && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.hours}</h4>
                                    <span className={`yani-countdown__label`}>{hourLabel}</span>
                                </div>
                                }
                                {displayMinute && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.minutes}</h4>
                                    <span className={`yani-countdown__label`}>{minuteLabel}</span>
                                </div>
                                }
                                {displaySeconds && 
                                <div className={`yani-countdown__section `}>
                                    <h4 className={`${itemColor} ${isInverted ? 'inverted' :''}`}>{resultDay.seconds}</h4>
                                    <span className={`yani-countdown__label`}>{secondsLabel}</span>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
export default compose([
    withSelect((select, ownProps) => {
        const { parentClientId } = ownProps.attributes
        const { getBlockAttributes } = select('core/block-editor');
        return { buttonGroupAttributes: getBlockAttributes(parentClientId) }
    }),
    withDispatch((dispatch) => {
        const { removeBlock, updateBlockAttributes } = dispatch('core/block-editor');
        return {
            removeBlock,
            updateBlockAttributes
        }
    }),
    withCSSGenerator()
])(Edit)
