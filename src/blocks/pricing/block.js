/* eslint-disable react/react-in-jsx-scope */
import './style.scss'
const { __ } = wp.i18n
import Save from './Save'
import Edit from './Edit'
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes }, wprigButton: { buttonAttributes }, wprigList: { listAttributes } } = wp.wprigComponents

registerBlockType('wprig/pricing', {
    title: __('Pricing'),
    description: 'Showcase Pricing in beautiful pre-designed Pricing Table with wprig Pricing.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [__('Pricing'), __('Pricing Table')],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
		attributes: {},
	},
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,
        ...buttonAttributes,
        ...listAttributes,
        layout: {
            type: 'number',
            default: 3
        },

        defaultItems: { type: 'number', default: 2 },
        alignment: { type: 'object', default: { md: 'center' }, style: [{ selector: '{{WPRIG}} .wprig-block-pricing {text-align: {{alignment}};}' }] },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: 'px' }, spaceBottom: { md: '10', unit: 'px' } }, style: [{ selector: '{{WPRIG}}' }] },

        copyStyle: { type: 'boolean', default: false },

        // Title__
        title: {
            type: 'string',
            source: 'html',
            selector: '.wprig-pricing-title',
            default: 'Basic'
        },
        titleColor: { type: 'string', default: 'var(--wprig-color-1)', style: [{ selector: '{{WPRIG}} .wprig-pricing-title{color: {{titleColor}};}' }] },
        titleTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-title' }] },

        titleSpacing: {
            type: 'object',
            default: {
                md: 0,
                unit: 'px'
            },
            style: [{ selector: '{{WPRIG}} .wprig-pricing-title {margin-bottom: {{titleSpacing}};}' }]
        },

        //Sub Title
        subTitle: {
            type: 'string',
            source: 'html',
            selector: '.wprig-sub-title',
            default: 'Best Choice for Individuals'
        },
        subTitleSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [
                {
                    selector: '{{WPRIG}} .wprig-sub-title-wrapper {margin-bottom: {{subTitleSpacing}};}'
                }
            ]
        },

        subTitleColor: { type: 'string', default: '#8F8E8E', style: [{ selector: '{{WPRIG}} .wprig-sub-title{color: {{subTitleColor}};}' }] },
        subTitleTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-sub-title' }] },

        // Price__
        price: { type: 'string', default: '49' },
        priceAlignment: {
            type: 'string',
            default: 'center',
            style: [
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'left' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-wrapper {justify-content: flex-start;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'center' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-wrapper {justify-content: center;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'right' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-wrapper {justify-content: flex-end;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'left' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-duration {text-align: left;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'center' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-duration {text-align: center;}'
                },
                {
                    condition: [
                        { key: 'priceAlignment', relation: '==', value: 'right' },
                        { key: 'durationPosition', relation: '==', value: 'bottom' },
                    ],
                    selector: '{{WPRIG}} .wprig-pricing-duration {text-align: right;}'
                }
            ]
        },
        priceColor: { type: 'string', default: '#ccc', style: [{ selector: '{{WPRIG}} .wprig-pricing-price{color: {{priceColor}};}' }] },
        priceTypography: { type: 'object', default: { openTypography: 1, height: { md: 70, unit: 'px' }, size: { md: 70, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-price' }] },
        discount: { type: 'boolean', default: false },
        discountPrice: { type: 'string', default: '69' },
        discountColor: { type: 'string', default: '#ccc', style: [{ selector: '{{WPRIG}} .wprig-pricing-price strike{color: {{discountColor}};}' }] },
        discountTypography: { type: 'object', default: { openTypography: 1, size: { md: 20, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-price strike' }] },
        pricingSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style: [{ selector: '{{WPRIG}} .wprig-pricing-wrapper {margin-bottom: {{pricingSpacing}};}' }]
        },

        headerBg: {
            type: 'object',
            default: {},
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing-header'
                }
            ]
        },
        headerBorder: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#f6f6f6',
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing-header'
                }
            ]
        },
        headerPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 20
                },
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing-header'
                }
            ]
        },
        headerSpacing: {
            type: 'object',
            default: {
                md: 30,
                unit: 'px'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 5 },
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing-header {margin-bottom: {{headerSpacing}};}'
                }
            ]
        },

        // Currency__
        currency: { type: 'string', default: '$' },
        currencyCustom: { type: 'string', default: '' },
        currencyPosition: { type: 'string', default: 'before' },
        currencyAlign: { type: 'string', default: '10', style: [{ selector: '{{WPRIG}} .wprig-pricing-currency{ display: inline-block; transform: translateY({{currencyAlign}}px); }' }] },
        currencyColor: { type: 'string', default: '#CACCCE', style: [{ selector: '{{WPRIG}} .wprig-pricing-currency{color: {{currencyColor}}; }' }] },
        currencyTypography: { type: 'object', default: { openTypography: 1, size: { md: 34, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-currency' }] },

        // Duration__
        enableDuration: { type: 'boolean', default: true },
        duration: { type: 'string', default: '/Month' },
        durationPosition: { type: 'string', default: 'side' },
        durationColor: { type: 'string', default: '#CACCCE', style: [{ selector: '{{WPRIG}} .wprig-pricing-duration{color: {{durationColor}};}' }] },
        durationAlign: { type: 'string', default: '10', style: [{ condition: [{ key: 'durationPosition', relation: '==', value: 'side' }], selector: '{{WPRIG}} .wprig-pricing-duration{transform: translateY({{durationAlign}}px); display: inline-block; }' }, { condition: [{ key: 'durationPosition', relation: '==', value: 'bottom' }], selector: '{{WPRIG}} .wprig-pricing-duration{ display: block; }' }] },
        durationTypography: { type: 'object', default: { openTypography: 1, size: { md: 21, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-duration' }] },

        durationPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'custom',
                custom: { md: '10 0 10 0' }
            },
            style: [{ condition: [{ key: 'durationPosition', relation: '==', value: 'bottom' }], selector: '{{WPRIG}} .wprig-pricing-duration' }]
        },
        // Badge__
        enableBadge: { type: 'boolean', default: false },
        badge: { type: 'string', default: 'Sale' },
        badgeStyle: {
            type: 'number',
            default: 1,
            style: [
                {
                    condition: [
                        { key: 'badgeStyle', relation: '!=', value: 3 }
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing {overflow: hidden;}'
                }
            ]
        },
        badgePosition: {
            type: 'string',
            default: 'left',
            style: [
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 1 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {left: -73px; transform: rotate(-45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 1 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {right: -73px; transform: rotate(45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 2 },
                        { key: 'badgePosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {left: -50px; transform: rotate(-45deg);}'
                },
                {
                    condition: [
                        { key: 'badgeStyle', relation: '==', value: 2 },
                        { key: 'badgePosition', relation: '==', value: 'right' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {right: -50px; transform: rotate(45deg);}'
                },
            ]
        },
        badgeSize: {
            type: 'string',
            default: 'regular'
        },
        badgeSpacing: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style:
                [
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 3 },
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {margin-top: {{badgeSpacing}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 5 },
                            { key: 'badgePosition', relation: '==', value: 'left' }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {left: {{badgeSpacing}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 5 },
                            { key: 'badgePosition', relation: '==', value: 'right' }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {right: {{badgeSpacing}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 6 },
                            { key: 'badgePosition', relation: '==', value: 'left' }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {left: {{badgeSpacing}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 6 },
                            { key: 'badgePosition', relation: '==', value: 'right' }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {right: {{badgeSpacing}};}'
                    }
                ]
        },
        badgeSpacingTop: {
            type: 'object',
            default: {
                md: 20,
                unit: 'px'
            },
            style:
                [
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 5 }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {top: {{badgeSpacingTop}};}'
                    }
                ]
        },
        badgeBg: {
            type: 'string',
            default: '#50E3C2',
            style:
                [
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {background-color: {{badgeBg}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 3 }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge::before {border-color: {{badgeBg}} {{badgeBg}} transparent transparent;} {{WPRIG}} .wprig-block-pricing .wprig-pricing-badge::after {border-color: {{badgeBg}} transparent transparent {{badgeBg}};}'
                    },
                    {
                        condition: [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 6 }
                        ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge::before {border-color: {{badgeBg}} {{badgeBg}} transparent {{badgeBg}};}'
                    }
                ]
        },

        badgeColor: {
            type: 'string',
            default: '#FFFFFF',
            style:
                [
                    {
                        condition:
                            [
                                { key: 'enableBadge', relation: '==', value: true }
                            ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge {color: {{badgeColor}};}'
                    }
                ]
        },

        badgeTypography: {
            type: 'object',
            default: {
                openTypography: 1,
                size: {
                    md: 14,
                    unit: 'px'
                }
            },
            style:
                [
                    {
                        condition:
                            [
                                { key: 'enableBadge', relation: '==', value: true }
                            ],
                        selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge'
                    }
                ]
        },

        badgeRadius: {
            type: 'object',
            default: {
                paddingType: 'global',
            },
            style: [
                {
                    condition:
                        [
                            { key: 'enableBadge', relation: '==', value: true },
                            { key: 'badgeStyle', relation: '==', value: 5 }
                        ],
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-pricing-badge'
                }
            ]
        },

        // Background
        bgColor: {
            type: 'object',
            default: {
                openColor: 1,
                type: 'color',
                color: '#FFFFFF',
            },
            style: [{ selector: '{{WPRIG}} .wprig-block-pricing' }]
        },
        bgPadding: {
            type: 'object',
            default: {
                openPadding: 1,
                paddingType: 'global',
                global: {
                    md: 30
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{WPRIG}} .wprig-block-pricing .wprig-block-pricing-content'
                }
            ]
        },

        bgBorderRadius: {
            type: 'object',
            default: {
                openBorderRadius: 1,
                radiusType: 'global',
                global: {
                    md: 10
                },
                unit: 'px'
            },
            style: [
                {
                    selector: '{{WPRIG}} .wprig-block-pricing'
                }
            ]
        },

        bgBorder: {
            type: 'object',
            default: {
                openBorder: 1,
                widthType: 'global',
                type: 'solid',
                color: '#E5E7EA',
                global: {
                    md: 1
                },
                unit: 'px',
            },
            style: [
                {
                    selector: '{{WPRIG}} .wprig-block-pricing'
                }
            ]
        },

        bgShadow: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} .wprig-block-pricing' }] },

        //button
        buttonGap: {
            type: 'object',
            default: {
                md: 0,
                unit: 'px'
            },
            style: [{ selector: '{{WPRIG}} .wprig-pricing-button {margin-bottom: {{buttonGap}};margin-top: {{buttonGap}};}' }]
        },
        enableButton: { type: 'boolean', default: true },
        controlledButtonPanel: { type: 'boolean', default: true },
        showButtonPanel: { type: 'boolean', default: false },
        buttonText: { type: 'string', default: 'Subscribe Now' },

        buttonPaddingTop: { type: 'object', default: { md: 30, unit: 'px' }, style: [{ selector: '{{WPRIG}} .wprig-pricing-button{ padding-top: {{buttonPaddingTop}};}' }] },
        buttonPaddingBottom: { type: 'object', default: { md: 10, unit: 'px' }, style: [{ selector: '{{WPRIG}} .wprig-pricing-button{ padding-bottom: {{buttonPaddingBottom}};}' }] },

        //postButtonText
        enablePostButtonText: { type: 'boolean', default: false },
        postButtonText: { type: 'string', default: '14 days money back gaurantee' },
        postButtonTextTypography: { type: 'object', default: { openTypography: 1, size: { md: 16, unit: 'px' } }, style: [{ selector: '{{WPRIG}} .wprig-pricing-post-button-text' }] },
        postButtonTextColor: {
            type: 'string',
            default: '#696969',
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} .wprig-pricing-postbutton-text{ color: {{postButtonTextColor}};}'
            }]
        },
        postButtonTextPaddingTop: {
            type: 'object',
            default: { md: 5, unit: 'px' },
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} .wprig-pricing-postbutton-text{ margin-top: {{postButtonTextPaddingTop}};}'
            }]
        },
        postButtonTextPaddingBottom: {
            type: 'object',
            default: { md: 5, unit: 'px' },
            style: [{
                condition: [
                    { key: 'enablePostButtonText', relation: '==', value: true },
                ],
                selector: '{{WPRIG}} .wprig-pricing-postbutton-text{ margin-bottom: {{postButtonTextPaddingBottom}};}'
            }]
        },


        // features
        enableFeatures: { type: 'boolean', default: true },
        controlledFeaturesPanel: { type: 'boolean', default: true },
        showFeaturesPanel: { type: 'boolean', default: false },
        listItems: {
            type: 'array',
            default: [
                {
                    icon: 'fas fa-check',
                    text: 'Unlimited domain use',
                    customColor: false
                },
                {
                    icon: 'fas fa-check',
                    text: '1 year customer support',
                    customColor: false
                },
                {
                    icon: 'fas fa-times',
                    text: 'Access to all plugins',
                    customColor: '#f00'
                },
                {
                    icon: 'fas fa-check',
                    text: 'Access to all themes',
                    customColor: false
                },
            ]

        },
        clickedListItem: { type: 'number', default: 0 },
        listType: { type: 'string', default: 'unordered' },
        bulletStyle: { type: 'string', default: 'check-circle-outline' },
        sourceOfCopiedStyle: { type: 'boolean', default: false },

    },
    edit: Edit,
    save: Save
})