const { Component } = wp.element
const { addQueryArgs } = wp.url;
const { Fragment} = wp.element;
const { PanelRow,SelectControl  } = wp.components;
import Color from './color'
import NumberField from './numberField'



const { __ } = wp.i18n;
class IconSelectorSVG extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            filterText: '',
            selectedItem: -1,
            icon_type:"solid",
            icon_path:wprig_admin.plugin+"assets/img/admin/font-awesome/",
            iconLists: [] ,
            iconTypes: [] ,
            reload:1,
            isDropdownOpen:false
        }
    }

    componentDidMount() {
        // const { setAttributes, clientId, attributes: {  } } = this.props
       const { iconLists,iconTypes,reload } = this.state
        this.isStillMounted = true;

            this.fetchRequest = wp.apiFetch({
                path: addQueryArgs('wprig/v1/get_editor_icons'),
            }).then(
                (iconLists) => {
                    if (this.isStillMounted) {
                        var keys = [];
                        for(var k in iconLists.data){
                            keys.push({
                                "label":k,
                                "value":k
                            })
                        }
                        this.setState({ iconLists});
                        this.setState({ iconTypes:keys});
                    }
                }
            )

    }

    componentWillUnmount() {
        this.isStillMounted = false;
    }

    setSettings(type, val) {
        let prevValue = this.props.value

        if(type=="width"||type=="height"){
            val = {[type]: {
                    ...prevValue[type],
                    val:val
                }
            }
        }else{
            val = {[type]: val}
        }
            console.log(val);

        this.props.onChange(Object.assign({}, prevValue, val))
    }


    render() {
        const { value, label, icons, enableSearch, onChange } = this.props
        const { filterText,iconLists,icon_path,icon_type,iconTypes,isDropdownOpen } = this.state
        let finalData = []
        if (enableSearch && filterText.length >= 2) {
            finalData = icons.filter(item =>
                item.name.toLowerCase().search(filterText.toLowerCase()) !== -1
            )
        } else {
            finalData = icons
        }
        return (
            <Fragment className="flex-column justify-content-center align-items-start">
            <PanelRow>
                    <SelectControl label={__('Icon Type')}  value={this.state.icon_type} options={iconTypes} 
                    onChange={val => {
                        this.setState({ icon_type: val })
                        this.setSettings('icon_type',val)
                    }}/>
            </PanelRow>
            <PanelRow>
            <div className="wprig-field wprig-field-icon-list d-block ">
                <div className="wprig-icon-dropdown d-flex align-items-center">
                    <svg>
                        <use xlinkHref={icon_path+value.icon_type+".svg#"+value.icon}></use>
                    </svg>
                    <button class="btn btn-dark" onClick={()=>{
                        if(isDropdownOpen){
                            this.setState({isDropdownOpen:false})
                        }else{
                            this.setState({isDropdownOpen:true})                            
                        }
                    }}>
                        <svg>
                            {(isDropdownOpen) ?
                            <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#caret-up"}></use>:
                            <use xlinkHref={wprig_admin.plugin+"assets/img/admin/font-awesome/solid.svg#caret-down"}></use>
                            }
                        </svg>
                    </button>
                </div>

                <div className={`wprig-field-icon-list-selector flex-wrap mt-3 ${isDropdownOpen ? "d-flex":"d-none"}`}>
                {( this.state.iconLists.data) ?
                    <Fragment>
                        { this.state.iconLists.data["solid"].map(icon => {
                            return (
                                <span className={value.icon == icon ? 'active' : ''} onClick={(val) => this.setSettings('icon',icon)}>
                                    <svg>
                                        <use xlinkHref={icon_path+icon_type+".svg#"+icon}></use>
                                    </svg>
                                </span>
                            )
                        }) }

                    </Fragment>

                     : <Fragment>
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                     </Fragment>
                }
               </div>
                
            </div>
            </PanelRow>
            <PanelRow>
            {console.log(value.width)}
            <div className="wprig-field wprig-field-font-color d-block">
                <Color label={__('Icon Color')} value={value.color} onChange={(val) => this.setSettings('color',val)} />
            </div>
            </PanelRow>
            <PanelRow>
                <NumberField label={__('Icon Width ')} value={value.width.val}  onChange={(val) => this.setSettings('width',val)}   min={value.width.min} max={value.width.max} />    
            </PanelRow>
            <PanelRow>
                <NumberField label={__('Icon Height')} value={value.height.val}  onChange={(val) => this.setSettings('height',val)}   min={value.height.min} max={value.height.max} />    
            </PanelRow>
            </Fragment>
        )
    }
}
export default IconSelectorSVG