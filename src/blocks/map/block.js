import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { globalSettings: { globalAttributes } } = wp.wprigComponents

registerBlockType ( 'wprig/map', {
    title: __( 'Google Map' ),
    description: 'Embed Google Maps easily with wprig Google Maps.',
    category: 'wprig-blocks',
    icon: 'universal-access-alt',
    keywords: [ __( 'Google Map' ), __( 'Map' ), __( 'Location' ) ],
    supports: {
        align: ['center', 'wide', 'full'],
    },
    example: {
        attributes: {},
    },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        ...globalAttributes,  // Global Settings
        spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [ { selector: '{{WPRIG}}' }] },
        zoom: { type: 'number', default: '16'},
        height: { type: 'number', default: '350'},
        placeID: { type: 'string', default: 'ChIJgWsCh7C4VTcRwgRZ3btjpY8'},
        mapAddress: { type: 'string', default: ''},
        apiKey: { type: 'string', default: ''},
        iconPointer: { type: 'string', default: '' },
        showZoomButtons: { type: 'boolean', default: true },
        showMapTypeButtons: { type: 'boolean', default: true },
        showStreetViewButton: { type: 'boolean', default: true },
        showFullscreenButton: { type: 'boolean', default: true },
        optionScrollWheel: { type: 'boolean', default: true },
        optionDraggable: { type: 'boolean', default: true },
        showMarker: { type: 'boolean', default: true },
        mapStyle: { type: 'string', default: '' },
        selectedStyle: { type: 'string', default: 'default' },
    },
    edit: Edit,
    save: Save,
});
