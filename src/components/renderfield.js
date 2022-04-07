import Alignment from "./fields/alignments"
import Background from "./fields/background"
import Border from "./fields/border"
import ButtonGroup from './fields/buttongroup'
import Counter from "./fields/counter"
import BoxShadow from "./fields/boxshadow"
import Dimension from "./fields/dimension"
import Dropdown from "./fields/dropdown"
import Headings from "./fields/headings"
import InnerPanel from "./fields/innerPanel"
import IconList from "./fields/iconList"
import Media from "./fields/media"
import Margin from './fields/margin'
import Color from './fields/color'
import Styles from './fields/styles'
import Toggle from './fields/toggle'
import Tabs from './fields/tabs'
import Tab from './fields/tab'
import Typography from './fields/typography'
import BorderRadius from './fields/borderRadius'
import RadioAdvanced from './fields/radioAdvanced'
import Range from './fields/range'
import NumberField from './fields/numberField'
import Select from './fields/select'
import Shape from './fields/shape'
import Separator from './fields/separator'
import Url from './fields/url'
import Padding from './fields/padding'
import Templates from './fields/template'
import ColorAdvanced from './fields/colorAdvance'
import IconSelector from './fields/iconSelector'
import IconSelectorSVG from './fields/iconSelectorSVG'
import { listAttributes, listSettings } from './fields/listSettings'

import { WPRigButtonEdit, WPRigButtonSave } from './fields/wprigbutton'

import { globalAttributes, globalSettingsPanel, animationSettings, interactionSettings } from './fields/globalsettings'
import { globalCustomAttributes, HoverEXSettings} from './fields/globalCustomSettings'
import {
    CssGenerator,
    objectReplace,
    objectAppend,
    singleField
} from './css-generator'
import {withCSSGenerator} from '../hooks'

import HeadingToolbar from './fields/headingToolbar'
import { InlineToolbar, InlineSpacer, InlineSelector } from './fields/inline'

import InspectorTabs from './InspectorTabs'
import InspectorTab from './InspectorTab'
import InspectorSections from './InspectorSections'
import {
    _equal,
    animationAttr,
    selectValue,
    isObject,
    isArray,
    setValue,
    videoBackground,
    parseResponsiveViewPort,
    IsInteraction,
    copyToClipboard
} from './helpers';

import { buttonAttributes, buttonSettings } from './fields/buttonSettings'
import { ContextMenu, handleContextMenu } from './fields/contextMenu'

import TestField from './fields/testField'

wp.wprigComponents = {
    Alignment,
    IconList,
    Border,
    ContextMenu: {
        ContextMenu,
        handleContextMenu
    },
    wprigList: {
        listAttributes,
        listSettings
    },
    Background,
    ButtonGroup,
    BorderRadius,
    Color,
    Dimension,
    Dropdown,
    NumberField,
    RadioAdvanced,
    Counter,
    Range,
    BoxShadow,
    Tab,
    Tabs,
    Toggle,
    Typography,
    IconSelector,
    IconSelectorSVG,
    Padding,
    globalSettings: {
        globalAttributes,
        animationSettings,
        interactionSettings,
        globalSettingsPanel,
    },
    globalCustomSettings:{
        globalCustomAttributes,
        HoverEXSettings
    },
    ColorAdvanced,
    CssGenerator: {
        CssGenerator,
        objectReplace,
        objectAppend,
        singleField
    },
    Headings,
    HeadingToolbar,
    Media,
    Margin,
    HelperFunction: {
        _equal,
        animationAttr,
        selectValue,
        isObject,
        isArray,
        setValue,
        videoBackground,
        parseResponsiveViewPort,
        IsInteraction,
        copyToClipboard
    },
    IconList,
    InnerPanel,
    Separator,
    Select,
    Shape,
    Styles,
    Url,
    Inline: {
        InlineToolbar,
        InlineSpacer,
        InlineSelector
    },
    wprigButton: {
        buttonAttributes,
        buttonSettings
    },
    Templates,
    withCSSGenerator,
    InspectorTabs,
    InspectorTab,
    InspectorSections,
    WPRigButtonEdit,
    WPRigButtonSave,
    TestField
}