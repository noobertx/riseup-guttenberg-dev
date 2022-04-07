import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/socialicons', {
    title: __('Social Icons'),
    description: '',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [
        __('Social Icons'),
        __('Social'),
        __('Icons'),
    ],
    description: __('Add all your social media profiles in one place with wprig Social Icons.'),
    example: {
        attributes: {},
    },
    supports: {
        align: ['center', 'wide', 'full'],
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
        layout: { type: 'string', default: 'fill' },
        iconLabel: { type: 'boolean', default: true },
        useDefaultStyle: { type: 'boolean', default: true },
        alignment: { type: 'object', default: { md: 'left' }, style: [{ selector: '{{WPRIG}} .wprig-block-social-icons {text-align: {{alignment}};}' }] },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },
        socialIcons: {
            type: 'array', default: [
                { icon: 'fab fa-facebook', label: 'Facebook', id: 'facebook', url: 'https://facebook.com/themeum' },
                { icon: 'fab fa-twitter', label: 'Twitter', id: 'twitter', url: 'https://twitter.com/themeum' },
                { icon: 'fab fa-linkedin', label: 'LinkedIn', id: 'linkedin', url: '' },
                { icon: 'fab fa-youtube', label: 'YouTube', id: 'youtube', url: 'https://youtube.com/user/themeumwp' },
                { icon: 'fab fa-dribbble', label: 'Dribbble', id: 'dribbble', url: 'https://dribbble.com/themeum' },
            ]
        },

        // Icon
        iconSize: { type: 'string', default: '22px', style: [{ condition: [{ key: 'iconSize', relation: '!=', value: 'custom' }], selector: '{{WPRIG}} .wprig-social-item .wprig-social-icon {font-size: {{iconSize}}; height: {{iconSize}}; line-height: {{iconSize}}; width: {{iconSize}};}' }] },
        iconSizeCustom: { type: 'object', default: { md: 22, unit: 'px' }, style: [{ condition: [{ key: 'iconSize', relation: '==', value: 'custom' }], selector: '{{WPRIG}} .wprig-social-item .wprig-social-icon {font-size: {{iconSizeCustom}}; height: {{iconSizeCustom}}; line-height: {{iconSizeCustom}}; width: {{iconSizeCustom}};}' }] },
        iconPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: { md: 10 },
                unit: 'px'
            },
            style: [
                {
                    condition: [{ key: 'layout', relation: '==', value: 'fill' }],
                    selector: '{{WPRIG}} .wprig-block-social-icons .wprig-social-item a'
                }
            ]
        },
        iconSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul {margin: calc(-{{iconSpacing}}/2);} {{WPRIG}} .wprig-block-social-icons .wprig-social-item {margin: calc({{iconSpacing}}/2);}' }] },
        iconBorderRadius: { type: 'object', default: { openBorderRadius: 1, radiusType: 'global', global: { md: 4 }, unit: 'px' }, style: [{ selector: '{{WPRIG}} .wprig-social-item a' }] },
        labelSpacing: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ condition: [{ key: 'iconLabel', relation: '==', value: true }], selector: '{{WPRIG}} .wprig-social-item .wprig-social-label {margin-left: {{labelSpacing}};}' }] },
        labelTypography: { type: 'object', default: {}, style: [{ condition: [{ key: 'iconLabel', relation: '==', value: true }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-social-item .wprig-social-label' }] },

        // Custom Design
        iconColor: { type: 'string', default: '', style: [{ condition: [{ key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a {color: {{iconColor}};}' }] },
        iconColorHover: { type: 'string', default: '#333', style: [{ condition: [{ key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a:hover {color: {{iconColorHover}};}' }] },
        IconBackground: { type: 'string', default: '#e5e5e5', style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }, { key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a {background-color: {{IconBackground}};}' }] },
        IconBackgroundHover: { type: 'string', default: '', style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }, { key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a:hover {background-color: {{IconBackgroundHover}};}' }] },
        iconBorder: { type: 'object', default: {}, style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }, { key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a' }] },
        iconBorderColorHover: { type: 'string', default: '', style: [{ condition: [{ key: 'layout', relation: '==', value: 'fill' }, { key: 'useDefaultStyle', relation: '==', value: false }], selector: '{{WPRIG}} .wprig-block-social-icons .wprig-ul li.wprig-social-item a:hover {border-color: {{iconBorderColorHover}};}' }] },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save,
});
