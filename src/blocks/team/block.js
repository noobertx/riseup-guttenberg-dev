import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType('wprig/team', {
    title: __('Team'),
    description: 'Display team member with social profiles.',
    icon: 'universal-access-alt',
    category: 'wprig-blocks',
    supports: {
        align: ['center', 'wide', 'full'],
    },
    keywords: [__('Team'), __('profile')],
    example: {
        attributes: {
            contentBg: '',
            image: { url: 'https://wprig.io/wp-content/uploads/wprig-assets/demo/team1.jpg' },
        },
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        // Global
        ...globalAttributes,
        layout: { type: 'number', default: 1 },
        recreateStyles: {
            type: 'boolean',
            default: true
        },
        alignment: {
            type: 'object',
            default: {
                md: 'center'
            },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '!=', value: 3 }
                    ],
                    selector: '{{WPRIG}} .wprig-block-team {text-align: {{alignment}};}'
                }

            ]
        },
        alignmentLayout3: {
            type: 'string',
            default: 'left',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 3 }
                    ],
                    selector: '{{WPRIG}}.right-alignment .wprig-block-team{flex-direction:row-reverse}  {{WPRIG}} .wprig-block-team .wprig-team-content {text-align: {{alignmentLayout3}};}'
                }
            ]
        },
        spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },

        // Image
        imageType: {
            type: 'string',
            default: 'local'
        },
        image: { type: 'object', default: {} },
        image2x: { type: 'object', default: {} },
        externalImageUrl: {
            type: 'object',
            default: {}
        },


        // Name
        name: { type: 'string', default: 'John Doe' },

        // Designation
        enableDesignation: {
            type: 'boolean', default: 1,
            style: [
                {
                    condition: [
                        { key: 'enableDesignation', relation: '==', value: 1 }
                    ],
                    selector: '{{WPRIG}} .wprig-team-designation{display:block;}'
                }
            ]
        },
        designation: { type: 'string', default: 'CREATIVE DESIGNER' },
        // Description
        enableDescription: { type: 'boolean', default: 0 },
        description: { type: 'string', default: 'wprig team block is an amazing Gutenberg block to display team member with social and other relevant information.' },

        // Social
        showSociallinks: { type: 'boolean', default: true },
        facebook: { type: 'string', default: 'https://facebook.com/themeum' },
        twitter: { type: 'string', default: 'https://twitter.com/themeum' },
        instagram: { type: 'string', default: '' },
        linkedin: { type: 'string', default: '' },
        youtube: { type: 'string', default: 'https://youtube.com/user/themeumwp' },
        github: { type: 'string', default: '' },
        flickr: { type: 'string', default: '' },
        pinterest: { type: 'string', default: '' },
        dribbble: { type: 'string', default: '' },
        behance: { type: 'string', default: '' },
        iconStyle: { type: 'string', default: 'normal' },
        iconUseDefaultStyle: { type: 'boolean', default: true },

        // Information
        phone: { type: 'string', default: '' },
        email: { type: 'string', default: '' },
        website: { type: 'string', default: '' },

        useInfoIcon: { type: 'boolean', default: false },

        //Overlay
        overlayHeight: {
            type: 'string', default: 'fit',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 2 },
                        { key: 'overlayHeight', relation: '==', value: 'auto' }
                    ],
                    selector: '{{WPRIG}} .wprig-team-content {bottom: 0;}'
                },
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 2 },
                        { key: 'overlayHeight', relation: '==', value: 'fit' }
                    ],
                    selector: '{{WPRIG}} .wprig-team-content {top: 0; bottom: 0;}'
                }
            ]
        },
        overlayAlignment: {
            type: 'string', default: 'center',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 2 },
                        { key: 'overlayHeight', relation: '==', value: 'fit' },
                    ],
                    selector: '{{WPRIG}} .wprig-team-content {-webkit-box-align: {{overlayAlignment}}; -ms-flex-align: {{overlayAlignment}}; align-items: {{overlayAlignment}};}'
                }
            ]
        },
    

        // Content
        contentPosition: {
            type: 'string', default: 'right',
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 3 },
                        { key: 'contentPosition', relation: '==', value: 'left' }
                    ],
                    selector: '{{WPRIG}} .wprig-block-team {flex-direction: row-reverse; -webkit-flex-direction: row-reverse;} {{WPRIG}} .wprig-team-layout-3 .wprig-team-content {margin-right: auto;}'
                }
            ]
        },
        contentAlignment: {
            type: 'object', default: { md: 'center' },
            style: [
                {
                    condition: [
                        { key: 'layout', relation: '==', value: 3 },
                    ],
                    selector: '{{WPRIG}} .wprig-team-content {text-align: {{contentAlignment}};}'

                }
            ]
        },
        sourceOfCopiedStyle: { type: 'boolean', default: false }
    },
    edit: Edit,
    save: Save,
});
