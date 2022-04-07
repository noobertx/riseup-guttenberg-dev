const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl, TextControl, RangeControl, Toolbar, Button } = wp.components;
const { Media, Separator, globalSettings: { globalSettingsPanel, animationSettings }, Inline: { InlineToolbar }, withCSSGenerator, InspectorTabs, InspectorTab } = wp.wprigComponents
import mapStyles from './mapStyles'

class Edit extends Component {

    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.initSearchBox = this.initSearchBox.bind(this);
        this.initMapLibrary = this.initMapLibrary.bind(this);
        this.setSettings = this.setSettings.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this._saveGlobally = this._saveGlobally.bind(this);
        this.state = { spacer: true, saved_globally: false}
    }

    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId, apiKey } } = this.props;
        const _client = clientId.substr(0, 6);

        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId !== _client) {
            setAttributes({ uniqueId: _client });
        }

        const mapIframe = this.refs.wprigGoogleMapIframe;
        if (typeof mapIframe !== 'undefined') {
            mapIframe.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }

        if(wprig_admin.wprig_gmap_api_key) {
            setAttributes({apiKey: wprig_admin.wprig_gmap_api_key});
            this.initMapLibrary(wprig_admin.wprig_gmap_api_key);
        } else if(apiKey) {
            this.initMapLibrary(apiKey);
        } else {
            this.initMapLibrary('');
        }

    }

    async _saveGlobally(apiKey) {
        if(!apiKey) return;

        try {
            await wp.apiFetch({
                path: 'wprig/v1/add_wprig_options',
                method: 'POST',
                data: {key: 'wprig_gmap_api_key', value: apiKey}
            });
            this.setState({saved_globally: true});
        } catch (e) {
            // debug
            console.log(e);
        }
    }

    initMapLibrary(apiKey) {
        const { initMap, initSearchBox, loadScriptAsync } = this;
        this.props.setAttributes({ apiKey: apiKey });
        if (apiKey) {
            const apiURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
            window.initMap = initMap;
            if (typeof google === 'object' && typeof google.maps === 'object') {
                initMap();
                initSearchBox();
            } else {
                loadScriptAsync(apiURL).then(() => {
                    initMap();
                    initSearchBox();
                });
            }
        }
    }

    loadScriptAsync(src) {
        return new Promise((resolve, reject) => {
            const tag = document.createElement('script');
            tag.id = "wprig-gmap"
            tag.src = src;
            tag.async = true;
            tag.onload = () => {
                resolve();
            };
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        });
    }

    initSearchBox() {
        const { setSettings, props: { attributes, setAttributes } } = this;
        let { mapAddress } = attributes;
        // Create the search box and link it to the UI element.
        const input = this.refs.mapAddress;
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.setFields(['place_id', 'geometry', 'formatted_address']);
        autocomplete.addListener('place_changed', () => {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            mapAddress = place.formatted_address;
            setAttributes({ placeID: place.place_id });
            setSettings('mapAddress', mapAddress);
            input.value = mapAddress;
        });
        input.value = mapAddress;
    }

    initMap() {
        const { getStyles, props: { attributes, setAttributes } } = this;
        const { placeID, zoom, mapStyle, showZoomButtons, showMapTypeButtons, showStreetViewButton, showFullscreenButton, optionDraggable, showMarker, iconPointer } = attributes;
        const mapCanvas = this.refs.wprigGoogleMap;
        const mapOptions = {
            center: { lat: 11.5024338, lng: 17.7578122 },
            zoom: 1,
            zoomControl: showZoomButtons,
            mapTypeControl: showMapTypeButtons,
            streetViewControl: showStreetViewButton,
            fullscreenControl: showFullscreenButton,
            draggable: optionDraggable,
            styles: mapStyle ? getStyles(mapStyle) : [],
        }
        const map = new google.maps.Map(mapCanvas, mapOptions);

        if (placeID) {
            var request = {
                placeId: placeID,
                fields: ['place_id', 'geometry', 'name', 'formatted_address', 'adr_address', 'website']
            };

            const service = new google.maps.places.PlacesService(map);
            service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {

                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        setAttributes({ zoom: 16 });
                        map.setCenter(place.geometry.location);
                        map.setZoom(zoom);
                    }

                    let markerOption = { map: map };
                    if (iconPointer) markerOption.icon = iconPointer;
                    const marker = new google.maps.Marker(markerOption);
                    // Set the position of the marker using the place ID and location.
                    marker.setPlace({
                        placeId: place.place_id,
                        location: place.geometry.location
                    });
                    marker.setVisible(showMarker);

                    const contentString = '<div class="wprig-gmap-marker-window"><div class="wprig-gmap-marker-place">' + place.name + '</div><div class="wprig-gmap-marker-address">' +
                        place.adr_address + '</div>' +
                        '<div class="wprig-gmap-marker-url"><a href="' + place.website + '" target="_blank">' + place.website + '</a></div></div>';

                    const infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                }
            });
        }
    }

    setSettings(type, val) {
        const { attributes: { apiKey }, setAttributes } = this.props;
        setAttributes({ [type]: val });
        if (apiKey) setTimeout(() => this.initMap(), 300);
    }

    getStyles(string) {
        let result = [];
        try {
            result = JSON.parse(string);
        } catch (e) {
            return [];
        }
        return result;
    }

    render() {
        const {
            setAttributes,
            attributes: {
                uniqueId,
                className,
                zoom,
                height,
                apiKey,
                mapAddress,
                selectedStyle,
                showZoomButtons,
                showMapTypeButtons,
                showStreetViewButton,
                showFullscreenButton,
                optionDraggable,
                showMarker,
                iconPointer,

                //animation
                animation,
                //global
                enablePosition,
                selectPosition,
                positionXaxis,
                positionYaxis,
                globalZindex,
                hideTablet,
                hideMobile,
                globalCss }
        } = this.props;

        const setting_url = wprig_admin.admin_url + 'admin.php?page=wprig-settings';

        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <InspectorTabs tabs={['style', 'advance']}>
                        <InspectorTab key={'style'}>
                            <PanelBody title={__('Map Settings', 'wprig')}>
                                {
                                    (wprig_admin.wprig_gmap_api_key || this.state.saved_globally ) ? (
                                        <div className='api-notice'>{__('Google map API key successfully added')}, <a target='_blank' href={setting_url}>{__('Edit API key here')}</a></div>
                                    ) : (
                                        apiKey ?  (
                                            <div className="gmap-api-key-control">
                                                <TextControl
                                                    label={__('API Key')}
                                                    value={apiKey}
                                                    placeholder={__('Enter API Key')}
                                                    onChange={val => this.initMapLibrary(val)} />
                                                <Button onClick={() => this._saveGlobally(apiKey)} isPrimary>{__('Set globally')}</Button>
                                            </div>
                                        ) : (
                                            <div className='api-notice warning'>{__('Some features requires Google map API key')}, <a target='_blank' href={setting_url}>{__('Add API key here')}</a></div>
                                        )
                                    )
                                }

                                <RangeControl
                                    label={__('Zoom')}
                                    value={zoom}
                                    min='1'
                                    max='20'
                                    onChange={val => this.setSettings('zoom', val)} />
                                <RangeControl
                                    label={__('Height')}
                                    value={height}
                                    min='1'
                                    max='700'
                                    onChange={(val) => this.setSettings('height', val)} />
                            </PanelBody>

                            {!apiKey &&
                            <b><i>{__('Need Google API key extend feature.')}</i></b>
                            }
                            <div className={apiKey ? '' : 'not-clickable'}>
                                <PanelBody title={__('Map Style')}>
                                    <div style={{ overflow: 'auto' }}>
                                        {mapStyles.map((option, index) => {
                                            return (
                                                <div className={(selectedStyle == option.value) ? 'wprig-map-style wprig-map-style-active' : 'wprig-map-style'}>
                                                    <img
                                                        key={index}
                                                        onClick={() => {
                                                            this.setSettings('selectedStyle', option.value);
                                                            this.setSettings('mapStyle', JSON.stringify(option.json));
                                                        }}
                                                        src={option.image}
                                                        title={__(option.label)}
                                                        alt={__('Map Style')}
                                                    />
                                                    <p>{__(option.label)}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </PanelBody>

                                <PanelBody title={__('Map Option')}>
                                    <ToggleControl
                                        label={__('Zoom Buttons')}
                                        checked={!!showZoomButtons}
                                        onChange={(val) => this.setSettings('showZoomButtons', val)} />
                                    <ToggleControl
                                        label={__('Map Type Buttons')}
                                        checked={!!showMapTypeButtons}
                                        onChange={(val) => this.setSettings('showMapTypeButtons', val)} />
                                    <ToggleControl
                                        label={__('Street View Button')}
                                        checked={!!showStreetViewButton}
                                        onChange={(val) => this.setSettings('showStreetViewButton', val)} />
                                    <ToggleControl
                                        label={__('Fullscreen Button')}
                                        checked={!!showFullscreenButton}
                                        onChange={(val) => this.setSettings('showFullscreenButton', val)} />
                                    <ToggleControl
                                        label={__('Draggable')}
                                        checked={!!optionDraggable}
                                        onChange={(val) => this.setSettings('optionDraggable', val)} />
                                    <ToggleControl
                                        label={__('Show Marker')}
                                        checked={!!showMarker}
                                        onChange={(val) => this.setSettings('showMarker', val)} />
                                    {showMarker &&
                                    <Fragment>
                                        <Separator label={__('Add custom marker')} />
                                        <Media
                                            multiple={false}
                                            type={['image']}
                                            value={{ url: iconPointer }}
                                            panel={true}
                                            onChange={(val) => this.setSettings('iconPointer', val.url)} />
                                    </Fragment>
                                    }
                                </PanelBody>
                            </div>
                        </InspectorTab>
                        <InspectorTab key={'advance'}>
                            {animationSettings(uniqueId, animation, setAttributes)}
                        </InspectorTab>
                    </InspectorTabs>
                </InspectorControls>

                <BlockControls>
                    <Toolbar>
                        <InlineToolbar
                            data={[{ name: 'InlineSpacer', key: 'spacer', responsive: true, unit: ['px', 'em', '%'] }]}
                            {...this.props}
                            prevState={this.state} />
                    </Toolbar>
                </BlockControls>

                {globalSettingsPanel(enablePosition, selectPosition, positionXaxis, positionYaxis, globalZindex, hideTablet, hideMobile, globalCss, setAttributes)}

                <div className={`wprig-block-${uniqueId}${className ? ` ${className}` : ''}`}>
                    <div className={apiKey ? 'wprig-google-map' : 'wprig-gmap-hide'}>
                        <input ref="mapAddress" type="text" className="wprig-google-gmap-input" placeholder={__('Find your location…')} />
                        <div ref="wprigGoogleMap" style={{ height: parseInt(height, 10) + 'px', width: '100%' }} />
                    </div>
                    {!apiKey &&
                        <div ref='wprigGoogleMapIframe'>
                            <TextControl
                                label={__('')}
                                value={mapAddress}
                                placeholder={__('Enter your address')}
                                onChange={val => this.props.setAttributes({ mapAddress: val })}
                            />
                            <iframe
                                width="100%"
                                height={parseInt(height, 10) + 'px'}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=${parseInt(zoom, 10)}&ie=UTF8&iwloc=&output=embed`}
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                            />
                        </div>
                    }
                </div>
            </Fragment>
        );
    }
}

export default withCSSGenerator()(Edit);