import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import PopupInfo from './PopupInfo';

const defaultIcon = 'https://maps.google.com/mapfiles/ms/icons/red.png'
const highlightedIcon = 'https://maps.google.com/mapfiles/ms/icons/lightblue.png'
class LocationPin extends Component {
    state = {}
    componentDidMount() {
        // Use location's description in the search.
        const geocoder = new this.props.googleMaps.Geocoder()
        geocoder.geocode({ address: this.props.location.description }, (results, status) => {
            // Place the location on the screen only if location is found.
            if (status == 'OK' && results.length > 0) {
                const result = results[0]
                this.setState({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    canonicalAddress: result.formatted_address,
                    googlePlaceId: result.place_id
                })
            }
        })
    }
    render() {
        // Draw a marker only if the location is known.
        if (this.state.lat && this.state.lng) {
            const shouldOpenInfoWindow = (this.props.selectedLocation && this.props.location.id === this.props.selectedLocation.id)
            return (
                <div>
                    <Marker
                        icon={shouldOpenInfoWindow ? highlightedIcon : defaultIcon}
                        position={{ lat: this.state.lat, lng: this.state.lng }}
                        onClick={() => this.props.onClickLocation(this.props.location)}>
                        {shouldOpenInfoWindow && (
                            <PopupInfo ll={`${this.state.lat},${this.state.lng}`} googleMaps={this.props.googleMaps} placeId={this.state.googlePlaceId} onCloseClick={() => this.props.onClickLocation(null)} />
                        )}
                    </Marker>
                </div>
            )
        }
        return null
    }
}

export default LocationPin
